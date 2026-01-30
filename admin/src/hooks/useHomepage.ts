import { homepageAPI } from '../api/homepage';
import { useStateContext } from '../providers/StateProvider';
import type { getCollectionEntries, getAttrAndEntriesCount } from '../schema/homepageSchema';

export function useHomepage() {
  const homepageApi = homepageAPI();
  const { fetchParams, fetchParamsUpdate, homepage, homepageUpdate } = useStateContext();

  const baseParams = {
    uid: homepage.selectedCollection ?? '',
    startDate: fetchParams.startDate?.toISOString() || new Date().toISOString(),
    endDate: fetchParams.endDate!.toISOString(),
    limit: fetchParams.limit,
    offset: fetchParams.offset,
  };

  const fetchExportableCollections = async () => {
    const data = await homepageApi.getExportableCollections();
    homepageUpdate({ type: 'SET_COLLECTIONS', payload: data || [] });
    return data;
  };

  const selectCollection = (value: string | number) => {
    homepageUpdate({ type: 'SET_SELECTED_COLLECTION', payload: value.toString() });
  };

  const fetchInit = async () => {
    if (!homepage.selectedCollection) return;

    const attrAndCountParams: getAttrAndEntriesCount = {
      uid: homepage.selectedCollection,
      startDate: fetchParams.startDate?.toISOString() || new Date().toISOString(),
      endDate: fetchParams.endDate!.toISOString(),
    };

    const attrAndCountData = await homepageApi.getAttrAndEntriesCount(attrAndCountParams);
    homepageUpdate({ type: 'SET_ATTRIBUTES', payload: attrAndCountData?.attributes || [] });
    homepageUpdate({
      type: 'SET_MEDIA_ATTRIBUTES',
      payload: attrAndCountData?.mediaAttributes || [],
    });
    homepageUpdate({
      type: 'SET_ENTRIES_TOTAL_COUNT',
      payload: attrAndCountData?.entriesTotalCount || 0,
    });

    let entriesParams: getCollectionEntries;

    if (attrAndCountData) {
      entriesParams = {
        ...baseParams,
        attributes: attrAndCountData.attributes,
        mediaAttributes: attrAndCountData.mediaAttributes,
      };

      const entriesData = await homepageApi.getCollectionEntries(entriesParams);
      homepageUpdate({ type: 'SET_ENTRIES', payload: entriesData?.entries || [] });
      fetchParamsUpdate({ type: 'SET_OFFSET', payload: entriesData?.entries?.length || 0 });
      fetchParamsUpdate({ type: 'SET_DISABLE_FETCH', payload: true });
    }
  };

  const fetchCollectionEntries = async () => {
    if (!homepage.selectedCollection) return;

    const params: getCollectionEntries = {
      ...baseParams,
      attributes: homepage.attributes,
      mediaAttributes: homepage.mediaAttributes,
    };

    const data = await homepageApi.getCollectionEntries(params);
    homepageUpdate({ type: 'LOAD_MORE_ENTRIES', payload: data?.entries || [] });
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
    fetchInit,
  };
}
