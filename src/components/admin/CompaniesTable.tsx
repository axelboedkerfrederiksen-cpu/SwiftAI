"use client";

import { useMemo, useState } from "react";
import type { Company, CompanyStatus } from "@/types/admin";

type CompanyForm = {
  name: string;
  plan: string;
  status: CompanyStatus;
};

const defaultForm: CompanyForm = {
  name: "",
  plan: "starter",
  status: "trial",
};

export default function CompaniesTable({ companies }: { companies: Company[] }) {
  const [rows, setRows] = useState(companies);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [createForm, setCreateForm] = useState<CompanyForm>(defaultForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<CompanyForm>(defaultForm);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function parseResponse(response: Response) {
    const payload = (await response.json().catch(() => ({}))) as {
      data?: Company;
      error?: string;
    };
    if (!response.ok) {
      throw new Error(payload.error ?? "Ukendt fejl");
    }
    return payload;
  }

  async function createCompany() {
    setError(null);
    setIsCreating(true);

    try {
      const response = await fetch("/api/admin/companies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createForm),
      });

      const payload = await parseResponse(response);
      if (payload.data) {
        setRows((previous) => [payload.data as Company, ...previous]);
      }
      setCreateForm(defaultForm);
    } catch (requestError) {
      setError((requestError as Error).message);
    } finally {
      setIsCreating(false);
    }
  }

  function startEdit(company: Company) {
    setEditId(company.id);
    setEditForm({
      name: company.name,
      plan: company.plan,
      status: company.status,
    });
  }

  function cancelEdit() {
    setEditId(null);
    setEditForm(defaultForm);
  }

  async function saveEdit(id: string) {
    setError(null);
    setBusyId(id);

    try {
      const response = await fetch(`/api/admin/companies/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      const payload = await parseResponse(response);

      if (payload.data) {
        setRows((previous) => previous.map((company) => (company.id === id ? (payload.data as Company) : company)));
      }
      cancelEdit();
    } catch (requestError) {
      setError((requestError as Error).message);
    } finally {
      setBusyId(null);
    }
  }

  async function deleteCompany(id: string) {
    const confirmed = window.confirm("Er du sikker på, at du vil slette virksomheden?");
    if (!confirmed) {
      return;
    }

    setError(null);
    setBusyId(id);

    try {
      const response = await fetch(`/api/admin/companies/${id}`, {
        method: "DELETE",
      });
      await parseResponse(response);
      setRows((previous) => previous.filter((company) => company.id !== id));
      if (editId === id) {
        cancelEdit();
      }
    } catch (requestError) {
      setError((requestError as Error).message);
    } finally {
      setBusyId(null);
    }
  }

  const filtered = useMemo(() => {
    return rows.filter((company) => {
      const matchesQuery = company.name.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === "all" || company.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [rows, query, status]);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-gray-800 bg-gray-900/40 p-4">
        <p className="mb-3 text-sm font-medium text-white">Opret virksomhed</p>
        <div className="grid gap-3 md:grid-cols-4">
          <input
            value={createForm.name}
            onChange={(event) =>
              setCreateForm((previous) => ({
                ...previous,
                name: event.target.value,
              }))
            }
            placeholder="Virksomhedsnavn"
            className="rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 outline-none ring-blue-400 transition focus:ring"
          />
          <input
            value={createForm.plan}
            onChange={(event) =>
              setCreateForm((previous) => ({
                ...previous,
                plan: event.target.value,
              }))
            }
            placeholder="Plan"
            className="rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 outline-none ring-blue-400 transition focus:ring"
          />
          <select
            value={createForm.status}
            onChange={(event) =>
              setCreateForm((previous) => ({
                ...previous,
                status: event.target.value as CompanyStatus,
              }))
            }
            className="rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 outline-none ring-blue-400 transition focus:ring"
          >
            <option value="active">Active</option>
            <option value="trial">Trial</option>
            <option value="paused">Paused</option>
            <option value="churned">Churned</option>
          </select>
          <button
            type="button"
            disabled={isCreating}
            onClick={createCompany}
            className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isCreating ? "Opretter..." : "Opret"}
          </button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Søg virksomhed"
          className="rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 outline-none ring-blue-400 transition focus:ring"
        />
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 outline-none ring-blue-400 transition focus:ring"
        >
          <option value="all">Alle statuser</option>
          <option value="active">Active</option>
          <option value="trial">Trial</option>
          <option value="paused">Paused</option>
          <option value="churned">Churned</option>
        </select>
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {error}
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-gray-800">
        <table className="min-w-full divide-y divide-gray-800 text-sm">
          <thead className="bg-gray-900/60 text-left text-gray-300">
            <tr>
              <th className="px-4 py-3 font-medium">Navn</th>
              <th className="px-4 py-3 font-medium">Plan</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Oprettet</th>
              <th className="px-4 py-3 font-medium">Handlinger</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 bg-gray-950/80 text-gray-100">
            {filtered.map((company) => {
              const isEditing = editId === company.id;
              const isBusy = busyId === company.id;

              return (
                <tr key={company.id}>
                  <td className="px-4 py-3">
                    {isEditing ? (
                      <input
                        value={editForm.name}
                        onChange={(event) =>
                          setEditForm((previous) => ({
                            ...previous,
                            name: event.target.value,
                          }))
                        }
                        className="w-full rounded-md border border-gray-700 bg-gray-900 px-2 py-1 text-sm text-gray-100"
                      />
                    ) : (
                      company.name
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {isEditing ? (
                      <input
                        value={editForm.plan}
                        onChange={(event) =>
                          setEditForm((previous) => ({
                            ...previous,
                            plan: event.target.value,
                          }))
                        }
                        className="w-full rounded-md border border-gray-700 bg-gray-900 px-2 py-1 text-sm text-gray-100"
                      />
                    ) : (
                      company.plan
                    )}
                  </td>
                  <td className="px-4 py-3 capitalize">
                    {isEditing ? (
                      <select
                        value={editForm.status}
                        onChange={(event) =>
                          setEditForm((previous) => ({
                            ...previous,
                            status: event.target.value as CompanyStatus,
                          }))
                        }
                        className="rounded-md border border-gray-700 bg-gray-900 px-2 py-1 text-sm text-gray-100"
                      >
                        <option value="active">Active</option>
                        <option value="trial">Trial</option>
                        <option value="paused">Paused</option>
                        <option value="churned">Churned</option>
                      </select>
                    ) : (
                      company.status
                    )}
                  </td>
                  <td className="px-4 py-3">{new Date(company.created_at).toLocaleDateString("da-DK")}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      {isEditing ? (
                        <>
                          <button
                            type="button"
                            disabled={isBusy}
                            onClick={() => saveEdit(company.id)}
                            className="rounded-md bg-emerald-500 px-2 py-1 text-xs font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            Gem
                          </button>
                          <button
                            type="button"
                            disabled={isBusy}
                            onClick={cancelEdit}
                            className="rounded-md border border-gray-600 px-2 py-1 text-xs text-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            Annuller
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            disabled={isBusy}
                            onClick={() => startEdit(company)}
                            className="rounded-md border border-blue-500/40 px-2 py-1 text-xs text-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            Rediger
                          </button>
                          <button
                            type="button"
                            disabled={isBusy}
                            onClick={() => deleteCompany(company.id)}
                            className="rounded-md border border-red-500/40 px-2 py-1 text-xs text-red-200 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            Slet
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td className="px-4 py-8 text-center text-gray-400" colSpan={5}>
                  Ingen virksomheder matcher dine filtre.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
