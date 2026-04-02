import axiosInstance from "./axiosInstance";

export const getGstList = async (params = "") => {
  const response = await axiosInstance.get(`/gst-lists?populate=*&${params}`);
  return response.data;
};

export const getLastGstList = async () => {
  const response = await axiosInstance.get(
    `/gst-lists?filters[bill_no][$notNull]=true&filters[bill_no][$ne]=&sort=createdAt:desc&pagination[limit]=1`,
  );

  return response.data.data;
};

export const getGstListById = async (documentId) => {
  const response = await axiosInstance.get(
    `/gst-lists/${documentId}?populate=*`,
  );
  return response.data.data;
};

export const createGstList = async (payload) => {
  const response = await axiosInstance.post("/gst-lists", {
    data: payload,
  });
  return response.data.data;
};

export const updateGstList = async (documentId, payload) => {
  const response = await axiosInstance.put(`/gst-lists/${documentId}`, {
    data: payload,
  });
  return response.data.data;
};

export const deleteGstList = async (documentId) => {
  const response = await axiosInstance.delete(`/gst-lists/${documentId}`);
  return response.data.data;
};
