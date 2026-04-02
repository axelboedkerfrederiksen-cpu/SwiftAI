import CompaniesTable from "@/components/admin/CompaniesTable";
import { getCompanies } from "@/lib/admin-data";

export default async function VirksomhederPage() {
  const { data, error } = await getCompanies();

  return (
    <section>
      <h1 className="text-3xl font-semibold text-white">Virksomheder</h1>
      <p className="mt-2 text-sm text-gray-400">Live data fra Supabase-tabellen companies.</p>

      {error && (
        <div className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-200">
          Kunne ikke hente data: {error}
        </div>
      )}

      <div className="mt-6">
        <CompaniesTable companies={data} />
      </div>
    </section>
  );
}
