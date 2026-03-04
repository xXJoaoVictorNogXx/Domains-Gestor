import {axiosInstance} from "@/src/api/axios";

export const accountService = async (domainId: string) => {
  const response = await axiosInstance.get(`/accounts?domainId=${domainId}`);
  return response.data;
};