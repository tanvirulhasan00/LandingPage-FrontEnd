import React from "react";
import {
  isRouteErrorResponse,
  Link,
  redirect,
  useLoaderData,
  useNavigate,
} from "react-router";
import Button from "~/components/button";
import { GetAll } from "~/components/data";
import Table from "~/components/table";
import { columns } from "~/components/user-column";
import type { Route } from "./+types/user";

export const clientLoader = async () => {
  const token = localStorage.getItem("authToken") as string;
  console.log("token", token);

  try {
    const res = await GetAll(token, "user", "all");
    return { user: res?.results };
  } catch (error) {
    return redirect(`/dashboard?error=${error}`);
  }
};

const User = () => {
  const { user } = useLoaderData<typeof clientLoader>();
  const navigate = useNavigate();
  const handleUpdate = (id: number) => {
    navigate(`/dashboard/update-user-status/${id}`);
  };
  return (
    <div className="p-10">
      <div className="flex justify-between mb-5 text-2xl p-1">
        <h1>User List</h1>
        <Link to={`/dashboard/user-registration`}>
          <Button>Add User</Button>
        </Link>
      </div>
      <Table
        columns={columns}
        rows={user}
        show="user"
        updateBtnText="Deactivate"
        handleUpdate={handleUpdate}
        hideDeleteBtn={true}
        bg={"bg-red-500"}
      />
    </div>
  );
};

export default User;

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
