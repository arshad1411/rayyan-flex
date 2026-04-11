import axiosInstance from "./axiosInstance";

export const getGstSalesSummary = async (params = "") => {
  const response = await axiosInstance.get(`/gst-sales${params}`);
  return response.data;
};
