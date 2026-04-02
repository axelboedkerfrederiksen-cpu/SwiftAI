import StatusBadge from "@/components/admin/StatusBadge";
import { getIncidents, getOperations } from "@/lib/admin-data";

export default async function DriftstatusPage() {
  const [operationsResult, incidentsResult] = await Promise.all([
    getOperations(),
    getIncidents(),
  ]);

  const hasIssue = operationsResult.data.some((service) =>
    ["degraded", "outage"].includes(service.status),
  );

  return (
    <section>
      <h1 className="text-3xl font-semibold text-white">Driftstatus</h1>
      <p className="mt-2 text-sm text-gray-400">Systemstatus fra operations_status og incidents.</p>

      <div className="mt-6 rounded-xl border border-gray-800 bg-gray-900/50 p-4">
        <p className="text-sm text-gray-400">Global status</p>
        <p className={`mt-2 text-2xl font-semibold ${hasIssue ? "text-amber-300" : "text-emerald-300"}`}>
          {hasIssue ? "Degraded" : "Operational"}
        </p>
      </div>

      {(operationsResult.error || incidentsResult.error) && (
        <div className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-200">
          Kunne ikke hente alle driftdata: {operationsResult.error || incidentsResult.error}
        </div>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-800 bg-gray-900/40 p-4">
          <h2 className="text-lg font-medium text-white">Services</h2>
          <div className="mt-4 space-y-3">
            {operationsResult.data.map((service) => (
              <div key={service.id} className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-950/60 px-3 py-2">
                <div>
                  <p className="text-sm font-medium text-white">{service.service_name}</p>
                  <p className="text-xs text-gray-400">{service.response_ms} ms • Opdateret {new Date(service.updated_at).toLocaleTimeString("da-DK")}</p>
                </div>
                <StatusBadge status={service.status} />
              </div>
            ))}
            {operationsResult.data.length === 0 && (
              <p className="text-sm text-gray-400">Ingen services fundet.</p>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-gray-800 bg-gray-900/40 p-4">
          <h2 className="text-lg font-medium text-white">Incidents</h2>
          <div className="mt-4 space-y-3">
            {incidentsResult.data.map((incident) => (
              <div key={incident.id} className="rounded-lg border border-gray-800 bg-gray-950/60 px-3 py-2">
                <p className="text-sm font-medium text-white">{incident.title}</p>
                <p className="mt-1 text-xs text-gray-400">
                  {incident.severity.toUpperCase()} • {incident.status} • {new Date(incident.created_at).toLocaleString("da-DK")}
                </p>
              </div>
            ))}
            {incidentsResult.data.length === 0 && (
              <p className="text-sm text-gray-400">Ingen incidents fundet.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
