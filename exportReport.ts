import { ActivityLogEvent, CandidateFinding, Platform } from './types';

export interface FraudLensReportJson {
  exportTimestamp: string;
  generatedBy: string;
  brandTarget: string;
  summary: {
    totalMatches: number;
    highRisk: number;
    mediumRisk: number;
    lowRisk: number;
    underReview: number;
    resolved: number;
  };
  networksScanned: Platform[];
  scoringPillars: {
    pillar1: string;
    pillar2: string;
    pillar3: string;
    pillar4: string;
  };
  findings: Array<{
    id: string;
    handle: string;
    displayName: string;
    platform: Platform;
    riskScore: number;
    riskLevel: string;
    status: string;
    signals: string[];
    scoreBreakdown: {
      nameSimilarity: number;
      brandTerms: number;
      impersonationSignals: number;
      identityOwnership: number;
    };
  }>;
  recentAuditLogs: ActivityLogEvent[];
}

export function generateReportData(
  findings: CandidateFinding[],
  brandTarget: string,
  networksScanned: Platform[],
  activityLogs: ActivityLogEvent[] = []
): FraudLensReportJson {
  const highRisk = findings.filter((f) => f.riskLevel === 'High').length;
  const mediumRisk = findings.filter((f) => f.riskLevel === 'Medium').length;
  const lowRisk = findings.filter((f) => f.riskLevel === 'Low').length;
  const underReview = findings.filter((f) => f.status === 'Under review').length;
  const resolved = findings.filter((f) => f.status === 'Resolved').length;

  return {
    exportTimestamp: new Date().toISOString(),
    generatedBy: 'Alex Morgan (Demo analyst)',
    brandTarget,
    summary: {
      totalMatches: findings.length,
      highRisk,
      mediumRisk,
      lowRisk,
      underReview,
      resolved,
    },
    networksScanned,
    scoringPillars: {
      pillar1: 'Name similarity (0–35 pts) - Normalized phonetic and string distance',
      pillar2: 'Brand terms (0–20 pts) - Official and product vocabulary presence',
      pillar3: 'Impersonation signals (0–25 pts) - Phishing, support traps, and urgency cues',
      pillar4: 'Identity / ownership (0–20 pts) - Verification badge and provenance deficits',
    },
    findings: findings.map((f) => ({
      id: f.id,
      handle: f.handle,
      displayName: f.displayName,
      platform: f.platform,
      riskScore: f.riskScore,
      riskLevel: f.riskLevel,
      status: f.status,
      signals: f.signals,
      scoreBreakdown: f.scoreBreakdown,
    })),
    recentAuditLogs: activityLogs.slice(0, 10),
  };
}

export function downloadJsonReport(data: FraudLensReportJson, filename = 'fraudlens-demo-report.json'): void {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
