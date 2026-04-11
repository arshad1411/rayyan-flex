/* eslint-disable no-unused-vars */
export const transformBillingData = (data) => {
  if (!data) return data;
  const { id, documentId, createdAt, updatedAt, pending, ...rest } = data;

  return {
    ...rest,

    customer: data?.customer?.documentId || data?.gst_customer?.id || null,

    size_data: data?.size_data?.map(({ id, ...rest }) => rest),

    gpay: data?.gpay?.map(({ id, ...rest }) => rest),

    cash: data?.cash?.map(({ id, ...rest }) => rest),

    particulars: data?.particulars?.map(({ id, ...rest }) => rest),
  };
};
