import { Org } from "@/types/org.type";
import { buildHierarchy } from "@/utils/org";
import { Node } from "./Node";

export const OrgChart = () => {
  const data = [
    { id: 1, name: "bb", title: "bbb", manager_id: null },
    { id: 2, name: "cc", title: "ccc", manager_id: 1 },
    { id: 3, name: "dd", title: "ddd", manager_id: 1 },
    { id: 4, name: "ee", title: "eee", manager_id: 1 },
    { id: 5, name: "ff", title: "fff", manager_id: 2 },
    { id: 6, name: "gg", title: "ggg", manager_id: 2 },
    { id: 7, name: "hh", title: "hhh", manager_id: 3 },
    { id: 8, name: "ii", title: "iii", manager_id: 3 },
    { id: 9, name: "jj", title: "jjj", manager_id: 4 },
  ];

  const mock_org: Org[] = buildHierarchy(data);

  return (
    <>
      <Node o={mock_org} />
    </>
  );
};
