import { Tree, TreeNode } from "react-organizational-chart";
import { Card } from "./Card";
import { EmployeeNode } from "@/types/org.type";

const mockOrg: EmployeeNode = {
  name: "Employee1",
  title: "CEO",
  members: [
    {
      name: "Employee2",
      title: "CTO",
      members: [
        {
          name: "Employee3",
          title: "Software Developer",
          members: [
            {
              name: "Employee3",
              title: "Software Developer",
              members: [],
            },
            {
              name: "Employee4",
              title: "Software Developer",
              members: [
                {
                  name: "Employee3",
                  title: "Software Developer",
                  members: [],
                },
                {
                  name: "Employee4",
                  title: "Software Developer",
                  members: [
                    {
                      name: "Employee3",
                      title: "Software Developer",
                      members: [],
                    },
                    {
                      name: "Employee4",
                      title: "Software Developer",
                      members: [
                        {
                          name: "Employee3",
                          title: "Software Developer",
                          members: [],
                        },
                        {
                          name: "Employee4",
                          title: "Software Developer",
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
          title: "Software Developer",
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
          title: "HR Manager",
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

function OrgNode({
  employee,
  parent,
}: {
  employee: EmployeeNode;
  parent?: EmployeeNode;
}) {
  const TreeComponent = parent ? TreeNode : Tree;
  return (
    <TreeComponent
      label={
        <Card
          name={`${employee.name} ${
            employee.members.length > 0 ? `(${employee.members.length})` : ""
          }`}
          title={employee.title}
        />
      }
      lineWidth={parent ? undefined : "1px"}
      lineColor={parent ? undefined : "#bbc"}
      lineBorderRadius={parent ? undefined : "5px"}
    >
      {employee.members.map((member) => (
        <OrgNode employee={member} parent={employee} key={member.name} />
      ))}
    </TreeComponent>
  );
}

export const OrgChart = () => {
  return <OrgNode employee={mockOrg} />;
};
