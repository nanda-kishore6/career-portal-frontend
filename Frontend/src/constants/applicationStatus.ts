export const APPLICATION_STATUSES = [
  "APPLIED",
  "UNDER_REVIEW",
  "SELECTED",
  "REJECTED",
] as const;

export type ApplicationStatus =
  (typeof APPLICATION_STATUSES)[number];
