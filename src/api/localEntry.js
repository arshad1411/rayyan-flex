import axiosInstance from "./axiosInstance";

export const getLocalEntries = async (params = "") => {
  const response = await axiosInstance.get(`/local-entries${params}`);
  return response.data.data;
};

export const getLocalEntryById = async (documentId) => {
  const response = await axiosInstance.get(
    `/local-entries/${documentId}?populate=*`,
  );
  return response.data.data;
};

export const createLocalEntry = async (payload) => {
  const response = await axiosInstance.post("/local-entries", {
    data: payload,
  });
  return response.data.data;
};

export const updateLocalEntry = async (documentId, payload) => {
  const response = await axiosInstance.put(`/local-entries/${documentId}`, {
    data: payload,
  });
  return response.data.data;
};

export const deleteLocalEntry = async (documentId) => {
  const response = await axiosInstance.delete(`/local-entries/${documentId}`);
  return response.data.data;
};
