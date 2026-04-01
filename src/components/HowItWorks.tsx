import { MessageSquare, Wrench, Zap } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Vi snakker om din virksomhed",
    description:
      "En gratis og uforpligtende snak om dine behov, mål og udfordringer.",
  },
  {
    icon: Wrench,
    step: "02",
    title: "Jeg bygger alt på 4 uger",
    description:
      "Jeg designer og udvikler din nye hjemmeside, chatbot og AI-værktøjer.",
  },
  {
    icon: Zap,
    step: "03",
    title: "Du får AI der arbejder for dig 24/7",
    description:
      "Din virksomhed kører smartere med AI der aldrig holder fri.",
  },
];

export default function HowItWorks() {
  return (
    <section id="hvordan" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Sådan virker det
          </h2>
          <p className="mt-4 text-gray-400">
            Fra første snak til AI der arbejder for dig — på bare 4 uger.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((item, i) => (
            <div key={item.step} className="relative text-center">
              {/* Connector line (between cards) */}
              {i < steps.length - 1 && (
                <div className="pointer-events-none absolute top-12 left-[calc(50%+40px)] hidden h-px w-[calc(100%-80px)] bg-gradient-to-r from-blue-500/40 to-transparent md:block" />
              )}

              <div className="mx-auto mb-6 inline-flex h-24 w-24 items-center justify-center rounded-2xl border border-white/5 bg-gray-900/50 text-blue-400">
                <item.icon size={32} />
              </div>

              <div className="mb-2 text-xs font-bold uppercase tracking-widest text-blue-400">
                Trin {item.step}
              </div>
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
