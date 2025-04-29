import React, { useState } from "react";
import type { Route } from "./+types/product_item";
import { CreateMulti } from "~/components/data";
import { authCookie, userIdCookie } from "~/cookies.server";
import {
  Form,
  isRouteErrorResponse,
  Link,
  redirect,
  useLoaderData,
  useNavigation,
  useSearchParams,
} from "react-router";
import Label from "~/components/label";
import Input from "~/components/input";
import Button from "~/components/button";

export async function loader({ request, params }: Route.LoaderArgs) {
  const userIDH = request.headers.get("Cookie");
  const userId = (await userIdCookie.parse(userIDH)) || null;
  return { userId: userId };
}

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const imageUrl = formData.get("imageUrl");
  const userID = formData.get("userId") as string;

  const formPayload = new FormData();
  formPayload.append("userId", userID);
  formPayload.append("name", formData.get("name") as string);
  formPayload.append("color", formData.get("color") as string);
  formPayload.append("size", formData.get("size") as string);
  formPayload.append("price", formData.get("price") as string);
  if (imageUrl instanceof File) formPayload.append("productImageUrl", imageUrl);

  const cookieHeader = request.headers.get("Cookie");
  const token = (await authCookie.parse(cookieHeader)) || null;

  try {
    const response = await CreateMulti(formPayload, token, "product");

    if (response.success) {
      return redirect(
        `/dashboard/product?message=${response.message}&status=${response.statusCode}`
      );
    } else {
      return redirect(
        `/dashboard/create_product?error=${response.message}&status=${response.statusCode}`
      );
    }
  } catch (error: any) {
    return redirect(`/dashboard/create_product?error=${error}`);
  }
};

const ProductItem = () => {
  const { userId } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const isLoading = navigation.state === "loading";

  const [searchParams, setSearchParams] = useSearchParams();
  const message = searchParams.get("message");
  const statusCode = searchParams.get("status");
  const error = searchParams.get("error");

  return (
    <div className="sm:w-[60%] w-[80%] m-auto max-sm:mt-5">
      <div
        hidden={error ? false : true}
        className="bg-red-600 rounded-md p-1 mt-2"
      >
        <h1>{statusCode}</h1>
        <p>{error}</p>
      </div>
      <Form method="post" encType="multipart/form-data">
        <Input hidden name="userId" type="text" value={userId} />
        <div className="sm:p-10">
          <h1 className="text-2xl">Create Product</h1>
          <div className="mt-6">
            <Label>Product Name</Label>
            <Input type="text" name="name" />
          </div>
          <div className="mt-5">
            <Label>Product Color</Label>
            <Input type="text" name="color" />
          </div>
          <div className="mt-5">
            <Label>Product Size</Label>
            <Input type="text" name="size" />
          </div>
          <div className="mt-5">
            <Label>Product Price</Label>
            <Input type="text" name="price" />
          </div>
          <div className="mt-5">
            <Label>Product Image</Label>
            <Input
              type="file"
              name="imageUrl"
              inputClassName="cursor-pointer"
            />
          </div>
          <div className="mt-5 flex gap-3">
            <Button className="w-full">
              {" "}
              {isSubmitting ? "Creating..." : "Create"}
            </Button>
            <Link
              to={"/dashboard/product"}
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

export default ProductItem;

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
