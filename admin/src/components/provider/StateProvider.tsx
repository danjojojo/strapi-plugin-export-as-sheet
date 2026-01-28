import { useContext, createContext } from 'react';
import { useReducer } from 'react';
import { convertDateToLocal } from '../../utils/utils';
import { settingsReducer } from '../../utils/settingsReducer';
import { homepageReducer } from '../../utils/homepageReducer';
import { fetchParamsReducer } from '../../utils/fetchParamsReducer';

interface StateProviderProps {
  children: React.ReactNode;
}

const useStates = () => {
  const today = new Date().setHours(0, 0, 0, 0);
  const endToday = new Date().setHours(23, 59, 59, 999);
  const [homepage, homepageUpdate] = useReducer(homepageReducer, {
    collections: [],
    selectedCollection: null,
    attributes: [],
    entries: [],
  });
  const [fetchParams, fetchParamsUpdate] = useReducer(fetchParamsReducer, {
    disableFetch: true,
    startDate: convertDateToLocal(new Date(today)),
    endDate: convertDateToLocal(new Date(endToday)),
    maxEndDate: null,
  });
  const [settings, settingsUpdate] = useReducer(settingsReducer, {
    strapiCollections: [],
    exportableCollections: [],
    selectedExportableCollections: [],
    isFetched: false,
  });

  return {
    homepage,
    homepageUpdate,
    fetchParams,
    fetchParamsUpdate,
    settings,
    settingsUpdate,
  };
};

const StateContext = createContext<ReturnType<typeof useStates> | null>(null);

export const useStateContext = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useStateContext must be used within a StateProvider');
  }
  return context;
};

export const StateProvider = ({ children }: StateProviderProps) => {
  const states = useStates();

  return <StateContext.Provider value={states}>{children}</StateContext.Provider>;
};
