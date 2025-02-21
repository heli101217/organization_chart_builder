import { Tree, TreeNode } from "react-organizational-chart";
import _ from "lodash";
import { Card } from "./Card";
import { Org } from "@/types/org.type";

const mock_org: Org = {
  name: "Employee1",
  title: "CEO",
  members: [
    {
      name: "Employee2",
      title: "CTO",
      members: [
        {
          name: "Employee3",
          title: "software developer",
          members: [
            {
              name: "Employee3",
              title: "software developer",
              members: [],
            },
            {
              name: "Employee4",
              title: "software developer",
              members: [
                {
                  name: "Employee3",
                  title: "software developer",
                  members: [],
                },
                {
                  name: "Employee4",
                  title: "software developer",
                  members: [
                    {
                      name: "Employee3",
                      title: "software developer",
                      members: [],
                    },
                    {
                      name: "Employee4",
                      title: "software developer",
                      members: [
                        {
                          name: "Employee3",
                          title: "software developer",
                          members: [],
                        },
                        {
                          name: "Employee4",
                          title: "software developer",
                          members: [],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "Employee4",
          title: "software developer",
          members: [],
        },
      ],
    },
    {
      name: "Employee5",
      title: "COO",
      members: [
        {
          name: "Employee6",
          title: "HR manager",
          members: [
            {
              name: "Employee7",
              title: "Recruiter",
              members: [],
            },
          ],
        },
      ],
    },
  ],
};

function Node({ o, parent }: { o: Org; parent?: Org }) {
  const T = parent
    ? TreeNode
    : (props: any) => (
        <Tree
          {...props}
          lineWidth={"1px"}
          lineColor={"#bbc"}
          lineBorderRadius={"5px"}
        >
          {props.children}
        </Tree>
      );
  return (
    <T
      label={
        <Card
          name={`${o.name} ${
            o.members.length > 0 ? `(${o.members.length})` : ""
          }`}
          title={o.title}
        />
      }
    >
      {_.map(o.members, (c) => (
        <Node o={c} parent={o} key={c.name} />
      ))}
    </T>
  );
}

export const OrgChart = () => {
  return <Node o={mock_org} />;
};
