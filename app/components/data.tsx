import axios from "axios";

export const LoginReq = async (username: string, password: string) => {
  try {
    const { data } = await axios.post(
      "http://localhost:5274/api/v1/auth/login",
      {
        userName: username,
        password: password,
        headers: {
          Accept: "text/plain",
          "Content-Type": "application/json",
        },
      }
    );
    const user = data;
    return user;
  } catch (error) {
    console.error("Error during login:", error);
    // throw new Error("Login failed");
  }
};
export const Registration = async (
  formPayload: FormData,
  authToken: string
) => {
  console.log("regis", formPayload);
  const response = await axios.post(
    `http://localhost:5274/api/v1/auth/registration`,
    formPayload,
    {
      headers: {
        Accept: "text/plain",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${authToken}`, // Include token here
      },
    }
  );
  const data = await response.data;
  return data;
};
export const GetUser = async (id: string, authToken?: string) => {
  try {
    const { data } = await axios.get(`http://localhost:5274/api/v1/user/get`, {
      params: { Id: id },
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    const res = data;
    return res;
  } catch (error) {
    console.error("Error during getting data:", error);
  }
};
export const DeactivateUser = async (
  formPayload: FormData,
  authToken: string
) => {
  console.log("update", formPayload);
  const response = await axios.post(
    `http://localhost:5274/api/v1/user/update-status`,
    formPayload,
    {
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`, // Include token here
      },
    }
  );
  const data = await response.data;
  return data;
};
export const GetProduct = async (id: number) => {
  try {
    const { data } = await axios.get(
      `http://localhost:5274/api/v1/product/get`,
      {
        params: { Id: id },
        headers: {
          Accept: "text/plain",
          "Content-Type": "application/json",
        },
      }
    );
    const res = data;
    return res;
  } catch (error) {
    console.error("Error during getting data:", error);
  }
};
export const UpdateDeliveryStatus = async (
  formPayload: FormData,
  authToken: string
) => {
  try {
    const { data } = await axios.post(
      `http://localhost:5274/api/v1/order/update-delivery-status`,
      formPayload,
      {
        headers: {
          Accept: "text/plain",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const res = data;
    return res;
  } catch (error) {
    console.error("Error during getting data:", error);
  }
};
export const UpdatePaymentStatus = async (
  formPayload: FormData,
  authToken: string
) => {
  console.log("u", formPayload, authToken);
  try {
    const { data } = await axios.post(
      `http://localhost:5274/api/v1/order/update-payment-status`,
      formPayload,
      {
        headers: {
          Accept: "text/plain",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const res = data;
    return res;
  } catch (error) {
    console.error("Error during getting data:", error);
  }
};
// GetAll
export const GetAll = async (
  authToken: string,
  apiName: string,
  user?: string
) => {
  try {
    const { data } = await axios.get(
      `http://localhost:5274/api/v1/${apiName}/getall`,
      {
        params: { user: user },
        headers: {
          Accept: "text/plain",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const res = data;
    return res;
  } catch (error) {
    console.error("Error during getting data:", error);
  }
};
// Get
export const Get = async (id: number, authToken?: string, apiName?: string) => {
  try {
    const { data } = await axios.get(
      `http://localhost:5274/api/v1/${apiName}/get`,
      {
        params: { Id: id },
        headers: {
          Accept: "text/plain",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const res = data;
    return res;
  } catch (error) {
    console.error("Error during getting data:", error);
  }
};
export const Create = async (
  formPayload: FormData,
  authToken?: string,
  endPoint?: string
) => {
  console.log("create", formPayload);
  const response = await axios.post(
    `http://localhost:5274/api/v1/${endPoint}/create`,
    formPayload,
    {
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`, // Include token here
      },
    }
  );
  const data = await response.data;
  return data;
};
export const CreateMulti = async (
  formPayload: FormData,
  authToken: string,
  endPoint: string
) => {
  console.log("create", formPayload);
  const response = await axios.post(
    `http://localhost:5274/api/v1/${endPoint}/create`,
    formPayload,
    {
      headers: {
        Accept: "text/plain",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${authToken}`, // Include token here
      },
    }
  );
  const data = await response.data;
  return data;
};
export const Update = async (
  formPayload: FormData,
  authToken: string,
  endPoint: string
) => {
  console.log("update", formPayload);
  const response = await axios.post(
    `http://localhost:5274/api/v1/${endPoint}/update`,
    formPayload,
    {
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`, // Include token here
      },
    }
  );
  const data = await response.data;
  return data;
};
export const UpdateMulti = async (
  formPayload: FormData,
  authToken: string,
  endPoint: string
) => {
  console.log("upm", formPayload);
  const response = await axios.post(
    `http://localhost:5274/api/v1/${endPoint}/update`,
    formPayload,
    {
      headers: {
        Accept: "text/plain",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${authToken}`, // Include token here
      },
    }
  );
  const data = await response.data;
  return data;
};
export const Delete = async (
  id: number,
  authToken: string,
  endPoint: string
) => {
  console.log("top", id);
  const response = await axios.delete(
    `http://localhost:5274/api/v1/${endPoint}/delete`,
    {
      params: { Id: id }, // Pass query parameters here
      headers: {
        Accept: "text/plain", // Set header as in curl request
        Authorization: `Bearer ${authToken}`, // Include token here
      },
    }
  );
  const data = await response.data;
  return data;
};

export const GetBkashGrantToken = async () => {
  try {
    const { data } = await axios.get(
      `http://localhost:5274/api/v1/bkash/get-token`
    );
    const res = data;
    return res;
  } catch (error) {
    console.error("Error during getting data:", error);
  }
};
export const CreateBkashPayment = async (formPayload: {
  amount: string;
  token: string;
}) => {
  try {
    const { data } = await axios.post(
      `http://localhost:5274/api/v1/bkash/create-payment`,
      formPayload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Error during getting data:", error);
  }
};
export const ExecuteBkashPayment = async (formPayload: {
  paymentID: string;
  token: string;
}) => {
  try {
    const { data } = await axios.post(
      `http://localhost:5274/api/v1/bkash/execute-payment`,
      formPayload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Error during getting data:", error);
  }
};
