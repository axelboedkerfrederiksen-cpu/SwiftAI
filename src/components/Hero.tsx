import { ArrowRight, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20">
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Main center glow */}
        <div className="orb-float-a absolute top-1/2 left-1/2 h-[750px] w-[750px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.08] blur-[140px]" />
        {/* Top-right accent */}
        <div className="orb-float-b absolute -top-40 right-1/4 h-[500px] w-[500px] rounded-full bg-blue-600/[0.06] blur-[110px]" />
        {/* Bottom-left accent */}
        <div className="orb-pulse absolute bottom-10 left-1/5 h-[380px] w-[380px] rounded-full bg-indigo-500/[0.07] blur-[100px]" />

        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #93c5fd 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        {/* Horizontal hairline */}
        <div className="absolute top-[46%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/[0.07] to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Eyebrow badge */}
        <div className="hero-badge mb-7 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/[0.08] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-400">
          <Zap size={11} />
          AI til din virksomhed
        </div>

        <h1 className="hero-title text-balance text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          SwiftAI — Giv din virksomhed en AI-upgrade
        </h1>

        <p className="hero-subtitle mx-auto mt-6 max-w-2xl text-balance text-lg text-gray-400 sm:text-xl">
          Jeg bygger en AI chatbot, ny hjemmeside og smarte AI-værktøjer til din
          virksomhed — på 4 uger.
        </p>

        <div className="hero-cta mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="https://calendly.com/axelfrederiksen55/new-meeting"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-xl bg-blue-500 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-blue-400 hover:shadow-xl hover:shadow-blue-500/25"
          >
            Book en gratis demo
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        </div>

        <p className="hero-note mx-auto mt-8 max-w-xl text-sm leading-relaxed text-gray-500">
          Jeg er 15 år og har allerede bygget AI-systemer til danske
          virksomheder. Hvis jeg kan bygge det, kan du bruge det.
        </p>
      </div>

      {/* Bottom fade-out */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#030712] to-transparent" />
    </section>
  );
}
