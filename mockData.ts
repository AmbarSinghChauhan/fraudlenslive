import { ActivityLogEvent, CandidateFinding, Platform } from './types';
import { evaluateCandidateRisk } from './scoring/riskEngine';

export const INITIAL_FINDINGS: CandidateFinding[] = [
  {
    id: 'cand-01',
    brandQuery: 'Northstar Labs',
    displayName: 'Northstar Labs Helpdesk',
    handle: '@northstar_labs_help',
    platform: 'instagram',
    riskScore: 96,
    riskLevel: 'High',
    status: 'New',
    signals: [
      'Near-match brand name paired with support language',
      'Claims official affiliation without verification',
      'Bio asks users to verify accounts and claim a reward',
      'Owner identity is unavailable in this synthetic record',
    ],
    scoreBreakdown: {
      nameSimilarity: 34,
      brandTerms: 19,
      impersonationSignals: 24,
      identityOwnership: 19,
    },
    metadata: {
      bio: 'Official Northstar Labs Customer Support. DM us for account verification, password resets, and loyalty rewards! 🚀',
      verified: false,
      accountAgeDays: 14,
      externalLink: 'https://t.me/NorthstarResolveBot',
    },
  },
  {
    id: 'cand-02',
    brandQuery: 'Northstar Labs',
    displayName: 'Northstar Official Rewards',
    handle: '@brand_rewards',
    platform: 'x',
    riskScore: 92,
    riskLevel: 'High',
    status: 'New',
    signals: [
      'Official-sounding reward claim / urgent prize incentive language',
      'Near-match brand name targeting community members',
      'External link redirects to unauthorized domain',
      'Unverified handle claiming brand executive authority',
    ],
    scoreBreakdown: {
      nameSimilarity: 31,
      brandTerms: 18,
      impersonationSignals: 24,
      identityOwnership: 19,
    },
    metadata: {
      bio: 'Annual Community Airdrop & Rewards portal for Northstar Labs users. Claim your 500 NL tokens today! Link below 👇',
      verified: false,
      accountAgeDays: 6,
    },
  },
  {
    id: 'cand-03',
    brandQuery: 'Northstar Labs',
    displayName: 'Northstar Security Bot',
    handle: '@NorthstarSecureBot',
    platform: 'telegram',
    riskScore: 91,
    riskLevel: 'High',
    status: 'New',
    signals: [
      'Automated bot claiming security/verification powers',
      'Direct message prompt soliciting account identification',
      'No cryptographic signature or authorized verification',
    ],
    scoreBreakdown: {
      nameSimilarity: 33,
      brandTerms: 17,
      impersonationSignals: 22,
      identityOwnership: 19,
    },
    metadata: {
      bio: 'Official 2FA and Account Security validation bot for Northstar. Send /start to verify your credentials.',
      verified: false,
      accountAgeDays: 22,
    },
  },
  {
    id: 'cand-04',
    brandQuery: 'Northstar Labs',
    displayName: 'Northstar Support Desk',
    handle: '@brand_helpdesk',
    platform: 'instagram',
    riskScore: 88,
    riskLevel: 'High',
    status: 'Resolved',
    signals: [
      'Keyword stuffing with brand support terminology',
      'Unverified profile soliciting direct contact',
    ],
    scoreBreakdown: {
      nameSimilarity: 30,
      brandTerms: 18,
      impersonationSignals: 21,
      identityOwnership: 19,
    },
    metadata: {
      bio: 'Resolution team for all customer inquiries. Not monitored 24/7.',
      verified: false,
      accountAgeDays: 45,
    },
  },
  {
    id: 'cand-05',
    brandQuery: 'Northstar Labs',
    displayName: 'Brand Secure Bot',
    handle: '@brand_secure_bot',
    platform: 'telegram',
    riskScore: 85,
    riskLevel: 'High',
    status: 'New',
    signals: [
      'Spoofed security identity',
      'Prompting for token confirmation',
    ],
    scoreBreakdown: {
      nameSimilarity: 28,
      brandTerms: 17,
      impersonationSignals: 21,
      identityOwnership: 19,
    },
    metadata: {
      bio: 'Instant alert bot for brand network notifications.',
      verified: false,
      accountAgeDays: 18,
    },
  },
  {
    id: 'cand-06',
    brandQuery: 'Northstar Labs',
    displayName: 'Northstar Support Desk Reddit',
    handle: 'u/Northstar_SupportDesk',
    platform: 'reddit',
    riskScore: 82,
    riskLevel: 'High',
    status: 'New',
    signals: [
      'Moderator / Official claim in subreddit responses',
      'Directing users to off-reddit web forms',
    ],
    scoreBreakdown: {
      nameSimilarity: 30,
      brandTerms: 16,
      impersonationSignals: 19,
      identityOwnership: 17,
    },
    metadata: {
      bio: 'Official community support representative. DM for unresolved ticket escalations.',
      verified: false,
      accountAgeDays: 31,
    },
  },
  {
    id: 'cand-07',
    brandQuery: 'Northstar Labs',
    displayName: 'Northstar Careers Portal',
    handle: '@northstarlabscareers',
    platform: 'x',
    riskScore: 68,
    riskLevel: 'Medium',
    status: 'New',
    signals: [
      'Brand name containment with hiring/recruitment modifier',
      'Unconfirmed recruitment agency connection',
    ],
    scoreBreakdown: {
      nameSimilarity: 29,
      brandTerms: 15,
      impersonationSignals: 12,
      identityOwnership: 12,
    },
    metadata: {
      bio: 'We are hiring! Remote engineering & product management openings at Northstar Labs.',
      verified: false,
      accountAgeDays: 80,
    },
  },
  {
    id: 'cand-08',
    brandQuery: 'Northstar Labs',
    displayName: 'Brand Promotions & Perks',
    handle: '@brand_promos',
    platform: 'facebook',
    riskScore: 66,
    riskLevel: 'Medium',
    status: 'New',
    signals: [
      'Commercial incentives using brand likeness',
      'Affiliate link distribution in posts',
    ],
    scoreBreakdown: {
      nameSimilarity: 25,
      brandTerms: 14,
      impersonationSignals: 14,
      identityOwnership: 13,
    },
    metadata: {
      bio: 'Exclusive coupons and partner discount codes for Northstar Labs software suite.',
      verified: false,
      accountAgeDays: 95,
    },
  },
  {
    id: 'cand-09',
    brandQuery: 'Northstar Labs',
    displayName: 'Community Q&A Helper',
    handle: 'u/brand_answers',
    platform: 'reddit',
    riskScore: 61,
    riskLevel: 'Medium',
    status: 'New',
    signals: [
      'Active in brand subreddit offering technical guidance',
      'Occasional external diagnostic links',
    ],
    scoreBreakdown: {
      nameSimilarity: 24,
      brandTerms: 12,
      impersonationSignals: 12,
      identityOwnership: 13,
    },
    metadata: {
      bio: 'Enthusiast answering Northstar developer queries on r/programming and r/webdev.',
      verified: false,
      accountAgeDays: 140,
    },
  },
  {
    id: 'cand-10',
    brandQuery: 'Northstar Labs',
    displayName: 'Northstar Discount Hub',
    handle: '@northstar_deals',
    platform: 'facebook',
    riskScore: 57,
    riskLevel: 'Medium',
    status: 'New',
    signals: [
      'Third-party deal aggregator using brand logo without authorization',
    ],
    scoreBreakdown: {
      nameSimilarity: 26,
      brandTerms: 11,
      impersonationSignals: 10,
      identityOwnership: 10,
    },
    metadata: {
      bio: 'Daily deals and promo codes for tech innovators.',
      verified: false,
      accountAgeDays: 210,
    },
  },
  {
    id: 'cand-11',
    brandQuery: 'Northstar Labs',
    displayName: 'Northstar Community Fans',
    handle: '@northstar_fans',
    platform: 'twitter',
    riskScore: 48,
    riskLevel: 'Medium',
    status: 'Under review',
    signals: [
      'Fan club handle with possible endorsement confusion',
    ],
    scoreBreakdown: {
      nameSimilarity: 22,
      brandTerms: 10,
      impersonationSignals: 8,
      identityOwnership: 8,
    },
    metadata: {
      bio: 'Unofficial fan club celebrating Northstar Labs updates and keynote releases.',
      verified: false,
      accountAgeDays: 320,
    },
  },
  {
    id: 'cand-12',
    brandQuery: 'Northstar Labs',
    displayName: 'Northstar Fanpage',
    handle: '@brand_fanpage',
    platform: 'twitter',
    riskScore: 43,
    riskLevel: 'Low',
    status: 'New',
    signals: [
      'Explicitly declares unofficial status in profile header',
    ],
    scoreBreakdown: {
      nameSimilarity: 20,
      brandTerms: 9,
      impersonationSignals: 7,
      identityOwnership: 7,
    },
    metadata: {
      bio: 'Unofficial fan page. Not affiliated with the company.',
      verified: false,
      accountAgeDays: 410,
    },
  },
  {
    id: 'cand-13',
    brandQuery: 'Northstar Labs',
    displayName: 'Northstar Global Community',
    handle: '@northstarcommunity',
    platform: 'facebook',
    riskScore: 29,
    riskLevel: 'Low',
    status: 'Under review',
    signals: [
      'Open discussion group with historical community moderation',
    ],
    scoreBreakdown: {
      nameSimilarity: 14,
      brandTerms: 6,
      impersonationSignals: 5,
      identityOwnership: 4,
    },
    metadata: {
      bio: 'User-run community forum for sharing tutorials, workflows, and open source templates.',
      verified: false,
      accountAgeDays: 520,
    },
  },
  {
    id: 'cand-14',
    brandQuery: 'Northstar Labs',
    displayName: 'NS Labs Independent News',
    handle: '@nslabs_news',
    platform: 'x',
    riskScore: 21,
    riskLevel: 'Low',
    status: 'New',
    signals: [
      'Independent press/reporting feed with clear attribution',
    ],
    scoreBreakdown: {
      nameSimilarity: 10,
      brandTerms: 5,
      impersonationSignals: 3,
      identityOwnership: 3,
    },
    metadata: {
      bio: 'Independent coverage of venture capital, developer tools, and Northstar ecosystem developments.',
      verified: false,
      accountAgeDays: 730,
    },
  },
];

