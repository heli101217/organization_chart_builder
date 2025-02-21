export type Org = {
  id: number;
  manager_id: number;
  name: string;
  title: string;
  members: Org[];
};

export type Employee = {
  id: number;
  name: string;
  title: string;
  manager_id: number;
};
