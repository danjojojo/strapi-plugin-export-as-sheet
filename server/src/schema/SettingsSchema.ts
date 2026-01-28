export type Payload = {
  id: string;
  uid: string;
  name: string;
  added: boolean;
};

export interface ExportableCollection {
  payload: Payload[];
}
