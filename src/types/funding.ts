export type DealStage = 'idea' | 'mvp' | 'early' | 'growth' | 'scale';
export type ListingStatus = 'draft' | 'active' | 'closed' | 'expired';
export type FundingEntityType = 'deal' | 'cohort' | 'grant';

export interface Deal {
  id: string;
  created_by: string;
  business_name: string;
  description: string;
  revenue: number;
  funding_ask: number;
  equity_offered: number;
  stage: DealStage;
  industry: string;
  location: string;
  traction_metrics: Record<string, unknown>;
  attachments: unknown[];
  status: ListingStatus;
  created_at: string;
  updated_at: string;
}

export interface Cohort {
  id: string;
  created_by: string;
  organization_name: string;
  program_name: string;
  description: string;
  benefits: string[];
  equity_taken: number | null;
  stipend: number | null;
  start_date: string | null;
  end_date: string | null;
  application_deadline: string | null;
  location: string;
  eligibility_criteria: string[];
  application_link: string;
  status: ListingStatus;
  created_at: string;
  updated_at: string;
}

export interface Grant {
  id: string;
  created_by: string;
  title: string;
  provider_name: string;
  description: string;
  grant_amount: number;
  eligibility: string[];
  deadline: string | null;
  application_link: string;
  tags: string[];
  status: ListingStatus;
  created_at: string;
  updated_at: string;
}
