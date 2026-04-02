import { getAnalyticsDaily } from "@/lib/admin-data";

function pct(value: number) {
  return `${value.toFixed(1)}%`;
}

export default async function AnalyticsPage() {
  const { data, error } = await getAnalyticsDaily();
  const latest = data[0];

  return (
    <section>
      <h1 className="text-3xl font-semibold text-white">Analytics</h1>
      <p className="mt-2 text-sm text-gray-400">KPI&apos;er og seneste 30 dages trend fra analytics_daily.</p>

      {error && (
        <div className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-200">
          Kunne ikke hente analytics: {error}
        </div>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-xl border border-gray-800 bg-gray-900/50 p-4">
          <p className="text-sm text-gray-400">Aktive virksomheder</p>
          <p className="mt-2 text-2xl font-semibold text-white">{latest?.active_companies ?? 0}</p>
        </article>
        <article className="rounded-xl border border-gray-800 bg-gray-900/50 p-4">
          <p className="text-sm text-gray-400">Nye signups</p>
          <p className="mt-2 text-2xl font-semibold text-white">{latest?.new_signups ?? 0}</p>
        </article>
        <article className="rounded-xl border border-gray-800 bg-gray-900/50 p-4">
          <p className="text-sm text-gray-400">Konverteringsrate</p>
          <p className="mt-2 text-2xl font-semibold text-white">{latest ? pct(latest.conversion_rate) : "0.0%"}</p>
        </article>
        <article className="rounded-xl border border-gray-800 bg-gray-900/50 p-4">
          <p className="text-sm text-gray-400">Events</p>
          <p className="mt-2 text-2xl font-semibold text-white">{latest?.events ?? 0}</p>
        </article>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-gray-800">
        <table className="min-w-full divide-y divide-gray-800 text-sm">
          <thead className="bg-gray-900/60 text-left text-gray-300">
            <tr>
              <th className="px-4 py-3 font-medium">Dato</th>
              <th className="px-4 py-3 font-medium">Aktive</th>
              <th className="px-4 py-3 font-medium">Signups</th>
              <th className="px-4 py-3 font-medium">Conversion</th>
              <th className="px-4 py-3 font-medium">Events</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 bg-gray-950/80 text-gray-100">
            {data.map((row) => (
              <tr key={row.date}>
                <td className="px-4 py-3">{new Date(row.date).toLocaleDateString("da-DK")}</td>
                <td className="px-4 py-3">{row.active_companies}</td>
                <td className="px-4 py-3">{row.new_signups}</td>
                <td className="px-4 py-3">{pct(row.conversion_rate)}</td>
                <td className="px-4 py-3">{row.events}</td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td className="px-4 py-8 text-center text-gray-400" colSpan={5}>
                  Ingen analytics data fundet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
