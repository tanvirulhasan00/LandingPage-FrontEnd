import React, { useState } from "react";
import type { Route } from "./+types/update-user-status";
import {
  Form,
  Link,
  redirect,
  useLoaderData,
  useNavigation,
  useSearchParams,
} from "react-router";
import { DeactivateUser, GetUser } from "~/components/data";
import Button from "~/components/button";
import Input from "~/components/input";
import Label from "~/components/label";

export const clientLoader = async ({
  request,
  params,
}: Route.ClientLoaderArgs) => {
  const { userId } = params;
  const token = localStorage.getItem("authToken") as string;

  try {
    const res = await GetUser(userId, token);
    return { user: res?.results };
  } catch (error) {
    return redirect(`/dashboard/user?error=${error}`);
  }
};

export const clientAction = async ({ request }: Route.ClientActionArgs) => {
  const token = localStorage.getItem("authToken") as string;
  const formData = await request.formData();
  const formPayload = new FormData();
  const userId = formData.get("userId") as string;
  formPayload.append("id", userId);
  formPayload.append("active", formData.get("active") as string);

  try {
    const res = await DeactivateUser(formPayload, token);
    if (res.success) {
      return redirect(`/dashboard/user`);
    } else {
      return redirect(
        `/dashboard/update-user-status/${userId}?status=${res?.statusCode}&&error=${res?.message}`
      );
    }
  } catch (error) {
    return redirect(`/dashboard/update-user-status/${userId}?error=${error}`);
  }
};

const UpdateUserStatus = () => {
  const { user } = useLoaderData<typeof clientLoader>();

  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";
  const [searchParams, setSearchParams] = useSearchParams();

  const statusCode = searchParams.get("status");
  const error = searchParams.get("error");

  const [formData, setFormData] = useState({
    id: user?.id,
    active: user?.active,
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="sm:w-[60%] w-[80%] m-auto">
      <div
        hidden={error ? false : true}
        className="bg-red-600 rounded-md p-1 mt-2"
      >
        <h1>{statusCode}</h1>
        <p>{error}</p>
      </div>
      <Form method="post" encType="multipart/form-data">
        <Input hidden name="userId" type="text" value={formData.id} />
        <div className="sm:p-10">
          <div className="mt-10">
            <div className="tracking-[2px] text-xl">
              <h1>Deactivate User</h1>
            </div>

            <div className="w-full mt-5 rounded-md">
              <Label htmlFor="active">Active Status</Label>
              <select
                value={formData.active}
                onChange={handleChange}
                name="active"
                className="bg-white p-2 w-full text-black rounded-md"
              >
                <option value={1}>Active</option>
                <option value={0}>Deactivate</option>
              </select>
            </div>
          </div>

          <div className="mt-5 flex gap-3">
            <Button className="w-full">
              {" "}
              {isLoading ? "Updating..." : "Update"}
            </Button>
            <Link
              to={"/dashboard/user"}
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

export default UpdateUserStatus;
