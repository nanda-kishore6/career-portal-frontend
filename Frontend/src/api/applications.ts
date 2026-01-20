import api from "./axios";

export interface Application {
  id: string;
  opportunity_id: string;
  title: string;
  organization: string;
  status: string;
  applied_at: string;
}

export async function fetchMyApplications() {
  const res = await api.get("/applications");
  return res.data.applications as Application[];
}

export async function updateApplicationStatus(
  applicationId: string,
  status: string
) {
  return api.patch(`/applications/${applicationId}`, { status });
}
export async function trackApplication(opportunityId: string) {
  return api.post(`/applications/${opportunityId}`);
}