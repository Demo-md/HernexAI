export type ServiceEvidence = {
  serviceSlug: string;
  statistic?: string;
  displayText?: string;
  sourceTitle?: string;
  publisher?: string;
  sourceUrl?: string;
  publicationYear?: number;
  accessedAt?: string;
  geographicScope?: string;
  sampleContext?: string;
  approvedForUse: boolean;
  limitation: string;
  benchmarkNotGuarantee: boolean;
};

// No statistical benchmark is published until its primary source and approval are recorded.
export const serviceEvidence: ServiceEvidence[] = [];

export function getApprovedEvidence(serviceSlug: string) {
  return serviceEvidence.find((item) => item.serviceSlug === serviceSlug && item.approvedForUse);
}
