import React from "react";
import { isRouteErrorResponse, Link, useLoaderData } from "react-router";
import type { Route } from "./+types/response";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

export const clientLoader = async ({ request }: Route.ClientLoaderArgs) => {
  const url = new URL(request.url);
  return {
    success: url.searchParams.get("success"),
    status: url.searchParams.get("status"),
    message: url.searchParams.get("message"),
    orderNumber: url.searchParams.get("orderNumber"),
    paymentMethod: url.searchParams.get("paymentMethod"),
    error: url.searchParams.get("error"),
  };
};

const Success = () => {
  const { success, status, message, orderNumber, paymentMethod, error } =
    useLoaderData<typeof clientLoader>();

  const isSuccess = success === "true";

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 sm:p-10 max-w-lg w-full text-center">
        {isSuccess ? (
          <>
            <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {message}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Order Number:{" "}
              <span className="text-green-500 font-medium">{orderNumber}</span>
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Payment Method:{" "}
              <span className="text-green-500 font-medium">
                {paymentMethod?.toUpperCase()}
              </span>
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              <span className="text-green-500 font-medium">
                Thank you for trusting us!
              </span>
            </p>
          </>
        ) : (
          <>
            <XCircleIcon className="w-20 h-20 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {error || "Something went wrong"}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Please try again or contact support.
            </p>
          </>
        )}

        <Link
          to="/"
          className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full transition duration-200"
        >
          Go to Home
        </Link>
      </div>
    </main>
  );
};

export default Success;

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let title = "Oops!";
  let details = "An unexpected error occurred.";

  if (isRouteErrorResponse(error)) {
    title = error.status === 404 ? "404 - Page Not Found" : "Error";
    details = error.statusText || details;
  } else if (import.meta.env.DEV && error instanceof Error) {
    details = error.message;
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 text-center px-4">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {title}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{details}</p>
        <Link
          to="/"
          className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full transition duration-200"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}
