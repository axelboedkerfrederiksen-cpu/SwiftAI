import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { CompanyStatus } from "@/types/admin";

const allowedStatuses: CompanyStatus[] = ["active", "trial", "paused", "churned"];

function validatePatchPayload(payload: unknown) {
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

async function requireUser() {
  const supabase = createSupabaseServerClient();
  if (!supabase) {
    return { error: NextResponse.json({ error: "Supabase er ikke konfigureret." }, { status: 500 }) };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: NextResponse.json({ error: "Ikke autoriseret." }, { status: 401 }) };
  }

  return { supabase };
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const auth = await requireUser();
  if (auth.error) {
    return auth.error;
  }

  const payload = await request.json();
  const validated = validatePatchPayload(payload);

  if (!validated.data) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  const { data, error } = await auth.supabase
    .from("companies")
    .update(validated.data)
    .eq("id", params.id)
    .select("id,name,plan,status,created_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ data }, { status: 200 });
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const auth = await requireUser();
  if (auth.error) {
    return auth.error;
  }

  const { error } = await auth.supabase.from("companies").delete().eq("id", params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
