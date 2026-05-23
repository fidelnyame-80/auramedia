import {
  MonitorSmartphone,
  PenTool,
  Smartphone,
  Rocket,
  Megaphone,
  Code2,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    title: "Website Designing",
    text: "Modern, responsive websites designed to engage and convert.",
    icon: MonitorSmartphone,
    color: "text-blue-500",
  },
  {
    title: "Graphic Designing",
    text: "Eye-catching visuals that communicate your brand with impact.",
    icon: PenTool,
    color: "text-red-500",
  },
  {
    title: "UI/UX Designs",
    text: "Intuitive interfaces and seamless experiences users love.",
    icon: Smartphone,
    color: "text-blue-500",
  },
  {
    title: "Picture Frame",
    text: "Build a strong, memorable brand that stands out from the crowd.",
    icon: Rocket,
    color: "text-red-500",
  },
  {
    title: "Printing Services",
    text: "Premium quality prints that leave a lasting impression.",
    icon: Megaphone,
    color: "text-blue-500",
  },
  {
    title: "Shirt Printing",
    text: "Custom shirt printing that represents your style and brand.",
    icon: Code2,
    color: "text-red-500",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-[#050914] px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#ff1f2d]">
            Our Services
          </p>
          <h2 className="text-3xl md:text-4xl">
            Creative Solutions That Drive Results
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center shadow-lg"
              >
                <Icon className={`mx-auto mb-6 h-10 w-10 ${service.color}`} />

                <h3 className="mb-4 font-bold">{service.title}</h3>

                <p className="mb-8 text-sm leading-6 text-white/60">
                  {service.text}
                </p>

                <button className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-[#2539a8] text-[#2539a8]">
                  <ArrowRight size={18} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
