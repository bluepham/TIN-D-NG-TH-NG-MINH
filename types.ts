
export enum Screen {
  Welcome,
  Menu,
  BankLoan,
  TradeCredit,
  ConsumerLoan,
  GovernmentBond,
  Game,
  FinalScenario,
}

export interface GameCard {
  id: number;
  matchId: number;
  type: 'term' | 'example';
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
}
