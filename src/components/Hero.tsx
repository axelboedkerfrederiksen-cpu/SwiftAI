import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20">
      {/* Subtle radial glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <h1 className="text-balance text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          SwiftAI —{" "}
          <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Giv din virksomhed en AI-upgrade
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-gray-400 sm:text-xl">
          Jeg bygger en AI chatbot, ny hjemmeside og smarte AI-værktøjer til din
          virksomhed — på 4 uger.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#book"
            className="group inline-flex items-center gap-2 rounded-xl bg-blue-500 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-blue-400 hover:shadow-xl hover:shadow-blue-500/25"
          >
            Book en gratis demo
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        </div>

        <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-gray-500">
          Jeg er 15 år og har allerede bygget AI-systemer til danske
          virksomheder. Hvis jeg kan bygge det, kan du bruge det.
        </p>
      </div>
    </section>
  );
}