export const INITIAL_ACTIVITY_LOGS: ActivityLogEvent[] = [
  {
    id: 'act-01',
    timestamp: '03:05 PM',
    actor: {
      name: 'Alex Morgan',
      role: 'Demo analyst',
      avatarInitials: 'AM',
    },
    actionType: 'REPORT_EXPORTED',
    details: 'Demo risk summary exported (JSON format, 14 candidates included).',
  },
  {
    id: 'act-02',
    timestamp: '03:03 PM',
    actor: {
      name: 'Alex Morgan',
      role: 'Demo analyst',
      avatarInitials: 'AM',
    },
    actionType: 'RESOLVED',
    targetHandle: '@brand_helpdesk',
    details: 'Finding updated: @brand_helpdesk marked Resolved after confirming legacy archival.',
  },
  {
    id: 'act-03',
    timestamp: '02:58 PM',
    actor: {
      name: 'Alex Morgan',
      role: 'Demo analyst',
      avatarInitials: 'AM',
    },
    actionType: 'STATUS_UPDATED',
    targetHandle: '@northstar_fans',
    details: 'Finding updated: @northstar_fans placed Under review for bio disclaimer check.',
  },
  {
    id: 'act-04',
    timestamp: '02:50 PM',
    actor: {
      name: 'Alex Morgan',
      role: 'Demo analyst',
      avatarInitials: 'AM',
    },
    actionType: 'SCAN_STARTED',
    details: 'Scan completed for brand "Northstar Labs" across 6 networks. 14 potential matches cataloged.',
  },
  {
    id: 'act-05',
    timestamp: '02:45 PM',
    actor: {
      name: 'Alex Morgan',
      role: 'Demo analyst',
      avatarInitials: 'AM',
    },
    actionType: 'SESSION_AUTH',
    details: 'Analyst session initialized in local sandbox mode.',
  },
];

