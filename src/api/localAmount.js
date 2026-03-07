import axiosInstance from "./axiosInstance";

export const getLocalAmounts = async (params = "") => {
  const response = await axiosInstance.get(`/local-amounts${params}`);
  return response.data;
};
