type FetchParams = {
  disableFetch: boolean;
  disableExport: boolean;
  startDate: Date | undefined;
  endDate: Date | undefined;
  maxEndDate: Date | undefined;
};

type FetchParamsAction =
  | { type: 'SET_DISABLE_FETCH'; payload: boolean }
  | { type: 'SET_DISABLE_EXPORT'; payload: boolean }
  | { type: 'SET_START_DATE'; payload: Date | undefined }
  | { type: 'SET_END_DATE'; payload: Date | undefined }
  | { type: 'SET_MAX_END_DATE'; payload: Date | undefined };

export function fetchParamsReducer(state: FetchParams, action: FetchParamsAction) {
  switch (action.type) {
    case 'SET_DISABLE_FETCH':
      return { ...state, disableFetch: action.payload };
    case 'SET_DISABLE_EXPORT':
      return { ...state, disableExport: action.payload };
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
