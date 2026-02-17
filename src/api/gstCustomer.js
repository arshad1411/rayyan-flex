import axiosInstance from "./axiosInstance";

export const getGstCustomers = async () => {
  const response = await axiosInstance.get("/gst-customers?populate=*");
  return response.data.data;
};

export const getGstCustomerById = async (id) => {
  const response = await axiosInstance.get(`/gst-customers/${id}?populate=*`);
  return response.data.data;
};

export const createGstCustomer = async (customerData) => {
  const response = await axiosInstance.post("/gst-customers", {
    data: customerData,
  });
  return response.data.data;
};

export const updateGstCustomer = async (id, customerData) => {
  const response = await axiosInstance.put(`/gst-customers/${id}`, {
    data: customerData,
  });
  return response.data.data;
};

export const deleteGstCustomer = async (id) => {
  const response = await axiosInstance.delete(`/gst-customers/${id}`);
  return response.data.data;
};
