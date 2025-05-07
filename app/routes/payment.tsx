import { isRouteErrorResponse } from "react-router";
import type { Route } from "./+types/payment";

const Payment = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-5 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold text-red-500 mb-3">
        This is an advanced feature. Contact for more.
      </h1>
      <div className="mt-3 text-center space-y-2">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">
          Contact Information
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <span className="font-semibold">Email:</span> eamil@mail.com
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <span className="font-semibold">Phone Number:</span> 01900001122
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <span className="font-semibold">Office Address:</span> Savar DOSH,
          house 28, road 1
        </p>
      </div>
    </div>
  );
};

export default Payment;

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
    </main>
  );
}
