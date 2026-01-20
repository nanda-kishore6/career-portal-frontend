export interface Opportunity {
  id: string;
  title: string;
  description: string;
  organization: string;
  deadline: string;
  isBookmarked?: boolean;
  isApplied?: boolean;
  apply_link?: string;
  organization_logo?: string | null;

}
