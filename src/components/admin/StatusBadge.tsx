import type { ServiceHealth } from "@/types/admin";

const classes: Record<ServiceHealth, string> = {
  operational: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  degraded: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  outage: "bg-red-500/15 text-red-300 border-red-500/30",
  maintenance: "bg-blue-500/15 text-blue-300 border-blue-500/30",
};

export default function StatusBadge({ status }: { status: ServiceHealth }) {
  return (
    <span className={`inline-flex rounded-full border px-2 py-1 text-xs font-medium ${classes[status]}`}>
      {status}
    </span>
  );
}
