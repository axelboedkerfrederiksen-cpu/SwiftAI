import { cache } from "react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { AnalyticsDaily, Company, Incident, OperationService } from "@/types/admin";

type QueryResult<T> = {
  data: T;
  error: string | null;
};

function noEnvError<T>(fallback: T): QueryResult<T> {
  return {
    data: fallback,
    error: "Supabase er ikke konfigureret. Tilføj NEXT_PUBLIC_SUPABASE_URL og NEXT_PUBLIC_SUPABASE_ANON_KEY.",
  };
}

export const getCompanies = cache(async (): Promise<QueryResult<Company[]>> => {
  const supabase = createSupabaseServerClient();
  if (!supabase) {
    return noEnvError([]);
  }

  const { data, error } = await supabase
    .from("companies")
    .select("id,name,plan,status,created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    return { data: [], error: error.message };
  }

  return { data: (data ?? []) as Company[], error: null };
});

export const getAnalyticsDaily = cache(async (): Promise<QueryResult<AnalyticsDaily[]>> => {
  const supabase = createSupabaseServerClient();
  if (!supabase) {
    return noEnvError([]);
  }

  const { data, error } = await supabase
    .from("analytics_daily")
    .select("date,active_companies,new_signups,conversion_rate,events")
    .order("date", { ascending: false })
    .limit(30);

  if (error) {
    return { data: [], error: error.message };
  }

  return { data: (data ?? []) as AnalyticsDaily[], error: null };
});

export const getOperations = cache(async (): Promise<QueryResult<OperationService[]>> => {
  const supabase = createSupabaseServerClient();
  if (!supabase) {
    return noEnvError([]);
  }

  const { data, error } = await supabase
    .from("operations_status")
    .select("id,service_name,status,response_ms,updated_at")
    .order("service_name", { ascending: true });

  if (error) {
    return { data: [], error: error.message };
  }

  return { data: (data ?? []) as OperationService[], error: null };
});

export const getIncidents = cache(async (): Promise<QueryResult<Incident[]>> => {
  const supabase = createSupabaseServerClient();
  if (!supabase) {
    return noEnvError([]);
  }

  const { data, error } = await supabase
    .from("incidents")
    .select("id,title,severity,status,created_at,resolved_at")
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    return { data: [], error: error.message };
  }

  return { data: (data ?? []) as Incident[], error: null };
});
