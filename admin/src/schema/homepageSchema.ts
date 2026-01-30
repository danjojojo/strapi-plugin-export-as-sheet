export type getCollectionEntries = {
  uid: string;
  startDate: string;
  endDate: string | null;
  limit: number;
  offset: number;
  attributes: any[];
  mediaAttributes: string[];
};

export type getCollectionEntriesResponse = {
  entries: any[];
  attributes: any[];
  entriesTotalCount: number;
};

export type getAttrAndEntriesCount = {
  uid: string;
  startDate: string;
  endDate: string;
}

export type getAttrAndEntriesCountResponse = {
  attributes: any[];
  mediaAttributes: any[];
  entriesTotalCount: number;
}