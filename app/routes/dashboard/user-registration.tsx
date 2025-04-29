import {
  Form,
  Link,
  redirect,
  useNavigation,
  useSearchParams,
} from "react-router";
import Button from "~/components/button";
import Divider from "~/components/divider";
import Input from "~/components/input";
import Label from "~/components/label";
import type { Route } from "./+types/update-userinfo";
import { authCookie } from "~/cookies.server";
import { Registration } from "~/components/data";
import TextArea from "~/components/text-area";

export const action = async ({ request }: Route.ActionArgs) => {
  const cookiesHeader = request.headers.get("Cookie");
  const token = (await authCookie.parse(cookiesHeader)) || null;
  const formData = await request.formData();
  const formPayload = new FormData();
  formPayload.append("userName", formData.get("userName") as string);
  formPayload.append("password", formData.get("password") as string);
  formPayload.append("phoneNumber", formData.get("phoneNumber") as string);
  formPayload.append("address", formData.get("address") as string);
  formPayload.append("email", formData.get("email") as string);
  formPayload.append("active", formData.get("active") as string);
  const imageUrl = formData.get("imageUrl");
  if (imageUrl instanceof File) formPayload.append("imageUrl", imageUrl);

  try {
    const res = await Registration(formPayload, token);
    if (res.success) {
      return redirect(`/dashboard/user`);
    } else {
      return redirect(
        `/dashboard/user-registration?status=${res?.statusCode}&&error=${res?.message}`
      );
    }
  } catch (error) {
    return redirect(`/dashboard/user-registration?error=${error}`);
  }
};

const UserRegistration = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";
  const [searchParams, setSearchParams] = useSearchParams();

  const statusCode = searchParams.get("status");
  const error = searchParams.get("error");

  return (
    <div className="sm:w-[60%] w-[80%] m-auto max-sm:mb-4">
      <div
        hidden={error ? false : true}
        className="bg-red-600 rounded-md p-1 mt-2"
      >
        <h1>{statusCode}</h1>
        <p>{error}</p>
      </div>
      <Form method="post" encType="multipart/form-data">
        <div className="sm:p-10">
          <div className="mt-10">
            <div className="tracking-[2px] text-xl">
              <h1>User Registration</h1>
            </div>
            <div className="mt-5">
              <div className="w-full">
                <Label htmlFor="userName">User Name</Label>
                <Input name="userName" type="text" />
              </div>
              <div className="w-full">
                <Label htmlFor="password">Password</Label>
                <Input name="password" type="text" />
              </div>
              <div className="w-full mt-5">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input name="phoneNumber" type="text" />
              </div>
              <div className="w-full mt-5">
                <Label htmlFor="address">Address</Label>
                <TextArea name="address" />
              </div>
              <div className="w-full mt-5">
                <Label htmlFor="email">Email</Label>
                <Input name="email" type="email" />
              </div>
              <div className="w-full mt-5">
                <Label htmlFor="active">Active Status</Label>
                <select
                  name="active"
                  className="bg-white p-2 w-full text-black"
                >
                  <option selected value={1}>
                    Active
                  </option>
                  <option value={0}>InActive</option>
                </select>
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
              {isLoading ? "Creating..." : "Create"}
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

export default UserRegistration;
