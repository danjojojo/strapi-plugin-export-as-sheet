export type getCollectionEntries = {
  uid: string;
  startDate: string;
  endDate: string | null;
};

export type getCollectionEntriesResponse = {
  entries: any[];
  attributes: any[];
};