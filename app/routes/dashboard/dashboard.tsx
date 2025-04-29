import React from "react";
import Header from "~/components/header";
import {
  isRouteErrorResponse,
  Outlet,
  redirect,
  useFetcher,
  useLoaderData,
} from "react-router";
import type { Route } from "./+types/dashboard";
import { authCookie, userIdCookie, userRoleCookie } from "~/cookies.server";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Landing Page | Dashboard" },
    { name: "description", content: "Welcome to landign page dashboard" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookieUserRole = request.headers.get("Cookie");
  const token = (await authCookie.parse(cookieHeader)) || null;
  const userRole = (await userRoleCookie.parse(cookieUserRole)) || null;

  if (!token) {
    return redirect("/login");
  }
  return { token: token, userRole: userRole };
}

export const action = async () => {
  return redirect("/login?message=Logged+out", {
    headers: {
      "Set-Cookie": [
        await authCookie.serialize("", { maxAge: 0 }),
        await userIdCookie.serialize("", { maxAge: 0 }),
        await userRoleCookie.serialize("", { maxAge: 0 }),
      ].join(", "),
    },
  });
};

const Dashboard = () => {
  const { token, userRole } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  const handleLogout = () => {
    fetcher.submit(null, { method: "post" });
  };
  return (
    <div>
      <div>
        <Header userRole={userRole} token={token} handleLogout={handleLogout} />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;

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
