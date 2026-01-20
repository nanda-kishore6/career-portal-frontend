import api from "./axios";

// ⭐ Add bookmark
export async function bookmarkOpportunity(opportunityId: string) {
  return api.post(`/bookmarks/${opportunityId}`);
}

// ⭐ Remove bookmark
export async function unbookmarkOpportunity(opportunityId: string) {
  return api.delete(`/bookmarks/${opportunityId}`);
}
export async function fetchBookmarks() {
  const res = await api.get("/bookmarks");
  return res.data.bookmarks;
}