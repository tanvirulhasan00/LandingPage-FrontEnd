import { Form, redirect, useNavigation, useSearchParams } from "react-router";
import type { Route } from "./+types/login";
import { LoginReq } from "~/components/data";
import { useEffect, useState } from "react";
import Notification from "~/components/notification";

export async function clientLoader() {
  const token = localStorage.getItem("authToken");
  if (token !== null) {
    return redirect("/dashboard");
  }
  return { token: token };
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const res = await LoginReq(username, password);
  try {
    if (res?.success) {
      const userToken = res?.results.token;
      const userId = res?.results.id;
      const userRole = res?.results.role;
      // const expiresAt = Date.now() + 1000 * 60 * 60 * 24; // 24 hours from now

      localStorage.setItem("authToken", userToken);
      localStorage.setItem("userId", userId);
      localStorage.setItem("userRole", userRole);

      return redirect(
        `/dashboard?message=${res?.message}&status=${res?.statusCode}`
      );
    } else {
      return redirect(
        `/login?message=${res?.message}&status=${res?.statusCode}`
      );
    }
  } catch (error) {
    return redirect(`/login?error=${error}`);
  }
}
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Landing Page | Login" },
    { name: "description", content: "Welcome to landign page login" },
  ];
}

const Login = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";
  const [open, setOpen] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const statusCode = searchParams.get("status");
  const error = searchParams.get("error");
  useEffect(() => {
    if (error || statusCode === undefined) {
      setOpen(false);
    }
  }, [error]);

  const handleClick = () => {
    setOpen(!open);
    // Clear the URL after a small delay, to let user see the message
    setSearchParams({});
  };

  return (
    <div className=" flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <Notification
        open={open}
        statusCode={statusCode || undefined}
        error={error || undefined}
        handleClick={handleClick}
      />
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="/favicon.ico"
          className="mx-auto h-20 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Login into your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Form method="POST" className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100"
            >
              User Name
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                required
                autoComplete="username"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900  outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
