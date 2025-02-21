export type Org = {
  id: number;
  manager_id: number;
  name: string;
  title: string;
  members: Org[];
};
