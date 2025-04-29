import axios from "axios";

const baseUrl = "http://httpool-001-site1.anytempurl.com";
const baseUrlLocal = "http://localhost:5274";
const credentials = btoa(`${"11240566"}:${"60-dayfreetrial"}`); // base64 encode

export const LoginReq = async (username: string, password: string) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/api/v1/auth/login`,
      { userName: username, password: password },
      {
        headers: {
          Accept: "text/plain",
          "Content-Type": "application/json",
        },
      }
    );
    return data; // your user data
  } catch (error: any) {
    console.error("Login error:", error.response?.data || error.message);

    return { success: false, message: "Invalid username or password" };
  }
};
export const Registration = async (
  formPayload: FormData,
  authToken: string
) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/api/v1/auth/registration`,
      formPayload,
      {
        headers: {
          Accept: "text/plain",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`, // Include token here
        },
      }
    );
    return data;
  } catch (error: any) {
    console.error("Registration error:", error.response?.data || error.message);
    return { success: false, message: error?.message };
  }
};
export const GetUser = async (id: string, authToken?: string) => {
  try {
    const { data } = await axios.get(`${baseUrl}/api/v1/user/get`, {
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
    return error;
  }
};
export const DeactivateUser = async (
  formPayload: FormData,
  authToken: string
) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/api/v1/user/update-status`,
      formPayload,
      {
        headers: {
          Accept: "text/plain",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`, // Include token here
        },
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};
export const GetProduct = async (id: number) => {
  try {
    const { data } = await axios.get(
      `http://httpool-001-site1.anytempurl.com/api/v1/product/get`,
      {
        params: { Id: id },
        headers: {
          Accept: "text/plain",
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Error during getting data:", error);
    return error;
  }
};
export const UpdateDeliveryStatus = async (
  formPayload: FormData,
  authToken: string
) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/api/v1/order/update-delivery-status`,
      formPayload,
      {
        headers: {
          Accept: "text/plain",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Error during getting data:", error);
    return error;
  }
};
export const UpdatePaymentStatus = async (
  formPayload: FormData,
  authToken: string
) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/api/v1/order/update-payment-status`,
      formPayload,
      {
        headers: {
          Accept: "text/plain",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Error during getting data:", error);
    return error;
  }
};
// GetAll
export const GetAll = async (
  authToken: string,
  apiName: string,
  user?: string
) => {
  try {
    const { data } = await axios.get(`${baseUrl}/api/v1/${apiName}/getall`, {
      params: { user: user },
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
    return error;
  }
};
// Get
export const Get = async (id: number, authToken?: string, apiName?: string) => {
  try {
    const { data } = await axios.get(
      `http://httpool-001-site1.anytempurl.com/api/v1/${apiName}/get`,
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
    return error;
  }
};
export const Create = async (
  formPayload: FormData,
  authToken?: string,
  endPoint?: string
) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/api/v1/${endPoint}/create`,
      formPayload,
      {
        headers: {
          Accept: "text/plain",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`, // Include token here
        },
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};
export const CreateMulti = async (
  formPayload: FormData,
  authToken: string,
  endPoint: string
) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/api/v1/${endPoint}/create`,
      formPayload,
      {
        headers: {
          Accept: "text/plain",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`, // Include token here
        },
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};
export const Update = async (
  formPayload: FormData,
  authToken: string,
  endPoint: string
) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/api/v1/${endPoint}/update`,
      formPayload,
      {
        headers: {
          Accept: "text/plain",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`, // Include token here
        },
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};
export const UpdateMulti = async (
  formPayload: FormData,
  authToken: string,
  endPoint: string
) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/api/v1/${endPoint}/update`,
      formPayload,
      {
        headers: {
          Accept: "text/plain",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`, // Include token here
        },
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};
export const Delete = async (
  id: number,
  authToken: string,
  endPoint: string
) => {
  try {
    const { data } = await axios.delete(
      `${baseUrl}/api/v1/${endPoint}/delete`,
      {
        params: { Id: id }, // Pass query parameters here
        headers: {
          Accept: "text/plain", // Set header as in curl request
          Authorization: `Bearer ${authToken}`, // Include token here
        },
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};

export const GetBkashGrantToken = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/api/v1/bkash/get-token`);
    const res = data;
    return res;
  } catch (error) {
    console.error("Error during getting data:", error);
    return error;
  }
};
export const CreateBkashPayment = async (formPayload: {
  amount: string;
  token: string;
}) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/api/v1/bkash/create-payment`,
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
    return error;
  }
};
export const ExecuteBkashPayment = async (formPayload: {
  paymentID: string;
  token: string;
}) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/api/v1/bkash/execute-payment`,
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
    return error;
  }
};
