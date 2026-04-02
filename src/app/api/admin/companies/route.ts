import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { CompanyStatus } from "@/types/admin";

const allowedStatuses: CompanyStatus[] = ["active", "trial", "paused", "churned"];

function validatePayload(payload: unknown) {
  if (!payload || typeof payload !== "object") {
    return { error: "Ugyldig payload." };
  }

  const body = payload as { name?: string; plan?: string; status?: string };

  if (!body.name || !body.name.trim()) {
    return { error: "Navn er påkrævet." };
  }

  if (!body.plan || !body.plan.trim()) {
    return { error: "Plan er påkrævet." };
  }

  if (!body.status || !allowedStatuses.includes(body.status as CompanyStatus)) {
    return { error: "Ugyldig status." };
  }

  return {
    data: {
      name: body.name.trim(),
      plan: body.plan.trim(),
      status: body.status as CompanyStatus,
    },
  };
}

export async function POST(request: Request) {
  const supabase = createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase er ikke konfigureret." }, { status: 500 });
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Ikke autoriseret." }, { status: 401 });
  }

  const payload = await request.json();
  const validated = validatePayload(payload);

  if (!validated.data) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("companies")
    .insert(validated.data)
    .select("id,name,plan,status,created_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ data }, { status: 201 });
}
