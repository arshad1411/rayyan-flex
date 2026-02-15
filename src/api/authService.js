import axiosInstance from "./axiosInstance";

export const loginUser = async (identifier, password) => {
  const { data } = await axiosInstance.post("/auth/local", {
    identifier,
    password,
  });

  return data;
};
