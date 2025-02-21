import { Org } from "@/types/org.type";

export const buildHierarchy = (data: any[]): Org[] => {
  const map = new Map<number, Org>();

  data.forEach((item) => {
    map.set(item.id, { ...item, members: [] });
  });

  const roots: Org[] = [];

  data.forEach((item) => {
    if (item.manager_id === null) {
      const root = map.get(item.id);
      if (root) {
        roots.push(root);
      }
    } else {
      const manager = map.get(item.manager_id);
      if (manager) {
        manager.members.push(map.get(item.id) as Org);
      }
    }
  });

  return roots;
};

export const getChildIds = (org: Org[], id: number): number[] => {
  const result: number[] = [];
  const findChildren = (nodes: Org[], parentId: number) => {
    for (const node of nodes) {
      if (node.manager_id === parentId) {
        result.push(node.id);
        findChildren(node.members, node.id);
      } else {
        findChildren(node.members, parentId);
      }
    }
  };

  findChildren(org, id);
  return result;
};
