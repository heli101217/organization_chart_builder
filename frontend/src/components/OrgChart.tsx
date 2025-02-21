import { useRef } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import { useDrag, useDrop } from "react-dnd";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

import { Card } from "./Card";
import { OrganizationNode } from "@/types/org.type";
import { buildHierarchy, getChildIds } from "@/utils/org";
import { DndTypeEnum } from "@/enums/dnd.enum";
import { Loading } from "./Loading";
import { getEmployees, putManagerId } from "@/utils/api";

interface OrgNodeProps {
  node: OrganizationNode;
  isExistParent?: boolean;
  refetch: () => void;
}

const OrgNode: React.FC<OrgNodeProps> = ({ node, isExistParent, refetch }) => {
  const ref = useRef<HTMLDivElement>(null);
  const TreeComponent = isExistParent ? TreeNode : Tree;

  const [{ opacity }, drag] = useDrag(
    () => ({
      item: { id: node.id, managerId: node.manager_id },
      type: DndTypeEnum.CARD,
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
      end: async (item, monitor) => {
        const dropResult = monitor.getDropResult<{ id: number }>();
        const childIds = getChildIds(node.members, item.id);
        if (!dropResult) {
          toast.warn("The card was dropped into the empty board!");
          return;
        }

        if (childIds.includes(dropResult.id)) {
          toast.error("The parent card can not be dropped into a child card!");
          return;
        }

        if (
          item.managerId === dropResult.id ||
          (item.managerId === null && dropResult.id === -1)
        ) {
          toast.warn("The card can not be dropped into the same parent card!");
          return;
        }

        if (item.id !== dropResult.id) {
          try {
            await putManagerId({
              id: item.id,
              managerId: dropResult.id === -1 ? null : dropResult.id,
            });
            refetch();
            toast.success("Manager updated successfully");
          } catch (error) {
            toast.error("Failed to update manager");
          }
        }
      },
      canDrag: () => node.id !== -1,
    }),
    [node]
  );

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: DndTypeEnum.CARD,
      drop: () => ({ id: node.id }),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [node]
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
          name={node.name}
          title={node.title}
          className={`${
            opacity === 0.5 ? "opacity-50" : ""
          } ${backgroundColor} ${isExistParent ? "" : "w-[100%]"}`}
        />
      }
      lineWidth={isExistParent ? undefined : "1px"}
      lineColor={isExistParent ? undefined : "#bbc"}
      lineBorderRadius={isExistParent ? undefined : "5px"}
    >
      {node.members.map((member) => (
        <OrgNode
          node={member}
          isExistParent={true}
          key={member.id}
          refetch={refetch}
        />
      ))}
    </TreeComponent>
  );
};

export const OrgChart = () => {
  const { data, refetch, isLoading, isFetching } = useQuery(getEmployees());
  if (isFetching || isLoading) return <Loading />;

  const node = buildHierarchy(data ? data : []);

  return <OrgNode node={node} refetch={refetch} />;
};
