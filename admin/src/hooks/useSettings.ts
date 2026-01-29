import { settingsAPI } from '../api/settings';
import { useStateContext } from '../providers/StateProvider';

export function useSettings() {
  const settingsApi = settingsAPI();
  const { settings, settingsUpdate } = useStateContext();
  const { selectedExportableCollections, exportableCollections } = settings;

  const fetchStrapiCollections = async () => {
    const data = await settingsApi.getStrapiCollections();
    settingsUpdate({ type: 'SET_STRAPI_COLLECTIONS', payload: data || [] });
  };

  const fetchSettings = async () => {
    const data = await settingsApi.getSettings();
    settingsUpdate({ type: 'SET_EXPORTABLE_COLLECTIONS', payload: data || [] });
    settingsUpdate({ type: 'SET_IS_FETCHED', payload: true });
  };

  const updateSettings = async () => {
    await settingsApi.updateSettings(selectedExportableCollections);
    settingsUpdate({ type: 'RESET_SELECTED_EXPORTABLE_COLLECTIONS' });
    fetchSettings();
  };

  const isCollectionExportable = (uid: string) => {
    return exportableCollections.some((col: any) => col.uid === uid);
  };

  const addToSelectedCollections = (collection: any) => {
    settingsUpdate({ type: 'SET_SELECTED_EXPORTABLE_COLLECTIONS', payload: collection });
  };

  return {
    fetchStrapiCollections,
    fetchSettings,
    updateSettings,
    isCollectionExportable,
    addToSelectedCollections,
  };
}

export type UseSettingsReturnType = ReturnType<typeof useSettings>;