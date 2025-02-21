import { Employee, EmployeeNode } from "@/types/org.type";

export const buildHierarchy = (employees: Employee[]): EmployeeNode => {
  const employeeMap: { [key: number]: EmployeeNode } = {};
  const roots: EmployeeNode = {
    id: 0,
    name: "Company Organization",
    title: "",
    manager_id: null,
    members: [],
  };

  employees.forEach((employee) => {
    employeeMap[employee.id] = { ...employee, members: [] };
  });

  employees.forEach((employee) => {
    const node = employeeMap[employee.id];
    if (employee.manager_id === null) {
      roots.members.push(node);
    } else {
      const managerNode = employeeMap[employee.manager_id];
      if (managerNode) {
        managerNode.members.push(node);
      }
    }
  });

  return roots;
};

export const getChildIds = (
  employeeNode: EmployeeNode[],
  id: number
): number[] => {
  const result: number[] = [];

  const findChildren = (nodes: EmployeeNode[], parentId: number) => {
    for (const node of nodes) {
      if (node.manager_id === parentId) {
        result.push(node.id);
        findChildren(node.members, node.id);
      }
    }
  };

  findChildren(employeeNode, id);
  return result;
};
