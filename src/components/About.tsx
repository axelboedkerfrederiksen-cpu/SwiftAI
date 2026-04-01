import { Code2, ExternalLink } from "lucide-react";

export default function About() {
  return (
    <section id="om" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl border border-white/5 bg-gray-900/50 p-8 sm:p-12">
          <div className="mb-6 inline-flex rounded-xl bg-blue-500/10 p-3 text-blue-400">
            <Code2 size={28} />
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Om mig
          </h2>

          <div className="mt-6 space-y-4 text-gray-400 leading-relaxed">
            <p>
              Jeg hedder Axel, er 15 år og bor i København. Jeg har en passion
              for at bygge ting med teknologi — og jeg elsker at hjælpe
              virksomheder med at bruge AI til at spare tid og tjene mere.
            </p>
            <p>
              Jeg har bygget{" "}
              <a
                href="https://embedbot1.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-400 underline decoration-blue-400/30 underline-offset-4 transition-colors hover:text-blue-300"
              >
                EmbedBot
                <ExternalLink size={14} />
              </a>{" "}
              — en AI chatbot-platform der gør kundeservice automatisk.
            </p>
            <p>
              Jeg tror på, at selv de mindste virksomheder kan få en kæmpe
              fordel med de rigtige AI-værktøjer. Og jeg gør det nemt for dig at
              komme i gang.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
