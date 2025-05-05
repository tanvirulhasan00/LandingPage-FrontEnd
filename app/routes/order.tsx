import {
  isRouteErrorResponse,
  useFetcher,
  useLoaderData,
  useNavigate,
} from "react-router";
import { columns } from "~/components/order-column";
import Table from "~/components/table";
import type { Route } from "./+types/order";
import { GetAll } from "~/components/data";

export const clientLoader = async ({ request }: Route.ClientLoaderArgs) => {
  const token = localStorage.getItem("authToken") as string;
  const userId = localStorage.getItem("userId") as string;
  const userRole = localStorage.getItem("userRole") as string;
  const res = await GetAll(token, "order", userRole == "user" ? userId : "all");

  const order = res?.results;

  return { order: order };
};

const OrderCom = () => {
  const { order } = useLoaderData<typeof clientLoader>();
  console.log("w", order);
  const navigate = useNavigate();
  const fetcher = useFetcher();

  const handleStatusUpdate = (id: number) => {
    navigate(`/dashboard/update_delivery_status/${id}`);
  };

  return (
    <div className="p-10">
      <div className="flex justify-between mb-5 text-2xl p-1">
        <h1>Order List</h1>
      </div>
      <Table
        columns={columns}
        rows={order}
        show="order"
        handleUpdate={handleStatusUpdate}
        hideDeleteBtn={true}
        updateBtnText={"Update Status"}
      />
    </div>
  );
};

export default OrderCom;

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
