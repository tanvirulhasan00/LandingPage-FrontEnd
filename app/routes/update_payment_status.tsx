import React, { useState } from "react";
import {
  Form,
  isRouteErrorResponse,
  Link,
  redirect,
  useLoaderData,
  useNavigation,
  useSearchParams,
} from "react-router";

import Input from "~/components/input";
import Label from "~/components/label";
import Button from "~/components/button";
import { Get, UpdatePaymentStatus } from "~/components/data";
import type { Route } from "./+types/update_payment_status";

export const clientLoader = async ({
  request,
  params,
}: Route.ClientLoaderArgs) => {
  const token = localStorage.getItem("authToken") as string;
  const { orderId } = params;
  const res = await Get(Number(orderId), token, "order");
  return { orders: res.results };
};
export const clientAction = async ({ request }: Route.ClientActionArgs) => {
  const token = localStorage.getItem("authToken") as string;
  const formData = await request.formData();
  const orderId = formData.get("orderId") as string;
  const formPayload = new FormData();
  formPayload.append("id", orderId);
  formPayload.append("status", formData.get("paymentStatus") as string);

  try {
    const res = await UpdatePaymentStatus(formPayload, token);
    console.log(res);
    if (res.success) {
      return redirect(`/dashboard/order`);
    }
  } catch (error) {
    return redirect(
      `/dashboard/update_payment_status/${orderId}?error=${error}`
    );
  }
};

const UpdatePaymentStatusComp = () => {
  const { orders } = useLoaderData<typeof clientLoader>();
  console.log("d", orders);
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";
  const [searchParams, setSearchParams] = useSearchParams();

  const message = searchParams.get("message");
  const statusCode = searchParams.get("status");
  const error = searchParams.get("error");

  return (
    <div className="sm:w-[60%] w-[80%] m-auto max-sm:mt-5 ">
      <div
        hidden={error ? false : true}
        className="bg-red-600 rounded-md p-1 mt-2"
      >
        <h1>{statusCode}</h1>
        <p>{error}</p>
      </div>
      <Form method="post">
        <Input hidden name="orderId" type="text" value={orders.id} />
        <div className="sm:p-10">
          <h1 className="text-2xl">Update Payment Status</h1>
          <div className="mt-6">
            <Label>Payment Status</Label>
            <select
              name="paymentStatus"
              className="border-1 border-gray-400 w-full rounded-md p-3"
              defaultValue={orders.deliveryStatus}
            >
              <option value={"Paid"}>Paid</option>
              <option value={"Failed"}>Failed</option>
              <option value={"Refund"}>Refund</option>
            </select>
          </div>

          <div className="mt-5 flex gap-3">
            <Button className="w-full">
              {" "}
              {isLoading ? "Updating..." : "Update"}
            </Button>
            <Link
              to={"/dashboard/order"}
              className="w-full flex items-center justify-center border-1 rounded-md hover:border-red-700"
            >
              Cancel
            </Link>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default UpdatePaymentStatusComp;

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
