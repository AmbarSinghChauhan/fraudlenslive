export type Platform = 'instagram' | 'reddit' | 'x' | 'telegram' | 'twitter' | 'facebook';

export type RiskLevel = 'High' | 'Medium' | 'Low';

export type FindingStatus = 'New' | 'Under review' | 'Resolved';

export interface ScoreBreakdown {
  nameSimilarity: number;     // 0 - 35
  brandTerms: number;         // 0 - 20
  impersonationSignals: number; // 0 - 25
  identityOwnership: number;  // 0 - 20
}

export interface CandidateFinding {
  id: string;
  brandQuery: string;
  displayName: string;
  handle: string;
  platform: Platform;
  riskScore: number; // 0 - 100
  riskLevel: RiskLevel;
  status: FindingStatus;
  avatarUrl?: string;
  signals: string[];
  scoreBreakdown: ScoreBreakdown;
  metadata?: {
    bio?: string;
    followersCount?: number;
    accountAgeDays?: number;
    verified: boolean;
    externalLink?: string;
    homoglyphsDetected?: string[];
  };
}

export type ActionType = 
  | 'SCAN_STARTED' 
  | 'STATUS_UPDATED' 
  | 'RESOLVED' 
  | 'REPORT_EXPORTED' 
  | 'SESSION_AUTH'
  | 'TAKEDOWN_GENERATED'
  | 'UPI_SCANNED';

export interface ActivityLogEvent {
  id: string;
  timestamp: string;
  actor: {
    name: string;
    role: string;
    avatarInitials: string;
  };
  actionType: ActionType;
  targetHandle?: string;
  details: string;
}

export interface TakedownNotice {
  platform: Platform | 'google-safebrowsing';
  recipientDept: string;
  subject: string;
  formalNoticeBody: string;
  evidencePacket: {
    targetHandle: string;
    profileUrl: string;
    infringedBrand: string;
    detectedSignals: string[];
    riskScore: number;
    timestamp: string;
  };
}

export interface UpiRiskAssessment {
  vpaHandle: string;
  impersonatedBrand: string;
  providerPsp: string;
  similarityScore: number;
  anomalyLevel: 'CRITICAL' | 'SUSPICIOUS' | 'LEGITIMATE';
  reasons: string[];
  recommendedAction: string;
}
