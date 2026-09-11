export const TEAM_MEMBERS = ["Member A", "Member B", "Member C"] as const;

export type TeamMember = (typeof TEAM_MEMBERS)[number];
