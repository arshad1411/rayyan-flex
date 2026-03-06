import axiosInstance from "./axiosInstance";

export const getLocalPaid = async (params = "") => {
  const response = await axiosInstance.get(`/local-paids?populate=*&${params}`);
  return response.data;
};

export const getLastLocalPaid = async () => {
  const response = await axiosInstance.get(
    `/local-paids?sort=createdAt:desc&pagination[limit]=1`,
  );
  return response.data.data;
};

export const getLocalPaidById = async (documentId) => {
  const response = await axiosInstance.get(
    `/local-paids/${documentId}?populate=*`,
  );
  return response.data.data;
};

export const createLocalPaid = async (payload) => {
  const response = await axiosInstance.post("/local-paids", {
    data: payload,
  });
  return response.data.data;
};

export const updateLocalPaid = async (documentId, payload) => {
  const response = await axiosInstance.put(`/local-paids/${documentId}`, {
    data: payload,
  });
  return response.data.data;
};

export const deleteLocalPaid = async (documentId) => {
  const response = await axiosInstance.delete(`/local-paids/${documentId}`);
  return response.data.data;
};
