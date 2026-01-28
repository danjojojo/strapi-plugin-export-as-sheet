type FetchEntriesParams = {
  disableFetch: boolean;
  startDate: Date | null;
  endDate: Date | null;
  maxEndDate: Date | null;
};

type FetchEntriesParamsAction =
  | { type: 'SET_DISABLE_FETCH'; payload: boolean }
  | { type: 'SET_START_DATE'; payload: Date | null }
  | { type: 'SET_END_DATE'; payload: Date | null }
  | { type: 'SET_MAX_END_DATE'; payload: Date | null };

export function fetchEntriesReducer(state: FetchEntriesParams, action: FetchEntriesParamsAction) {
  switch (action.type) {
    case 'SET_DISABLE_FETCH':
      return { ...state, disableFetch: action.payload };
    case 'SET_START_DATE':
      return { ...state, startDate: action.payload };
    case 'SET_END_DATE':
      return { ...state, endDate: action.payload };
    case 'SET_MAX_END_DATE':
      return { ...state, maxEndDate: action.payload };
    default:
      return state;
  }
}