/**
 * Dynamic Candidate Synthesis Engine
 * When an analyst scans a custom brand (e.g. "Stripe", "Revolut", "Nike"),
 * this generates authentic synthetic impersonation variants with live algorithmic scoring.
 */
export function generateCandidatesForBrand(
  brandName: string,
  selectedPlatforms: Platform[]
): CandidateFinding[] {
  const normalized = brandName.trim().replace(/[^a-zA-Z0-9]/g, '').toLowerCase() || 'brand';
  const prefix = brandName.trim();
  const platforms = selectedPlatforms.length > 0 ? selectedPlatforms : ['instagram', 'x', 'telegram', 'reddit'];

  const templates = [
    {
      handleSuffix: '_help',
      nameSuffix: 'Official Support Desk',
      bio: `Official 24/7 Support Desk for ${prefix}. DM our verified specialists for assistance with locked accounts, payments, and refunds.`,
      verified: false,
      ageDays: 12,
    },
    {
      handleSuffix: '_rewards',
      nameSuffix: 'Exclusive Rewards & Airdrop',
      bio: `Official promotion portal for ${prefix} users! Connect your wallet or claim your \$250 loyalty bonus now. Limited slots!`,
      verified: false,
      ageDays: 5,
    },
    {
      handleSuffix: '_secure_bot',
      nameSuffix: 'Security & 2FA Auth Bot',
      bio: `Automated security verification for ${prefix} accounts. Send /verify to authenticate your device.`,
      verified: false,
      ageDays: 9,
    },
    {
      handleSuffix: '_support',
      nameSuffix: 'Customer Care Desk',
      bio: `Customer care and disputes resolution for ${prefix}. Fast resolution within 30 minutes.`,
      verified: false,
      ageDays: 34,
    },
    {
      handleSuffix: 'careers',
      nameSuffix: 'Recruitment & Jobs',
      bio: `Careers and talent acquisition at ${prefix}. Direct inquiries to hr@${normalized}-talent-portal.com`,
      verified: false,
      ageDays: 68,
    },
    {
      handleSuffix: '_promos',
      nameSuffix: 'Discount Club',
      bio: `Verified coupon codes and discount perks for ${prefix} shoppers and subscribers.`,
      verified: false,
      ageDays: 140,
    },
    {
      handleSuffix: '_community',
      nameSuffix: 'Global Community Forum',
      bio: `Independent community discussions, tutorials, and questions for ${prefix} fans worldwide.`,
      verified: false,
      ageDays: 320,
    },
    {
      handleSuffix: '_news',
      nameSuffix: 'Ecosystem News & Updates',
      bio: `Independent market research and product release updates about ${prefix}.`,
      verified: false,
      ageDays: 520,
    },
  ];

  const results: CandidateFinding[] = [];

  templates.forEach((tmpl, idx) => {
    const platform = platforms[idx % platforms.length];
    const isReddit = platform === 'reddit';
    const handlePrefix = isReddit ? 'u/' : '@';
    const handle = `${handlePrefix}${normalized}${tmpl.handleSuffix}`;
    const displayName = `${prefix} ${tmpl.nameSuffix}`;

    const evaluation = evaluateCandidateRisk(
      brandName,
      handle,
      displayName,
      tmpl.bio,
      tmpl.verified,
      tmpl.ageDays
    );

    results.push({
      id: `gen-${idx + 1}-${Date.now().toString(36)}`,
      brandQuery: brandName,
      displayName,
      handle,
      platform,
      riskScore: evaluation.score,
      riskLevel: evaluation.level,
      status: 'New',
      signals: evaluation.signals,
      scoreBreakdown: evaluation.breakdown,
      metadata: {
        bio: tmpl.bio,
        verified: tmpl.verified,
        accountAgeDays: tmpl.ageDays,
      },
    });
  });

  return results.sort((a, b) => b.riskScore - a.riskScore);
}
