export default interface User {
  id: string;
  username: string;
  avatarUrl: string;
  isActivated: string;
  email?: string;
  balance?: number;
  hideUsername?: boolean;
  hideTotalProfit?: boolean;
  hideTotalWager?: boolean;
}
