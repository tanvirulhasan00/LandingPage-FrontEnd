import React from "react";
import { isRouteErrorResponse } from "react-router";
import Button from "~/components/button";
import { columns } from "~/components/payment-column";
import Table from "~/components/table";
import type { Route } from "./+types/payment";

const rows = [
  { name: "Jane Doe", email: "jane@example.com", role: "Admin" },
  { name: "John Smith", email: "john@example.com", role: "User" },
  { name: "Sarah Lee", email: "sarah@example.com", role: "Manager" },
  { name: "Tom Hardy", email: "tom@example.com", role: "User" },
  { name: "Anna Kim", email: "anna@example.com", role: "Admin" },
  { name: "Leo Grant", email: "leo@example.com", role: "Manager" },
];

const Payment = () => {
  return (
    <div className="p-10">
      <div className="mb-5 text-2xl p-1">
        <h1>Payment List</h1>
      </div>
      <Table columns={columns} rows={rows} show="payment" />
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
      {/* <p>{details}</p> */}
      {/* {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )} */}
    </main>
  );
}
