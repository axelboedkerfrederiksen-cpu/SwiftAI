export type CompanyStatus = "active" | "trial" | "paused" | "churned";

export type Company = {
  id: string;
  name: string;
  plan: string;
  status: CompanyStatus;
  created_at: string;
};

export type AnalyticsDaily = {
  date: string;
  active_companies: number;
  new_signups: number;
  conversion_rate: number;
  events: number;
};

export type ServiceHealth = "operational" | "degraded" | "outage" | "maintenance";

export type OperationService = {
  id: string;
  service_name: string;
  status: ServiceHealth;
  response_ms: number;
  updated_at: string;
};

export type Incident = {
  id: string;
  title: string;
  severity: "low" | "medium" | "high" | "critical";
  status: "open" | "monitoring" | "resolved";
  created_at: string;
  resolved_at: string | null;
};
