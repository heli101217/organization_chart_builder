export interface Employee {
  id: number;
  manager_id: number | null;
  title: string;
  name: string;
}

export interface OrganizationNode extends Employee {
  members: OrganizationNode[];
}
