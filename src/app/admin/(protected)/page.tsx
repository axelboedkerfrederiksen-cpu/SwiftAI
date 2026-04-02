import Link from "next/link";
import { getAnalyticsDaily, getCompanies, getOperations } from "@/lib/admin-data";

export default async function AdminOverviewPage() {
  const [companiesResult, analyticsResult, operationsResult] = await Promise.all([
    getCompanies(),
    getAnalyticsDaily(),
    getOperations(),
  ]);

  const activeServices = operationsResult.data.filter((service) => service.status === "operational").length;
  const latestAnalytics = analyticsResult.data[0];

  return (
    <section>
      <h1 className="text-3xl font-semibold text-white">Admin Overblik</h1>
      <p className="mt-2 text-sm text-gray-400">Realtime oversigt over virksomheder, performance og drift.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-xl border border-gray-800 bg-gray-900/50 p-4">
          <p className="text-sm text-gray-400">Virksomheder</p>
          <p className="mt-2 text-2xl font-semibold text-white">{companiesResult.data.length}</p>
        </article>
        <article className="rounded-xl border border-gray-800 bg-gray-900/50 p-4">
          <p className="text-sm text-gray-400">Nye signups (sidste dag)</p>
          <p className="mt-2 text-2xl font-semibold text-white">{latestAnalytics?.new_signups ?? 0}</p>
        </article>
        <article className="rounded-xl border border-gray-800 bg-gray-900/50 p-4">
          <p className="text-sm text-gray-400">Events (sidste dag)</p>
          <p className="mt-2 text-2xl font-semibold text-white">{latestAnalytics?.events ?? 0}</p>
        </article>
        <article className="rounded-xl border border-gray-800 bg-gray-900/50 p-4">
          <p className="text-sm text-gray-400">Operational services</p>
          <p className="mt-2 text-2xl font-semibold text-white">{activeServices}</p>
        </article>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <Link href="/admin/virksomheder" className="rounded-xl border border-gray-800 bg-gray-900/40 p-4 hover:border-blue-500/40">
          <h2 className="font-medium text-white">Virksomheder</h2>
          <p className="mt-1 text-sm text-gray-400">Søg, filtrer og overvåg kundebasen.</p>
        </Link>
        <Link href="/admin/analytics" className="rounded-xl border border-gray-800 bg-gray-900/40 p-4 hover:border-blue-500/40">
          <h2 className="font-medium text-white">Analytics</h2>
          <p className="mt-1 text-sm text-gray-400">Se KPI&apos;er og trendlinjer fra Supabase.</p>
        </Link>
        <Link href="/admin/driftstatus" className="rounded-xl border border-gray-800 bg-gray-900/40 p-4 hover:border-blue-500/40">
          <h2 className="font-medium text-white">Driftstatus</h2>
          <p className="mt-1 text-sm text-gray-400">Følg systemstatus og incidents.</p>
        </Link>
      </div>

      {(companiesResult.error || analyticsResult.error || operationsResult.error) && (
        <div className="mt-6 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-200">
          Datafejl: {companiesResult.error || analyticsResult.error || operationsResult.error}
        </div>
      )}
    </section>
  );
}
