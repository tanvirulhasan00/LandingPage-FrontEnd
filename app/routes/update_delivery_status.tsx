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
import { authCookie } from "~/cookies.server";
import { Get, UpdateDeliveryStatus } from "~/components/data";
import type { Route } from "./+types/update_delivery_status";

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const cookieHeader = request.headers.get("Cookie");
  const token = (await authCookie.parse(cookieHeader)) || null;
  const { orderId } = params;
  const res = await Get(Number(orderId), token, "order");
  return { orders: res.results };
};
export const action = async ({ request }: Route.ActionArgs) => {
  const cookieHeader = request.headers.get("Cookie");
  const token = (await authCookie.parse(cookieHeader)) || null;
  const formData = await request.formData();
  const orderId = formData.get("orderId") as string;
  const formPayload = new FormData();
  formPayload.append("id", orderId);
  formPayload.append("status", formData.get("deliveryStatus") as string);

  try {
    const res = await UpdateDeliveryStatus(formPayload, token);
    console.log(res);
    if (res.success) {
      return redirect(`/dashboard/order`);
    }
  } catch (error) {
    return redirect(
      `/dashboard/update_delivery_status/${orderId}?error=${error}`
    );
  }
};

const UpdateOrderStatus = () => {
  const { orders } = useLoaderData<typeof loader>();
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
          <h1 className="text-2xl">Update Delivery Status</h1>
          <div className="mt-6">
            <Label>Delivery Status</Label>
            <select
              name="deliveryStatus"
              className="border-1 border-gray-400 w-full rounded-md p-3"
              defaultValue={orders.deliveryStatus}
            >
              <option value={"In Process"}>In Process</option>
              <option value={"Completed"}>Completed</option>
              <option value={"Failed"}>Failed</option>
              <option value={"Cancelled"}>Cancelled</option>
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

export default UpdateOrderStatus;

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
