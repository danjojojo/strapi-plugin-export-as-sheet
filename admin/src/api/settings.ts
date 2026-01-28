import { useFetchClient } from '@strapi/strapi/admin';

export function settingsAPI() {
  const { get, post } = useFetchClient();

  async function getStrapiCollections() {
    try {
      const data = await get('/export-as-sheet/settings/strapi');
      return data.data;
    } catch (error) {
      console.error(error);
    }
  }

  async function getSettings() {
    try {
      const data = await get('/export-as-sheet/settings');
      return data.data;
    } catch (error) {
      console.error(error);
    }
  }

  async function updateSettings(payload: any) {
    try {
      await post('/export-as-sheet/settings/update', { payload });
    } catch (error) {
      console.error(error);
    }
  }

  return {
    getStrapiCollections,
    getSettings,
    updateSettings,
  };
}
