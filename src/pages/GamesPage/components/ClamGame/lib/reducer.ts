export interface ClamGameState {
  he: number;
}

export const getInitialState = (he: number): ClamGameState => ({
  he,
});

export interface ClamGameAction {
  type: 'RESET';
  payload?: any;
}

export const clamGameReducer = (state: ClamGameState, action: ClamGameAction): ClamGameState => {
  const { type, payload } = action;

  switch (type) {
    case 'RESET':
      return getInitialState(state.he);

    default:
      return state;
  }
};
