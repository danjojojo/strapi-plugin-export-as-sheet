import { useFetchClient } from '@strapi/strapi/admin';
import type { getCollectionEntries, getCollectionEntriesResponse } from '../schema/homepageSchema';

export function homepageAPI() {
  const { get, post } = useFetchClient();

  async function getExportableCollections() {
    try {
      const data = await get('/export-as-sheet/collections');
      return data.data;
    } catch (error) {
      console.error(error);
    }
  }

  async function getCollectionEntries(
    params: getCollectionEntries
  ): Promise<getCollectionEntriesResponse | undefined> {
    try {
      const urlParams = new URLSearchParams({
        start: params.startDate,
        end: params.endDate || 'none',
      });
      const data = await get(`/export-as-sheet/collections/${params.uid}?${urlParams.toString()}`);
      return data.data;
    } catch (error) {
      console.error(error);
    }
  }

  async function exportEntries(payload: any) {
    try {
      const data = await post(`/export-as-sheet/export`, { body: payload });
      const bufferArray = new Uint8Array(data.data.data);
      const blob = new Blob([bufferArray], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Exported Entries.xlsx';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  }

  return {
    getExportableCollections,
    getCollectionEntries,
    exportEntries,
  };
}
