import axiosInstance from "./axiosInstance";

export const getLocalParty = async (params = "") => {
  const response = await axiosInstance.get(
    `/local-parties?populate=*&${params}`,
  );
  return response.data;
};

export const getLastLocalParty = async () => {
  const response = await axiosInstance.get(
    `/local-parties?sort=createdAt:desc&pagination[limit]=1`,
  );
  return response.data.data;
};

export const getLocalPartyById = async (documentId) => {
  const response = await axiosInstance.get(
    `/local-parties/${documentId}?populate=*`,
  );
  return response.data.data;
};

export const createLocalParty = async (payload) => {
  const response = await axiosInstance.post("/local-parties", {
    data: payload,
  });
  return response.data.data;
};

export const updateLocalParty = async (documentId, payload) => {
  const response = await axiosInstance.put(`/local-parties/${documentId}`, {
    data: payload,
  });
  return response.data.data;
};

export const deleteLocalParty = async (documentId) => {
  const response = await axiosInstance.delete(`/local-parties/${documentId}`);
  return response.data.data;
};
