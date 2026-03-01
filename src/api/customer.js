import axiosInstance from "./axiosInstance";

export const getCustomers = async () => {
  let allCustomers = [];
  let page = 1;
  let pageSize = 100;

  while (true) {
    const response = await axiosInstance.get(
      `/customers?pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
    );
    const data = response.data.data;
    allCustomers = allCustomers.concat(data);

    if (data.length < pageSize) break;
    page++;
  }

  return allCustomers;
};

export const getCustomerById = async (id) => {
  const response = await axiosInstance.get(`/customers/${id}?populate=*`);
  return response.data.data;
};

export const createCustomer = async (customerData) => {
  const response = await axiosInstance.post("/customers", {
    data: customerData,
  });
  return response.data.data;
};

export const updateCustomer = async (id, customerData) => {
  const response = await axiosInstance.put(`/customers/${id}`, {
    data: customerData,
  });
  return response.data.data;
};

export const deleteCustomer = async (id) => {
  const response = await axiosInstance.delete(`/customers/${id}`);
  return response.data.data;
};
