import { Org } from "@/types/org.type";
import { buildHierarchy } from "@/utils/org";
import { Node } from "./Node";
import { useQuery } from "@tanstack/react-query";
import { getEmployees } from "@/utils/api";
import { Loading } from "./Loading";

export const OrgChart = () => {
  const { data, refetch, isLoading, isFetching } = useQuery(getEmployees());
  console.log(isFetching);
  if (isFetching || isLoading) return <Loading />;
  const org: Org[] = (data && buildHierarchy(data)) || [];
  return (
    <>
      <Node o={org} refetch={refetch} />
    </>
  );
};
