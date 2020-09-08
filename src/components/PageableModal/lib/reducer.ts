export interface PageableModalState {
  activePage: number;
  pageCount: number;
  direction: string;
}

export interface PageableModalAction {
  type: string;
  payload?: any;
}

export const pageableModalReducer = (state: PageableModalState, action: PageableModalAction) => {
  const { activePage, pageCount } = state;
  const { type, payload } = action;

  switch (type) {
    case 'INIT_PAGES':
      if (payload.pages.length > 5) {
        throw new Error('PageableModal allows only 5 pages.');
      }
      return { ...state, pageCount: payload.pages.length, activePage: payload.activePage };

    case 'NEXT_PAGE':
      return activePage + 1 >= pageCount
        ? { ...state, activePage: 0, direction: 'right' }
        : { ...state, activePage: state.activePage + 1, direction: 'right' };

    case 'PREVIOUS_PAGE':
      return activePage <= 0
        ? { ...state, activePage: state.pageCount - 1, direction: 'left' }
        : { ...state, activePage: state.activePage - 1, direction: 'left' };

    case 'GO_TO_PAGE':
      return {
        ...state,
        activePage: payload.page,
        direction: payload.page > activePage ? 'right' : 'left',
      };

    default:
      return state;
  }
};
