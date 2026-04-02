import Link from "next/link";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    redirect("/admin/login");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  async function signOut() {
    "use server";
    const serverSupabase = createSupabaseServerClient();
    await serverSupabase?.auth.signOut();
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 lg:flex">
      <AdminSidebar />
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-800 bg-gray-900/40 px-4 py-3">
          <div>
            <p className="text-sm text-gray-400">Logget ind som</p>
            <p className="text-sm font-medium text-white">{user.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="rounded-lg border border-gray-700 px-3 py-2 text-sm text-gray-200 transition hover:border-gray-500"
            >
              Til forsiden
            </Link>
            <form action={signOut}>
              <button
                type="submit"
                className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-900 transition hover:bg-white"
              >
                Log ud
              </button>
            </form>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
