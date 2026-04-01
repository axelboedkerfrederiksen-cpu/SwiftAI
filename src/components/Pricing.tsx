import { Check } from "lucide-react";

interface Plan {
  name: string;
  price: string;
  period: string;
  note?: string;
  popular?: boolean;
  features: string[];
  cta: string;
}

const plans: Plan[] = [
  {
    name: "EmbedBot Chatbot",
    price: "1.999",
    period: "kr (engangs)",
    note: "+ 299 kr/md for drift",
    features: [
      "AI chatbot til din hjemmeside",
      "Svarer kunder 24/7",
      "Tilpasset din virksomhed",
      "Nem integration",
    ],
    cta: "Kom i gang",
  },
  {
    name: "Full Pakke",
    price: "10.000",
    period: "kr (engangs)",
    popular: true,
    features: [
      "AI chatbot",
      "Ny professionel hjemmeside",
      "Skræddersyede AI-værktøjer",
      "Uendelig support (med abonnement)",
      "Alt inkluderet — ingen skjulte priser",
    ],
    cta: "Book en gratis demo",
  },
  {
    name: "Ny Hjemmeside",
    price: "5.999",
    period: "kr (engangs)",
    note: "Vedligeholdelse fra 199 kr/md",
    features: [
      "Moderne og professionelt design",
      "Hurtig og mobilvenlig",
      "SEO-optimeret",
      "Klar inden for 2 uger",
    ],
    cta: "Kom i gang",
  },
];

export default function Pricing() {
  return (
    <section id="pakker" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Enkle priser, ingen overraskelser
          </h2>
          <p className="mt-4 text-gray-400">
            Vælg den pakke der passer til din virksomhed.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-8 transition-all ${
                plan.popular
                  ? "border-blue-500 bg-gray-900 shadow-xl shadow-blue-500/10"
                  : "border-white/5 bg-gray-900/50 hover:border-white/10"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-blue-500 px-4 py-1 text-xs font-semibold text-white">
                  Anbefalet
                </div>
              )}

              <h3 className="text-lg font-semibold text-white">{plan.name}</h3>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">
                  {plan.price}
                </span>
                <span className="text-sm text-gray-400">{plan.period}</span>
              </div>
              {plan.note && (
                <p className="mt-1 text-xs text-gray-500">{plan.note}</p>
              )}

              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      size={18}
                      className="mt-0.5 shrink-0 text-blue-400"
                    />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://calendly.com/axelfrederiksen55/new-meeting"
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 block w-full rounded-xl py-3 text-center text-sm font-semibold transition-all ${
                  plan.popular
                    ? "bg-blue-500 text-white hover:bg-blue-400 hover:shadow-lg hover:shadow-blue-500/25"
                    : "border border-white/10 text-white hover:border-white/20 hover:bg-white/5"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
