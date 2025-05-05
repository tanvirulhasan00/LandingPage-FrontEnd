import { CheckCircleIcon } from "@heroicons/react/16/solid";
import React from "react";
import {
  Form,
  isRouteErrorResponse,
  Link,
  redirect,
  useLoaderData,
  useNavigation,
} from "react-router";
import Button from "~/components/button";
import type { Route } from "./+types/bkash-payment";
import {
  CreateBkashPayment,
  ExecuteBkashPayment,
  GetBkashGrantToken,
} from "~/components/data";

export const clientLoader = async ({ request }: Route.ClientLoaderArgs) => {
  const url = new URL(request.url);
  const totalAmount = url.searchParams.get("total");
  return { totalAmount: totalAmount };
};
export const clientAction = async ({ request }: Route.ClientActionArgs) => {
  const formData = await request.formData();

  const res = await GetBkashGrantToken();
  if (res?.statusMessage === "Successful") {
    console.log("bToken", res);
    // Create the Set-Cookie header
    localStorage.setItem("bkashToken", res.id_token);
    const formPayload = {
      amount: formData.get("total") as string,
      token: res.id_token, // <-- Insert your token here
    };

    const createPay = await CreateBkashPayment(formPayload);
    if (createPay?.statusMessage === "Successful") {
      console.log("createBkash", createPay);
      // 👉 Redirect user to the bKash URL

      return redirect(createPay.bkashURL);
    }
  }
  // 📢 Now return the cookie in the response headers
  return "";
};

const BkashPayment = () => {
  const { totalAmount } = useLoaderData<typeof clientLoader>();

  const amount = parseFloat(totalAmount || "");
  const formatted = new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
  }).format(amount);

  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Form method="post">
        <input id="total" name="total" hidden value={Number(totalAmount)} />
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-10 max-w-lg w-full text-center">
          <img
            src="/BKash.png"
            className=" bg-gray-200 rounded-lg mx-auto mb-4"
          />
          <span className="text-center text-red-600">{formatted}</span>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Pay With Bkash.
          </h1>

          <button
            disabled={isLoading}
            type="submit"
            className="inline-block bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition cursor-pointer"
          >
            {isLoading ? "Loading..." : "Pay now"}
          </button>
        </div>
      </Form>
    </main>
  );
};

export default BkashPayment;

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>Something went wrong!</p>
      {/* <p>{details}</p> */}
      {/* {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )} */}
    </main>
  );
}
