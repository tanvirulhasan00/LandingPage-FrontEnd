import Button from "~/components/button";
import { columns } from "~/components/product-column";
import Table from "~/components/table";
import { authCookie, userIdCookie, userRoleCookie } from "~/cookies.server";
import { Delete, GetAll } from "~/components/data";
import {
  isRouteErrorResponse,
  Link,
  redirect,
  useFetcher,
  useLoaderData,
  useNavigate,
  useNavigation,
  useSearchParams,
} from "react-router";
import type { Route } from "./+types/product";
import Loading from "~/components/loading";
import { useEffect } from "react";

export async function loader({ request }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const token = (await authCookie.parse(cookieHeader)) || null;
  const userIDH = request.headers.get("Cookie");
  const userRoleHe = request.headers.get("Cookie");

  const userRole = (await userRoleCookie.parse(userRoleHe)) || null;
  const userId = (await userIdCookie.parse(userIDH)) || null;

  const res = await GetAll(
    token,
    "product",
    userRole == "user" ? userId : "all"
  );
  const product = res?.results;
  return { product: product };
}

export async function action({ request }: Route.ActionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const token = (await authCookie.parse(cookieHeader)) || null;
  const formData = await request.formData();
  const id = formData.get("productId");

  const res = await Delete(Number(id), token, "product");
  if (res.success) {
    return redirect(
      `/dashboard/product?message=${res.message}&status=${res.statusCode}`
    );
  } else {
    return redirect(
      `/dashboard/product?error=${res.message}&status=${res.statusCode}`
    );
  }
}

const Product = () => {
  const { product } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const handleUpdate = (id: number) => {
    navigate(`/dashboard/product_item/${id}`);
  };
  const handleDelete = (id: number) => {
    fetcher.submit(
      {
        productId: id.toString(),
      },
      {
        method: "post",
      }
    );
  };
  const [searchParams, setSearchParams] = useSearchParams();

  const message = searchParams.get("message");
  const statusCode = searchParams.get("status");
  const error = searchParams.get("error");

  useEffect(() => {
    if (isLoading) {
      <Loading />;
    }
  }, [isLoading]);

  return (
    <div className="p-10">
      <div className="flex justify-between mb-5 text-2xl p-1">
        <h1>Product List</h1>
        <Link to={`/dashboard/create_product`}>
          <Button>Add Product</Button>
        </Link>
      </div>
      <Table
        columns={columns}
        rows={product}
        show="product"
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Product;

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
