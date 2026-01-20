import api from "./axios";
import type { Opportunity } from "../types/opportunity";

export interface PaginatedOpportunities {
  opportunities: Opportunity[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export async function fetchOpportunities(
  search?: string,
  category?: string,
  page: number = 1,
  limit: number = 10
): Promise<PaginatedOpportunities> {
  const res = await api.get("/opportunities", {
    params: {
      ...(search ? { search } : {}),
      ...(category ? { category } : {}),
      page,
      limit,
    },
  });

  return res.data;
}



export async function updateOpportunity(
  id: string,
  data: Partial<Opportunity>
) {
  return api.put(`/opportunities/${id}`, data);
}

export async function deleteOpportunity(id: string) {
  return api.delete(`/opportunities/${id}`);
}
