import {
  Form,
  Link,
  redirect,
  useLoaderData,
  useNavigation,
  useSearchParams,
} from "react-router";
import Button from "~/components/button";
import Divider from "~/components/divider";
import Input from "~/components/input";
import Label from "~/components/label";
import type { Route } from "./+types/update-userinfo";
import { Get, GetUser, UpdateMulti } from "~/components/data";
import TextArea from "~/components/text-area";
import { useEffect, useState } from "react";
import Notification from "~/components/notification";

export const clientLoader = async () => {
  const token = localStorage.getItem("authToken") as string;
  const userId = localStorage.getItem("userId") as string;

  try {
    const res = await GetUser(userId, token);
    console.log("");
    return { user: res?.results };
  } catch (error) {
    return redirect(`/dashboard?error=${error}`);
  }
};

export const clientAction = async ({ request }: Route.ClientActionArgs) => {
  const token = localStorage.getItem("authToken") as string;

  const formData = await request.formData();
  const formPayload = new FormData();
  formPayload.append("id", formData.get("userId") as string);
  formPayload.append("userName", formData.get("userName") as string);
  formPayload.append("phoneNumber", formData.get("phoneNumber") as string);
  formPayload.append("address", formData.get("address") as string);
  formPayload.append("email", formData.get("email") as string);
  const imageUrl = formData.get("imageUrl");
  if (imageUrl instanceof File) formPayload.append("imageUrl", imageUrl);

  try {
    const res = await UpdateMulti(formPayload, token, "user");
    if (res.success) {
      return redirect(`/dashboard`);
    } else {
      return redirect(
        `/dashboard/update-userinfo?status=${res?.statusCode}&&error=${res?.message}`
      );
    }
  } catch (error) {
    return redirect(`/dashboard/update-userinfo?error=${error}`);
  }
};

const UpdateUserInfo = () => {
  const { user } = useLoaderData<typeof clientLoader>();

  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";

  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(true);
  const statusCode = searchParams.get("status");
  const error = searchParams.get("error");

  useEffect(() => {
    if (error) {
      setOpen(false);
    }
  }, [error]);

  const handleClick = () => {
    setOpen(!open);
    // Clear the URL after a small delay, to let user see the message
    setSearchParams({});
  };

  const [formData, setFormData] = useState({
    userName: user?.userName,
    phoneNumber: user?.phoneNumber,
    address: user?.address,
    email: user?.email,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="sm:w-[60%] w-[80%] m-auto max-sm:mb-4">
      <Notification
        open={open}
        statusCode={statusCode || undefined}
        error={error || undefined}
        handleClick={handleClick}
      />
      <Form method="post" encType="multipart/form-data">
        <Input hidden name="userId" type="text" value={user?.id} />
        <div className="sm:p-10">
          <div className="mt-10">
            <div className="tracking-[2px] text-xl">
              <h1>Update User information</h1>
            </div>
            <div className="mt-5">
              <div className="w-full">
                <Label htmlFor="userName">User Name</Label>
                <Input
                  name="userName"
                  type="text"
                  value={formData.userName}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full mt-5">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  name="phoneNumber"
                  type="text"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full mt-5">
                <Label htmlFor="address">Address</Label>
                <TextArea
                  name="address"
                  value={formData.address}
                  onChange={handleChangeTextArea}
                />
              </div>

              <div className="w-full mt-5">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full mt-5">
                <Label htmlFor="imageUrl">Image</Label>
                <Input
                  name="imageUrl"
                  type="file"
                  inputClassName="cursor-pointer"
                />
              </div>
              <Divider className="mt-10" />
            </div>
          </div>

          <div className="mt-5 flex gap-3">
            <Button className="w-full">
              {" "}
              {isLoading ? "Updating..." : "Update"}
            </Button>
            <Link
              to={"/dashboard"}
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

export default UpdateUserInfo;
