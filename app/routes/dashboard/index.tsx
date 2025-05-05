import { isRouteErrorResponse, Link, useLoaderData } from "react-router";
import { GetUser } from "~/components/data";
import type { Route } from "./+types/dashboard";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Button from "~/components/button";

export async function clientLoader() {
  const token = localStorage.getItem("authToken") as string;
  const userId = localStorage.getItem("userId") as string;
  const userRole = localStorage.getItem("userRole") as string;

  const res = await GetUser(userId, token);
  console.log("user", res);
  const users = res?.results;
  return { user: users, userRole: userRole };
}

const Index = () => {
  const { user, userRole } = useLoaderData<typeof clientLoader>();

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 dark:from-black to-white dark:to-gray-800 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white dark:bg-gray-600 text-gray-800 dark:text-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-3">
          {/* Left Panel */}
          <div className="bg-indigo-600 p-8 flex flex-col items-center justify-center">
            <img
              src={user.imageUrl}
              alt="User"
              className="w-36 h-36 rounded-full border-4 border-white shadow-lg object-cover mb-4"
            />
            <h2 className="text-2xl font-bold text-white">{user.userName}</h2>
            <h2 className="text-lg text-gray-400">{userRole}</h2>
            <p className="text-indigo-100 mt-2">{user.email}</p>
            <span
              className={`mt-4 inline-block px-4 py-1 text-sm rounded-full ${
                user.active ? "bg-green-400" : "bg-red-400"
              }`}
            >
              {user.active === 1 ? "Active" : "Deactivated"}
            </span>
          </div>

          {/* Right Panel */}
          <div className="md:col-span-2 p-10">
            <div className="mb-6 flex-col sm:flex-row flex max-sm:gap-2 max-sm:items-start justify-between items-center">
              <h3 className="text-2xl font-semibold ">User Information</h3>
              <Link to={`/dashboard/update-userinfo`}>
                <Button className=" flex gap-2 justify-center items-center">
                  <PencilSquareIcon className="size-6" /> <p>Update Info</p>
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className=" font-medium">Phone Number</h4>
                <p className="">{user.phoneNumber}</p>
              </div>
              <div>
                <h4 className=" font-medium">Address</h4>
                <p className="">{user.address}</p>
              </div>
              <div>
                <h4 className=" font-medium">Created Date</h4>
                <p className="">
                  {new Date(user.createdDate).toLocaleString()}
                </p>
              </div>
              <div className="flex justify-end max-sm:justify-start">
                <Link to={"#"}>
                  <Button>Change Password</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

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
