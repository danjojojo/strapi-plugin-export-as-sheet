import { useAuth, useFetchClient } from '@strapi/strapi/admin';
import { useStateContext } from '../providers/StateProvider';

export function settingsAPI() {
  const { get, post } = useFetchClient();
  const { dialogUpdate } = useStateContext();

  async function getStrapiCollections() {
    try {
      const data = await get('/export-as-sheet/settings/strapi');
      return data.data;
    } catch (error) {
      dialogUpdate({ type: 'OPEN_DIALOG', payload: true });
      console.error(error);
    }
  }

  async function getSettings() {
    try {
      const data = await get('/export-as-sheet/settings');
      return data.data;
    } catch (error) {
      dialogUpdate({ type: 'OPEN_DIALOG', payload: true });
      console.error(error);
    }
  }

  async function updateSettings(payload: any) {
    try {
      await post('/export-as-sheet/settings/update', { payload });
    } catch (error) {
      dialogUpdate({ type: 'OPEN_DIALOG', payload: true });
      console.error(error);
    }
  }

  return {
    getStrapiCollections,
    getSettings,
    updateSettings,
  };
}
