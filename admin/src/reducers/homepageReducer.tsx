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
  entries: any[];
};

type HomepageActions =
  | { type: 'SET_COLLECTIONS'; payload: Collection[] }
  | { type: 'SET_SELECTED_COLLECTION'; payload: string | null }
  | { type: 'SET_ATTRIBUTES'; payload: Attribute[] }
  | { type: 'SET_ENTRIES'; payload: any[] };

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
    case 'SET_ENTRIES':
      return {
        ...state,
        entries: action.payload,
      };
    default:
      return state;
  }
}
