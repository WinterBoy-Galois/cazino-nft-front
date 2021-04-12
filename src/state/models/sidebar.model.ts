export interface SidebarState {
  isChatBot: boolean;
  isSound: boolean;
  isOpen: boolean;
  selectedTab: SidebarTab;
  selectedLeaderboardAggregation: LeaderboardAggregation;
}

export type SidebarTab = 'LATEST_BETS' | 'MY_BETS' | 'LEADERBOARDS';

export type LeaderboardAggregation = 'DAILY' | 'WEEKLY' | 'MONTHLY';
