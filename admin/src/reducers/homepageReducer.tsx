type Collection = {
  uid: string;
  name: string;
};

type Attribute = {
  field: string;
  label: string;
  type: string;
};

type Homepage = {
  collections: Collection[];
  selectedCollection: string | null;
  attributes: Attribute[];
  mediaAttributes: string[];
  entries: any[];
  entriesTotalCount: number;
};

type HomepageActions =
  | { type: 'SET_COLLECTIONS'; payload: Collection[] }
  | { type: 'SET_SELECTED_COLLECTION'; payload: string | null }
  | { type: 'SET_ATTRIBUTES'; payload: Attribute[] }
  | { type: 'SET_MEDIA_ATTRIBUTES'; payload: string[] }
  | { type: 'SET_ENTRIES'; payload: any[] }
  | { type: 'LOAD_MORE_ENTRIES'; payload: any[] }
  | { type: 'SET_ENTRIES_TOTAL_COUNT'; payload: number };

export function homepageReducer(state: Homepage, action: HomepageActions) {
  switch (action.type) {
    case 'SET_COLLECTIONS':
      return {
        ...state,
        collections: action.payload,
      };
    case 'SET_SELECTED_COLLECTION':
      return {
        ...state,
        selectedCollection: action.payload,
      };
    case 'SET_ATTRIBUTES':
      return {
        ...state,
        attributes: action.payload,
      };
    case 'SET_MEDIA_ATTRIBUTES':
      return {
        ...state,
        mediaAttributes: action.payload,
      };
    case 'SET_ENTRIES':
      return {
        ...state,
        entries: action.payload,
      };
    case 'LOAD_MORE_ENTRIES':
      return {
        ...state,
        entries: [...state.entries, ...action.payload],
      };
    case 'SET_ENTRIES_TOTAL_COUNT':
      return {
        ...state,
        entriesTotalCount: action.payload,
      };
    default:
      return state;
  }
}
