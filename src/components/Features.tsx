import { Bot, Globe, Cpu, HeadphonesIcon } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI Chatbot",
    description:
      "24/7 kundeservice der svarer automatisk — dine kunder får svar, selv når du sover.",
  },
  {
    icon: Globe,
    title: "Ny hjemmeside",
    description:
      "Moderne, hurtig og professionel hjemmeside der konverterer besøgende til kunder.",
  },
  {
    icon: Cpu,
    title: "AI-værktøjer",
    description:
      "Skræddersyede AI-løsninger designet specifikt til din virksomheds behov.",
  },
  {
    icon: HeadphonesIcon,
    title: "Uendelig support",
    description:
      "Løbende support så længe du har et abonnement — du er aldrig alene.",
  },
];

export default function Features() {
  return (
    <section id="features" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Hvad du får
          </h2>
          <p className="mt-4 text-gray-400">
            Alt hvad din virksomhed har brug for — samlet i én pakke.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-white/5 bg-gray-900/50 p-8 transition-all hover:border-blue-500/30 hover:bg-gray-900"
            >
              <div className="mb-5 inline-flex rounded-xl bg-blue-500/10 p-3 text-blue-400 transition-colors group-hover:bg-blue-500/20">
                <feature.icon size={24} />
              </div>
              <h3 className="text-lg font-semibold text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
