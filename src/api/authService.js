import axiosInstance from "./axiosInstance";

export const loginUser = async (identifier, password) => {
  const { data } = await axiosInstance.post("/auth/local", {
    identifier,
    password,
  });

  const { jwt } = data;

  const userResponse = await axiosInstance.get("/users/me?populate=role", {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return {
    ...data,
    role: userResponse.data.role?.type,
  };
};
