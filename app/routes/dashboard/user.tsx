import React from "react";
import { Link, redirect, useLoaderData, useNavigate } from "react-router";
import Button from "~/components/button";
import { GetAll } from "~/components/data";
import Table from "~/components/table";
import { columns } from "~/components/user-column";
import { authCookie } from "~/cookies.server";
import type { Route } from "./+types/user";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const cookiesHeader = request.headers.get("Cookie");
  const token = (await authCookie.parse(cookiesHeader)) || null;

  try {
    const res = await GetAll(token, "user", "all");
    return { user: res?.results };
  } catch (error) {
    return redirect(`/dashboard?error=${error}`);
  }
};

const User = () => {
  const { user } = useLoaderData<typeof loader>();
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
