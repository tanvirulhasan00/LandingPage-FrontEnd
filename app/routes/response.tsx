import React from "react";
import {
  isRouteErrorResponse,
  Link,
  redirect,
  useLoaderData,
} from "react-router";
import type { Route } from "./+types/response";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import Button from "~/components/button";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const success = url.searchParams.get("success");
  const message = url.searchParams.get("message");
  const status = url.searchParams.get("status");
  const paymentMethod = url.searchParams.get("paymentMethod");
  const orderNumber = url.searchParams.get("orderNumber");
  const error = url.searchParams.get("error");
  return {
    success: success,
    status: status,
    message: message,
    orderNumber: orderNumber,
    paymentMethod: paymentMethod,
    error: error,
  };
};

const Success = () => {
  const { success, status, message, orderNumber, paymentMethod, error } =
    useLoaderData<typeof loader>();

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-10 max-w-lg w-full text-center">
        {success === "true" ? (
          <div>
            <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {message}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Order Number:{" "}
              <span className="text-green-500">{orderNumber}</span>
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              <span className="text-green-500">
                {paymentMethod === "bkash" ? (
                  <span className="text-red-500">
                    Pay now or your order will cancel.
                  </span>
                ) : (
                  <span>Thank you for trust us</span>
                )}
              </span>{" "}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Payment Method:{" "}
              <span className="text-green-500">
                {paymentMethod?.toUpperCase()}
              </span>{" "}
              &#x261E;{" "}
              {paymentMethod === "bkash" ? (
                <Link
                  className="border-none bg-red-500 p-1.5 rounded-md text-sm"
                  to={`/bkash-payment?total=${20}`}
                >
                  Pay now
                </Link>
              ) : (
                ""
              )}
            </p>
          </div>
        ) : (
          <div>
            <XCircleIcon className="w-20 h-20 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {error}
            </h1>
          </div>
        )}

        <Link
          to="/"
          className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full transition"
        >
          Go to Home
        </Link>
      </div>
    </main>
  );
};

export default Success;

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
