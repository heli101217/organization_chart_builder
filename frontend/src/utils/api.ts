import { queryOptions } from "@tanstack/react-query";

import { Employee } from "@/types/org.type";
import axiosInstance from "./axios.instance";

export const getEmployees = () => {
  return queryOptions({
    queryKey: ["employees"],
    queryFn: async () => {
      const response = await axiosInstance.get<Employee[]>("/employees");
      return response.data;
    },
  });
};

export const putManagerId = async ({
  id,
  managerId,
}: {
  id: number;
  managerId: number | null;
}) => {
  const response = await axiosInstance.put<Employee>(`/update_manager`, {
    id,
    manager_id: managerId || null,
  });
  return response.data;
};
