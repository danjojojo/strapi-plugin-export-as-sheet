type Collection = {
  documentId?: string;
  uid: string;
  name: string;
  id?: string;
  added?: string;
};

type Settings = {
  strapiCollections: Collection[];
  exportableCollections: Collection[];
  selectedExportableCollections: Collection[];
  isFetched: boolean;
};

type SettingsAction =
  | { type: 'SET_STRAPI_COLLECTIONS'; payload: Collection[] }
  | { type: 'SET_EXPORTABLE_COLLECTIONS'; payload: Collection[] }
  | { type: 'SET_SELECTED_EXPORTABLE_COLLECTIONS'; payload: Collection }
  | { type: 'RESET_SELECTED_EXPORTABLE_COLLECTIONS' }
  | { type: 'SET_IS_FETCHED'; payload: boolean };

export function settingsReducer(state: Settings, action: SettingsAction): Settings {
  switch (action.type) {
    case 'SET_STRAPI_COLLECTIONS':
      return {
        ...state,
        strapiCollections: action.payload,
      };
    case 'SET_EXPORTABLE_COLLECTIONS':
      return {
        ...state,
        exportableCollections: action.payload,
      };
    case 'SET_SELECTED_EXPORTABLE_COLLECTIONS':
      const { selectedExportableCollections, exportableCollections } = state;
      const newCollection = action.payload;
      const isAdded = newCollection.added;
      const isExportable = exportableCollections.some((col) => col.uid === newCollection.uid);
      const addToSelectedCollections = [...selectedExportableCollections, newCollection];
      const removeFromSelectedCollections = selectedExportableCollections.filter(
        (col) => col.uid !== newCollection.uid
      );

      if (isExportable) {
        const exportableCollection = exportableCollections.filter(
          (col: any) => col.uid === newCollection.uid
        );
        const toDeleteCollection = {
          ...newCollection,
          id: exportableCollection[0]?.documentId,
        };
        const newSelectedCollections = isAdded
          ? removeFromSelectedCollections
          : [...selectedExportableCollections, toDeleteCollection];

        return {
          ...state,
          selectedExportableCollections: newSelectedCollections,
        };
      }

      return {
        ...state,
        selectedExportableCollections: isAdded
          ? addToSelectedCollections
          : removeFromSelectedCollections,
      };
    case 'RESET_SELECTED_EXPORTABLE_COLLECTIONS':
      return {
        ...state,
        selectedExportableCollections: [],
      };
    case 'SET_IS_FETCHED':
      return {
        ...state,
        isFetched: action.payload,
      };
    default:
      return state;
  }
}
