import { CandidateFinding, Platform, TakedownNotice } from './types';

export function generateTakedownNotice(finding: CandidateFinding): TakedownNotice {
  const timestamp = new Date().toISOString();
  const handleClean = finding.handle.replace(/^[@u/]+/, '');
  
  let profileUrl = '';
  switch (finding.platform) {
    case 'instagram':
      profileUrl = `https://instagram.com/${handleClean}`;
      break;
    case 'reddit':
      profileUrl = `https://reddit.com/user/${handleClean}`;
      break;
    case 'x':
    case 'twitter':
      profileUrl = `https://x.com/${handleClean}`;
      break;
    case 'telegram':
      profileUrl = `https://t.me/${handleClean}`;
      break;
    case 'facebook':
      profileUrl = `https://facebook.com/${handleClean}`;
      break;
  }

  const recipientMap: Record<Platform, string> = {
    instagram: 'Meta Intellectual Property & Brand Protection Operations (ip@meta.com)',
    facebook: 'Meta Brand Rights Protection Operations',
    x: 'X Corp Trust & Safety / Trademark Policy Desk (trademark@x.com)',
    twitter: 'X Corp Trademark Enforcement Desk',
    telegram: 'Telegram Anti-Scam Operations (@notoscam / abuse@telegram.org)',
    reddit: 'Reddit Legal Operations (legal@reddit.com)',
  };

  const signalsList = finding.signals.map((s, i) => `  ${i + 1}. [SIGNAL] ${s}`).join('\n');

  const formalNoticeBody = `
================================================================================
FORMAL NOTICE OF TRADEMARK INFRINGEMENT & DECEPTIVE BRAND IMPERSONATION
SUBMITTED VIA FRAUDLENS AUTOMATED DEFENSE DISPATCH
================================================================================

DATE OF NOTICE: ${timestamp}
TO: ${recipientMap[finding.platform] || 'Platform Abuse & Safety Operations'}
SUBJECT: Immediate Remediation Request: Impersonation of Registered Trademark "${finding.brandQuery}"

1. INFRINGED ENTITY INFORMATION:
   Brand Target: ${finding.brandQuery}
   Rights Owner: Authorized Brand Trust & Safety Division

2. REPORTED INFRINGING SOCIAL ASSET:
   Platform: ${finding.platform.toUpperCase()}
   Reported Handle: ${finding.handle}
   Reported Profile URL: ${profileUrl}
   Reported Display Name: "${finding.displayName}"

3. SUMMARY OF DECEPTIVE ACTIVITY:
   Our automated Digital Risk Intelligence system (FraudLens Live) has cataloged
   this account engaging in bad-faith impersonation, consumer misdirection, and
   unauthorized representation of "${finding.brandQuery}".

   Assessed Risk Score: ${finding.riskScore} / 100 [PRIORITY: ${finding.riskLevel.toUpperCase()}]

4. FORENSIC SIGNALS & EVIDENCE CATALOG:
${signalsList}

5. REQUESTED REMEDIATION:
   Under applicable terms of service and trademark protections, we respectfully request:
   a. Immediate suspension or deletion of the infringing handle (${finding.handle}).
   b. Preservation of access logs and associated registration details for fraud review.
   c. Suppression of search indexing for deceptive support/reward inquiries.

SUBMITTED BY:
Digital Risk & Brand Intelligence Analyst
FraudLens Security Response
Generated via FraudLens Platform (https://fraudlens.live)
================================================================================
`.trim();

  return {
    platform: finding.platform,
    recipientDept: recipientMap[finding.platform] || 'Safety Operations',
    subject: `[TRADEMARK TAKEDOWN] Unauthorized Impersonation of ${finding.brandQuery} (${finding.handle})`,
    formalNoticeBody,
    evidencePacket: {
      targetHandle: finding.handle,
      profileUrl,
      infringedBrand: finding.brandQuery,
      detectedSignals: finding.signals,
      riskScore: finding.riskScore,
      timestamp,
    },
  };
}
