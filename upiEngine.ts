import { UpiRiskAssessment } from './types';
import { jaroWinkler } from './scoring/stringSimilarity';

const COMMON_FINANCIAL_PSP = [
  'okaxis',
  'okhdfcbank',
  'oksbi',
  'okicici',
  'paytm',
  'ibl',
  'ybl',
  'axl',
  'upi',
];

const SUSPICIOUS_PAYMENT_KEYWORDS = [
  'support',
  'refund',
  'care',
  'helpdesk',
  'verify',
  'kyc',
  'cashback',
  'rewards',
  'security',
];

export function assessUpiRisk(vpa: string, officialBrand: string): UpiRiskAssessment {
  const parts = vpa.toLowerCase().trim().split('@');
  const username = parts[0] || '';
  const psp = parts[1] || '';

  const reasons: string[] = [];
  const cleanBrand = officialBrand.toLowerCase().replace(/[^a-z0-9]/g, '');

  const similarity = jaroWinkler(cleanBrand, username);

  let anomalyLevel: 'CRITICAL' | 'SUSPICIOUS' | 'LEGITIMATE' = 'LEGITIMATE';
  let recommendedAction = 'No immediate action required. Handle does not exhibit impersonation characteristics.';

  const hasBrandName = username.includes(cleanBrand);
  const matchedKeywords = SUSPICIOUS_PAYMENT_KEYWORDS.filter((kw) => username.includes(kw));

  if (hasBrandName && matchedKeywords.length > 0) {
    anomalyLevel = 'CRITICAL';
    reasons.push(`Handle combines target brand "${officialBrand}" with financial social-engineering terms (${matchedKeywords.join(', ')})`);
    reasons.push(`Unregistered individual VPA operating under corporate brand disguise`);
    recommendedAction = 'Dispatch urgent NPCI / PSP freeze notice and alert merchant protection unit.';
  } else if (hasBrandName) {
    anomalyLevel = 'SUSPICIOUS';
    reasons.push(`Handle incorporates target brand name without corporate merchant identifier prefix`);
    recommendedAction = 'Request ownership verification from the acquiring PSP bank.';
  } else if (similarity > 0.8) {
    anomalyLevel = 'SUSPICIOUS';
    reasons.push(`Fuzzy match with brand name (${Math.round(similarity * 100)}% acoustic overlap)`);
    recommendedAction = 'Monitor transaction volume for chargeback and dispute anomalies.';
  }

  if (psp && !COMMON_FINANCIAL_PSP.includes(psp)) {
    reasons.push(`Non-standard or private banking PSP handle: @${psp}`);
  }

  return {
    vpaHandle: vpa,
    impersonatedBrand: officialBrand,
    providerPsp: psp,
    similarityScore: Math.round(similarity * 100),
    anomalyLevel,
    reasons,
    recommendedAction,
  };
}
