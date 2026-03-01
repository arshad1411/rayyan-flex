import axiosInstance from "./axiosInstance";

export const getLocalEntries = async (params = "") => {
  const response = await axiosInstance.get(`/local-lists?populate=*&${params}`);
  return response.data.data;
};

export const getLastLocalEntry = async () => {
  const response = await axiosInstance.get(
    `/local-lists?sort=createdAt:desc&pagination[limit]=1`,
  );
  return response.data.data;
};

export const getLocalEntryById = async (documentId) => {
  const response = await axiosInstance.get(
    `/local-lists/${documentId}?populate=*`,
  );
  return response.data.data;
};

export const createLocalEntry = async (payload) => {
  const response = await axiosInstance.post("/local-lists", {
    data: payload,
  });
  return response.data.data;
};

export const updateLocalEntry = async (documentId, payload) => {
  const response = await axiosInstance.put(`/local-lists/${documentId}`, {
    data: payload,
  });
  return response.data.data;
};

export const deleteLocalEntry = async (documentId) => {
  const response = await axiosInstance.delete(`/local-lists/${documentId}`);
  return response.data.data;
};
