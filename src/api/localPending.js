import axiosInstance from "./axiosInstance";

export const getLocalPending = async (params = "") => {
  const response = await axiosInstance.get(
    `/local-pendings?populate=*&${params}`,
  );
  return response.data;
};

export const getLastLocalPending = async () => {
  const response = await axiosInstance.get(
    `/local-pendings?sort=createdAt:desc&pagination[limit]=1`,
  );
  return response.data.data;
};

export const getLocalPendingById = async (documentId) => {
  const response = await axiosInstance.get(
    `/local-pendings/${documentId}?populate=*`,
  );
  return response.data.data;
};

export const createLocalPending = async (payload) => {
  const response = await axiosInstance.post("/local-pendings", {
    data: payload,
  });
  return response.data.data;
};

export const updateLocalPending = async (documentId, payload) => {
  const response = await axiosInstance.put(`/local-pendings/${documentId}`, {
    data: payload,
  });
  return response.data.data;
};

export const deleteLocalPending = async (documentId) => {
  const response = await axiosInstance.delete(`/local-pendings/${documentId}`);
  return response.data.data;
};
