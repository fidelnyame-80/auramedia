"use client";

/*
  CircularGallery is the WebGL carousel used in the Portfolio / Our Work section.

  Quick editing map:
  - Most visual tuning should happen where this component is USED, in Portfolio.jsx.
    That is where you pass bend, scrollSpeed, scrollEase, itemWidth, itemHeight,
    and itemPadding.
  - This file is the engine. Edit here when you want to change the carousel
    behavior itself: scroll math, drag behavior, shader effects, text labels,
    infinite looping, or WebGL setup.
  - The gallery is built with OGL. Each project is a textured WebGL plane, not a
    regular HTML card, so CSS cannot directly style the green image rectangles.
*/

import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';
import { useEffect, useRef } from 'react';

// Used after wheel scrolling so the carousel waits briefly before snapping.
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Linear interpolation. This is what makes current scroll ease toward target scroll.
function lerp(p1, p2, t) {
  return p1 + (p2 - p1) * t;
}

// Binds class methods to their class instance. Title uses this helper.
function autoBind(instance) {
  const proto = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto).forEach(key => {
    if (key !== 'constructor' && typeof instance[key] === 'function') {
      instance[key] = instance[key].bind(instance);
    }
  });
}

/*
  Text in WebGL needs to be drawn into a texture first.
  This function creates a tiny canvas, draws the project title onto it, then turns
  that canvas into an OGL Texture that can be placed under each image plane.
*/
function createTextTexture(gl, text, font = 'bold 30px monospace', color = 'black') {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = font;
  const metrics = context.measureText(text);
  const textWidth = Math.ceil(metrics.width);
  const textHeight = Math.ceil(parseInt(font, 10) * 1.2);
  canvas.width = textWidth + 20;
  canvas.height = textHeight + 20;
  context.font = font;
  context.fillStyle = color;
  context.textBaseline = 'middle';
  context.textAlign = 'center';
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillText(text, canvas.width / 2, canvas.height / 2);
  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return { texture, width: canvas.width, height: canvas.height };
}

/*
  Title is the project label below each image.
  It is attached as a child of the image plane, so it moves, bends, and loops
  together with the card.
*/
class Title {
  constructor({ gl, plane, renderer, text, textColor = '#545050', font = '30px sans-serif' }) {
    autoBind(this);
    this.gl = gl;
    this.plane = plane;
    this.renderer = renderer;
    this.text = text;
    this.textColor = textColor;
    this.font = font;
    this.createMesh();
  }
  createMesh() {
    // Convert the plain string title into a WebGL texture.
    const { texture, width, height } = createTextTexture(this.gl, this.text, this.font, this.textColor);

    // A small plane holds the text texture. This is separate from the image plane.
    const geometry = new Plane(this.gl);
    const program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true
    });
    this.mesh = new Mesh(this.gl, { geometry, program });

    // Keep the text proportional to the generated canvas texture.
    const aspect = width / height;
    const textHeight = this.plane.scale.y * 0.15;
    const textWidth = textHeight * aspect;
    this.mesh.scale.set(textWidth, textHeight, 1);

    // Position the label just below the bottom edge of the image plane.
    this.mesh.position.y = -this.plane.scale.y * 0.5 - textHeight * 0.5 - 0.05;
    this.mesh.setParent(this.plane);
  }
}

