import { homepageAPI } from '../api/homepage';
import { useStateContext } from '../providers/StateProvider';
import type { getCollectionEntries } from '../schema/homepageSchema';

export function useHomepage() {
  const homepageApi = homepageAPI();
  const { fetchParams, fetchParamsUpdate, homepage, homepageUpdate } = useStateContext();

  const fetchExportableCollections = async () => {
    const data = await homepageApi.getExportableCollections();
    homepageUpdate({ type: 'SET_COLLECTIONS', payload: data || [] });
    return data;
  };

  const selectCollection = (value: string | number) => {
    homepageUpdate({ type: 'SET_SELECTED_COLLECTION', payload: value.toString() });
  };

  const fetchCollectionEntries = async () => {
    if (!homepage.selectedCollection) return;

    const params: getCollectionEntries = {
      uid: homepage.selectedCollection,
      startDate: fetchParams.startDate?.toISOString() || new Date().toISOString(),
      endDate: fetchParams.endDate?.toISOString() || null,
    };

    const data = await homepageApi.getCollectionEntries(params);
    homepageUpdate({ type: 'SET_ENTRIES', payload: data?.entries || [] });
    homepageUpdate({ type: 'SET_ATTRIBUTES', payload: data?.attributes || [] });
    fetchParamsUpdate({ type: 'SET_DISABLE_FETCH', payload: true });
  };

  const updateDate = {
    start: (date: Date | undefined) => {
      fetchParamsUpdate({ type: 'SET_START_DATE', payload: date });
    },
    end: (date: Date | undefined) => {
      fetchParamsUpdate({ type: 'SET_END_DATE', payload: date });
    },
    maxEnd: (date: Date | undefined) => {
      fetchParamsUpdate({ type: 'SET_MAX_END_DATE', payload: date });
    },
  };

  const exportAsSheet = async () => {
    const payload = {
      attributes: homepage.attributes,
      entries: homepage.entries,
    };
    await homepageApi.exportEntries(payload);
  };

  return {
    fetchExportableCollections,
    selectCollection,
    fetchCollectionEntries,
    updateDate,
    exportAsSheet,
  };
}
