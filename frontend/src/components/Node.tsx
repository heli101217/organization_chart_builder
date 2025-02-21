import { Tree, TreeNode } from "react-organizational-chart";
import { Card } from "./Card";
import { Org } from "@/types/org.type";
import { useDrag, useDrop } from "react-dnd";
import { DndTypeEnum } from "@/enums/dnd.enum";
import { useRef, useMemo } from "react";
import { getChildIds } from "@/utils/org";
import { toast } from "react-toastify";

export const Node = ({ o, parent }: { o: Org[]; parent?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  let org = o[0];
  if (parent === undefined || parent === null) {
    org = {
      title: "",
      name: "Company Organization",
      id: -1,
      manager_id: -1,
      members: o,
    };
  }

  const TreeComponent = useMemo(() => {
    return parent
      ? TreeNode
      : (props: any) => (
          <Tree
            {...props}
            lineWidth="1px"
            lineColor="#bbc"
            lineBorderRadius="5px"
          >
            {props.children}
          </Tree>
        );
  }, [parent]);

  const [{ opacity, item }, drag] = useDrag(
    () => ({
      item: { id: org.id, managerId: org.manager_id },
      type: DndTypeEnum.CARD,
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
        item: monitor.getItem(),
      }),
      end: (item, monitor) => {
        const childIds = getChildIds(o, item.id);
        const dropResult = monitor.getDropResult<{ id: number }>();
        if (!dropResult) {
          toast.warn("The card was dropped into the empty board!");
          return;
        }
        if (childIds.includes(dropResult.id)) {
          toast.error("The parent card can not be dropped into a child card!");
          return;
        }

        if (item.id !== dropResult.id && parent !== dropResult.id) {
          alert(`You moved ${item.id} to ${dropResult.id}!`);
        }
      },

      canDrag: () => org.id !== -1,
    }),
    [o, parent]
  );

  const [{ dropable, isOver }, drop] = useDrop(
    () => ({
      drop: () => ({ id: org.id }),
      accept: DndTypeEnum.CARD,
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        dropable: monitor.canDrop(),
      }),
      canDrop: () => org.id !== -1 && !!item && item.managerId !== org.id,
    }),
    [o]
  );

  drag(drop(ref));

  const isActive = dropable && isOver;
  let backgroundColor = "bg-white";

  if (isActive) {
    backgroundColor = "bg-gray-400";
  } else if (dropable) {
    backgroundColor = "bg-gray-300";
  }

  return (
    <TreeComponent
      key={org.id}
      label={
        <Card
          ref={ref}
          name={`${org.name}`}
          title={org.title}
          className={`${
            opacity === 0.5 ? "opacity-50" : ""
          } ${backgroundColor} ${parent ? "" : "w-[100%]"}`}
        />
      }
    >
      {org.members.map((member) => (
        <Node key={member.id} o={[member]} parent={org.id} />
      ))}
    </TreeComponent>
  );
};