/*
  Media represents one carousel card.

  Responsibilities:
  - load one image into a WebGL texture
  - create the shader that renders the rounded image plane
  - attach the text title below it
  - update x/y/rotation every frame based on scroll position
  - wrap around when it moves offscreen, creating the infinite loop
*/
class Media {
  constructor({
    geometry,
    gl,
    image,
    index,
    length,
    renderer,
    scene,
    screen,
    text,
    viewport,
    bend,
    textColor,
    borderRadius = 0,
    font,
    imageFit = 'cover',
    itemWidth = 700,
    itemHeight = 900,
    itemPadding = 2,
    onLoad
  }) {
    // extra shifts cards by full carousel widths when looping from one side to the other.
    this.extra = 0;

    // Core WebGL and layout references shared from App.
    this.geometry = geometry;
    this.gl = gl;
    this.image = image;
    this.index = index;
    this.length = length;
    this.renderer = renderer;
    this.scene = scene;
    this.screen = screen;
    this.text = text;
    this.viewport = viewport;
    this.bend = bend;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.font = font;
    this.imageFit = imageFit;

    // These are the main card size knobs passed from Portfolio.jsx.
    // itemWidth and itemHeight are design-size numbers that get converted into
    // WebGL world units in onResize().
    this.itemWidth = itemWidth;
    this.itemHeight = itemHeight;
    this.itemPadding = itemPadding;
    this.onLoad = onLoad;
    this.createShader();
    this.createMesh();
    this.createTitle();
    this.onResize();
  }
  createShader() {
    // Texture starts empty. The image is loaded below and assigned in img.onload.
    const texture = new Texture(this.gl, {
      generateMipmaps: true
    });

    /*
      The shader controls how each image plane looks.
      - Vertex shader: adds a subtle wave/distortion based on time and speed.
      - Fragment shader: fits the image like object-cover or object-contain and
        cuts rounded corners.
    */
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        uniform float uFitMode;
        varying vec2 vUv;
        
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        
        void main() {
          float planeAspect = uPlaneSizes.x / uPlaneSizes.y;
          float imageAspect = uImageSizes.x / uImageSizes.y;
          vec2 coverRatio = vec2(
            min(planeAspect / imageAspect, 1.0),
            min(imageAspect / planeAspect, 1.0)
          );
          vec2 coverUv = vec2(
            vUv.x * coverRatio.x + (1.0 - coverRatio.x) * 0.5,
            vUv.y * coverRatio.y + (1.0 - coverRatio.y) * 0.5
          );
          vec2 containRatio = vec2(
            min(imageAspect / planeAspect, 1.0),
            min(planeAspect / imageAspect, 1.0)
          );
          vec2 containUv = (vUv - (1.0 - containRatio) * 0.5) / containRatio;
          float containMask =
            step(0.0, containUv.x) *
            step(containUv.x, 1.0) *
            step(0.0, containUv.y) *
            step(containUv.y, 1.0);
          vec2 uv = mix(coverUv, containUv, uFitMode);
          vec4 color = texture2D(tMap, uv);
          
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          
          // Smooth antialiasing for edges
          float edgeSmooth = 0.002;
          float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);
          float imageAlpha = mix(1.0, containMask, uFitMode);
          
          gl_FragColor = vec4(color.rgb, alpha * imageAlpha * color.a);
        }
      `,
      uniforms: {
        // Actual image texture.
        tMap: { value: texture },

        // Plane size and image size are used to crop or contain the image.
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [1, 1] },

        // uSpeed is driven by scroll movement and increases the wave amount.
        uSpeed: { value: 0 },

        // Random starting time prevents every card from warping identically.
        uTime: { value: 100 * Math.random() },

        // Rounded corner amount. In Portfolio.jsx this is borderRadius.
        uBorderRadius: { value: this.borderRadius },

        // 0 = cover, 1 = contain. Portfolio uses contain for full design previews.
        uFitMode: { value: this.imageFit === 'contain' ? 1 : 0 }
      },
      transparent: true
    });

    // Load the image URL passed in the item list.
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = this.image;
    img.onload = () => {
      // Once loaded, the shader receives the real bitmap and its natural size.
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
      this.onLoad?.(this.index);
    };
    img.onerror = () => {
      this.onLoad?.(this.index);
    };
  }
  createMesh() {
    // The visible image card: one plane using the shader above.
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program
    });
    this.plane.setParent(this.scene);
  }
  createTitle() {
    // Attach the label as a child of the image card.
    this.title = new Title({
      gl: this.gl,
      plane: this.plane,
      renderer: this.renderer,
      text: this.text,
      textColor: this.textColor,
      font: this.font
    });
  }
  update(scroll, direction) {
    // Move horizontally based on the smoothed carousel scroll value.
    this.plane.position.x = this.x - scroll.current - this.extra;

    const x = this.plane.position.x;
    const H = this.viewport.width / 2;

    /*
      Bend turns the flat row into a shallow arc.
      - bend = 0 means straight row
      - positive bend curves downward
      - negative bend curves upward
      This is the main "circular gallery" look.
    */
    if (this.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const B_abs = Math.abs(this.bend);
      const R = (H * H + B_abs * B_abs) / (2 * B_abs);
      const effectiveX = Math.min(Math.abs(x), H);

      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
      if (this.bend > 0) {
        this.plane.position.y = -arc;
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);
      } else {
        this.plane.position.y = arc;
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);
      }
    }

    // Feed motion speed into the shader so fast scrolling creates more distortion.
    this.speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = this.speed;

    // Detect when a card has moved fully offscreen.
    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;

    // Infinite loop behavior: recycle offscreen cards to the opposite side.
    if (direction === 'right' && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
    if (direction === 'left' && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
  }
  onResize({ screen, viewport } = {}) {
    // Keep screen and viewport values current after browser resize.
    if (screen) this.screen = screen;
    if (viewport) {
      this.viewport = viewport;
      if (this.plane.program.uniforms.uViewportSizes) {
        this.plane.program.uniforms.uViewportSizes.value = [this.viewport.width, this.viewport.height];
      }
    }

    /*
      Convert design-size props into WebGL scale.
      Edit itemWidth, itemHeight, and itemPadding where CircularGallery is used
      in Portfolio.jsx. Bigger numbers here make larger cards.
    */
    this.scale = this.screen.height / 1500;
    this.plane.scale.y = (this.viewport.height * (this.itemHeight * this.scale)) / this.screen.height;
    this.plane.scale.x = (this.viewport.width * (this.itemWidth * this.scale)) / this.screen.width;
    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];

    // itemPadding controls horizontal breathing room between cards.
    this.padding = this.itemPadding;
    this.width = this.plane.scale.x + this.padding;

    // widthTotal is used to wrap cards around for the infinite loop.
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
}

/*
  App is the gallery runtime.

  It owns:
  - the OGL renderer and canvas
  - the camera and scene
  - all Media cards
  - wheel, mouse, touch, resize listeners
  - the animation loop
*/
class App {
  constructor(
    container,
    {
      items,
      bend,
      textColor = '#ffffff',
      borderRadius = 0,
      font = 'bold 30px Figtree',
      scrollSpeed = 2,
      scrollEase = 0.05,
      imageFit = 'cover',
      itemWidth = 700,
      itemHeight = 900,
      itemPadding = 2,
      onReady
    } = {}
  ) {
    // The container is the div returned by the React component.
    document.documentElement.classList.remove('no-js');
    this.container = container;

    /*
      scroll.current is what you see.
      scroll.target is where input says the carousel should go.
      scroll.ease controls how quickly current catches up to target.
      Lower ease = floatier/slower. Higher ease = tighter/faster.
    */
    this.scrollSpeed = scrollSpeed;
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
    this.onReady = onReady;
    this.loadedMediaIndexes = new Set();

    // Debounced snap-to-nearest-card after wheel scrolling.
    this.onCheckDebounce = debounce(this.onCheck, 200);

    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias(items, bend, textColor, borderRadius, font, imageFit, itemWidth, itemHeight, itemPadding);
    this.update();
    this.addEventListeners();
  }
  createRenderer() {
    // Renderer creates the WebGL canvas. alpha true lets the section background show.
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2)
    });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.gl.canvas);
  }
  createCamera() {
    // The camera controls perspective. position.z is the distance from the cards.
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }
  createScene() {
    // Root object that all cards are attached to.
    this.scene = new Transform();
  }
  createGeometry() {
    /*
      Shared plane geometry for every card.
      More segments give the shader enough vertices to bend/distort smoothly.
      Lower these numbers for performance if needed.
    */
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 50,
      widthSegments: 100
    });
  }
  handleMediaLoad(index) {
    if (this.isDestroyed || this.loadedMediaIndexes.has(index)) return;

    this.loadedMediaIndexes.add(index);

    if (this.loadedMediaIndexes.size >= this.mediasImages.length) {
      this.onReady?.();
    }
  }
  createMedias(items, bend = 1, textColor, borderRadius, font, imageFit, itemWidth, itemHeight, itemPadding) {
    // Fallback images appear only if no items are passed from Portfolio.jsx.
    const defaultItems = [
      { image: `https://picsum.photos/seed/1/800/600?grayscale`, text: 'Bridge' },
      { image: `https://picsum.photos/seed/2/800/600?grayscale`, text: 'Desk Setup' },
      { image: `https://picsum.photos/seed/3/800/600?grayscale`, text: 'Waterfall' },
      { image: `https://picsum.photos/seed/4/800/600?grayscale`, text: 'Strawberries' },
      { image: `https://picsum.photos/seed/5/800/600?grayscale`, text: 'Deep Diving' },
      { image: `https://picsum.photos/seed/16/800/600?grayscale`, text: 'Train Track' },
      { image: `https://picsum.photos/seed/17/800/600?grayscale`, text: 'Santorini' },
      { image: `https://picsum.photos/seed/8/800/600?grayscale`, text: 'Blurry Lights' },
      { image: `https://picsum.photos/seed/9/800/600?grayscale`, text: 'New York' },
      { image: `https://picsum.photos/seed/10/800/600?grayscale`, text: 'Good Boy' },
      { image: `https://picsum.photos/seed/21/800/600?grayscale`, text: 'Coastline' },
      { image: `https://picsum.photos/seed/12/800/600?grayscale`, text: 'Palm Trees' }
    ];
    const galleryItems = items && items.length ? items : defaultItems;

    /*
      Duplicate the list so there is always another copy ready to scroll in.
      This helps the wrap-around feel continuous instead of hitting an end.
    */
    this.mediasImages = galleryItems.concat(galleryItems);
    if (this.mediasImages.length === 0) {
      this.onReady?.();
      return;
    }

    this.medias = this.mediasImages.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: data.image,
        index,
        length: this.mediasImages.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        text: data.text,
        viewport: this.viewport,
        bend,
        textColor,
        borderRadius,
        font,
        imageFit,
        itemWidth,
        itemHeight,
        itemPadding,
        onLoad: this.handleMediaLoad.bind(this)
      });
    });
  }
  onTouchDown(e) {
    // Start drag. Works for mouse and touch.
    this.isDown = true;
    this.scroll.position = this.scroll.current;
    this.start = e.touches ? e.touches[0].clientX : e.clientX;
  }
  onTouchMove(e) {
    if (!this.isDown) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;

    // Drag distance becomes a scroll target. scrollSpeed makes dragging stronger.
    const distance = (this.start - x) * (this.scrollSpeed * 0.025);
    this.scroll.target = this.scroll.position + distance;
  }
  onTouchUp() {
    // Stop drag and snap to the nearest card.
    this.isDown = false;
    this.onCheck();
  }
  onWheel(e) {
    // Mouse wheel or trackpad input moves the carousel left/right.
    const delta = e.deltaY || e.wheelDelta || e.detail;
    this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2;

    // Snap after the wheel pauses for 200ms.
    this.onCheckDebounce();
  }
  onCheck() {
    if (!this.medias || !this.medias[0]) return;

    // Find the nearest card width and align the target to it.
    const width = this.medias[0].width;
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
    const item = width * itemIndex;
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }
  onResize() {
    // Screen is actual pixel size of the React wrapper.
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight
    };
    this.renderer.setSize(this.screen.width, this.screen.height);

    // Keep the camera aspect ratio in sync with the wrapper.
    this.camera.perspective({
      aspect: this.screen.width / this.screen.height
    });

    // Convert camera field-of-view into world-space viewport dimensions.
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { width, height };

    // Resize every card after viewport math changes.
    if (this.medias) {
      this.medias.forEach(media => media.onResize({ screen: this.screen, viewport: this.viewport }));
    }
  }
  update() {
    // Smoothly move visible scroll toward the target set by wheel/drag.
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);

    // Direction tells Media which side to recycle cards from.
    const direction = this.scroll.current > this.scroll.last ? 'right' : 'left';
    if (this.medias) {
      this.medias.forEach(media => media.update(this.scroll, direction));
    }

    // Draw the scene, remember this frame's scroll, then schedule the next frame.
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }
  addEventListeners() {
    // Bind once so removeEventListener can clean these up later.
    this.boundOnResize = this.onResize.bind(this);
    this.boundOnWheel = this.onWheel.bind(this);
    this.boundOnTouchDown = this.onTouchDown.bind(this);
    this.boundOnTouchMove = this.onTouchMove.bind(this);
    this.boundOnTouchUp = this.onTouchUp.bind(this);

    /*
      These are currently attached to window, so the gallery can respond while
      the page is focused. If you want scroll/drag to only happen over the
      gallery, move wheel/mousedown/touchstart listeners to this.container.
    */
    window.addEventListener('resize', this.boundOnResize);
    window.addEventListener('mousewheel', this.boundOnWheel);
    window.addEventListener('wheel', this.boundOnWheel);
    window.addEventListener('mousedown', this.boundOnTouchDown);
    window.addEventListener('mousemove', this.boundOnTouchMove);
    window.addEventListener('mouseup', this.boundOnTouchUp);
    window.addEventListener('touchstart', this.boundOnTouchDown);
    window.addEventListener('touchmove', this.boundOnTouchMove);
    window.addEventListener('touchend', this.boundOnTouchUp);
  }
  destroy() {
    this.isDestroyed = true;
    // Clean up animation, global listeners, and canvas when React unmounts.
    window.cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.boundOnResize);
    window.removeEventListener('mousewheel', this.boundOnWheel);
    window.removeEventListener('wheel', this.boundOnWheel);
    window.removeEventListener('mousedown', this.boundOnTouchDown);
    window.removeEventListener('mousemove', this.boundOnTouchMove);
    window.removeEventListener('mouseup', this.boundOnTouchUp);
    window.removeEventListener('touchstart', this.boundOnTouchDown);
    window.removeEventListener('touchmove', this.boundOnTouchMove);
    window.removeEventListener('touchend', this.boundOnTouchUp);
    if (this.renderer && this.renderer.gl && this.renderer.gl.canvas.parentNode) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas);
    }
  }
}

