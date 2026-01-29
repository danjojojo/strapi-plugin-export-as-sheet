import { useAuth, useFetchClient } from '@strapi/strapi/admin';
import { useStateContext } from '../providers/StateProvider';
import type { getCollectionEntries, getCollectionEntriesResponse } from '../schema/homepageSchema';

export function homepageAPI() {
  const { fetchParamsUpdate, dialogUpdate } = useStateContext();
  const { get } = useFetchClient();
  const token = useAuth('homepageAPI', (state) => state.token);

  async function getExportableCollections() {
    try {
      const data = await get('/export-as-sheet/collections');
      return data.data;
    } catch (error) {
      dialogUpdate({ type: 'OPEN_DIALOG', payload: true });
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
      dialogUpdate({ type: 'OPEN_DIALOG', payload: true });
      console.error(error);
    }
  }

  async function exportEntries(payload: any) {
    try {
      fetchParamsUpdate({ type: 'SET_DISABLE_EXPORT', payload: true });
      const res = await fetch(`/export-as-sheet/export`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        dialogUpdate({ type: 'OPEN_DIALOG', payload: true });
        return;
      }

      const buffer = await res.arrayBuffer();
      const blob = new Blob([buffer], {
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
    } finally {
      fetchParamsUpdate({ type: 'SET_DISABLE_EXPORT', payload: false });
    }
  }

  return {
    getExportableCollections,
    getCollectionEntries,
    exportEntries,
  };
}
