import { useRef } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import { useDrag, useDrop } from "react-dnd";
import { toast } from "react-toastify";

import { Card } from "./Card";
import { Employee, EmployeeNode } from "@/types/org.type";
import { buildHierarchy, getChildIds } from "@/utils/org";
import { DndTypeEnum } from "@/enums/dnd.enum";

interface OrgNodeProps {
  employee: EmployeeNode;
  parent?: EmployeeNode;
}

const OrgNode: React.FC<OrgNodeProps> = ({ employee, parent }) => {
  const ref = useRef<HTMLDivElement>(null);
  const TreeComponent = parent ? TreeNode : Tree;

  const [{ opacity }, drag] = useDrag(
    () => ({
      item: { id: employee.id, managerId: employee.manager_id },
      type: DndTypeEnum.CARD,
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult<{ id: number }>();
        const childIds = getChildIds(employee.members, item.id);
        if (!dropResult) {
          toast.warn("The card was dropped into the empty board!");
          return;
        }

        if (childIds.includes(dropResult.id)) {
          toast.error("The parent card can not be dropped into a child card!");
          return;
        }

        if (item.managerId === dropResult.id) {
          toast.warn("The card can not be dropped into the same parent card!");
          return;
        }

        if (item.id !== dropResult.id) {
          if (dropResult.id === -1)
            alert(`You moved ${item.id} to ${dropResult.id}!`);
          else alert(`You moved ${item.id} to ${dropResult.id}!`);
        }
      },
      canDrag: () => employee.id !== -1,
    }),
    [employee]
  );

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: DndTypeEnum.CARD,
      drop: () => ({ id: employee.id }),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
      canDrop: () => true,
    }),
    [employee]
  );

  drag(drop(ref));

  const isActive = canDrop && isOver;
  const backgroundColor = isActive
    ? "bg-gray-400"
    : canDrop
    ? "bg-gray-300"
    : "bg-white";

  return (
    <TreeComponent
      label={
        <Card
          ref={ref}
          name={employee.name}
          title={employee.title}
          className={`${
            opacity === 0.5 ? "opacity-50" : ""
          } ${backgroundColor} ${parent ? "" : "w-[100%]"}`}
        />
      }
      lineWidth={parent ? undefined : "1px"}
      lineColor={parent ? undefined : "#bbc"}
      lineBorderRadius={parent ? undefined : "5px"}
    >
      {employee.members.map((member) => (
        <OrgNode employee={member} parent={employee} key={member.id} />
      ))}
    </TreeComponent>
  );
};

export const OrgChart = () => {
  const employees: Employee[] = [
    { id: 1, name: "bb", title: "bbb", manager_id: null },
    { id: 10, name: "bb", title: "bbb", manager_id: null },
    { id: 2, name: "cc", title: "ccc", manager_id: 1 },
    { id: 3, name: "dd", title: "ddd", manager_id: 1 },
    { id: 4, name: "ee", title: "eee", manager_id: 1 },
    { id: 5, name: "ff", title: "fff", manager_id: 2 },
    { id: 6, name: "gg", title: "ggg", manager_id: 2 },
    { id: 7, name: "hh", title: "hhh", manager_id: 3 },
    { id: 8, name: "ii", title: "iii", manager_id: 3 },
    { id: 9, name: "jj", title: "jjj", manager_id: 10 },
  ];

  const mockOrg: EmployeeNode = buildHierarchy(employees);

  return <OrgNode employee={mockOrg} />;
};
