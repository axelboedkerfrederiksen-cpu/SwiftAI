import { Mail, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer id="book" className="border-t border-white/5 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Klar til en AI-upgrade?
        </h2>
        <p className="mt-4 text-gray-400">
          Book en gratis og uforpligtende snak — så finder vi ud af, hvordan AI
          kan hjælpe din virksomhed.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
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

        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500">
          <Mail size={16} />
          <a
            href="https://calendly.com/axelfrederiksen55/new-meeting"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-gray-300"
          >
            axelfrederiksen55@gmail.com
          </a>
        </div>

        <div className="mt-16 border-t border-white/5 pt-8 text-xs text-gray-600">
          © {new Date().getFullYear()} SwiftAI. Alle rettigheder
          forbeholdes.
        </div>
      </div>
    </footer>
  );
}