/*
  React wrapper for the OGL gallery.

  Props you will usually edit from Portfolio.jsx:
  - items: array of { image, text }
  - bend: curve amount. 0 is flat. 1 is subtle. Higher bends more.
  - textColor: label color under each image.
  - borderRadius: WebGL rounded-corner amount.
  - scrollSpeed: how strongly wheel/drag input moves the gallery.
  - scrollEase: how quickly the gallery catches up to the target.
  - itemWidth: card width design value.
  - itemHeight: card height design value.
  - itemPadding: horizontal spacing between cards.
  - imageFit: "cover" crops like CSS object-cover. "contain" shows the full image.
*/
export default function CircularGallery({
  items,
  bend = 3,
  textColor = '#ffffff',
  borderRadius = 0.05,
  font = 'bold 30px Figtree',
  scrollSpeed = 2,
  scrollEase = 0.05,
  imageFit = 'cover',
  itemWidth = 700,
  itemHeight = 900,
  itemPadding = 2,
  onReady
}) {
  const containerRef = useRef(null);

  /*
    Create the imperative WebGL app after this div exists in the browser.
    Whenever one of the props changes, React destroys and recreates the gallery
    so the OGL runtime receives the new settings.
  */
  useEffect(() => {
    const app = new App(containerRef.current, {
      items,
      bend,
      textColor,
      borderRadius,
      font,
      scrollSpeed,
      scrollEase,
      imageFit,
      itemWidth,
      itemHeight,
      itemPadding,
      onReady
    });
    return () => {
      app.destroy();
    };
  }, [items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase, imageFit, itemWidth, itemHeight, itemPadding, onReady]);

  // OGL appends its canvas into this div.
  return <div className="w-full h-full overflow-hidden cursor-grab active:cursor-grabbing" ref={containerRef} />;
}
