import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { isRouteErrorResponse, Link, useLoaderData } from "react-router";
import type { Route } from "./+types/payment-success";
import { ExecuteBkashPayment } from "~/components/data";
import { bkashToken } from "~/cookies.server";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const cookieHeader = request.headers.get("Cookie");
  const token = (await bkashToken.parse(cookieHeader)) || null;
  const url = new URL(request.url);
  const paymentID = url.searchParams.get("paymentID") as string;
  const status = url.searchParams.get("status");
  const signature = url.searchParams.get("signature") as string;
  const formPayload = {
    paymentID: paymentID,
    token: token, // <-- Insert your token here
  };
  if (status === "success") {
    const res = await ExecuteBkashPayment(formPayload);
    console.log("ex", res);
  }
  return { paymentID: paymentID, status: status, signature: signature };
};

export default function PaymentSuccess() {
  const { paymentID, status, signature } = useLoaderData<typeof loader>();
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-10 max-w-lg w-full text-center">
        {status === "success" ? (
          <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-4" />
        ) : (
          ""
        )}
        {status === "failure" ? (
          <XCircleIcon className="w-20 h-20 text-red-500 mx-auto mb-4" />
        ) : (
          ""
        )}
        {status === "cancel" ? (
          <CheckCircleIcon className="w-20 h-20 text-red-500 mx-auto mb-4" />
        ) : (
          ""
        )}

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Payment {status}!
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Payment Id: {paymentID}
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Payment signature: {signature}
        </p>
        {/* <p className="text-gray-600 dark:text-gray-300 mb-6">
          Thank you for your purchase. Your order has been confirmed and will be
          processed shortly.
        </p> */}
        <Link
          to="/"
          className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full transition"
        >
          Go to Home
        </Link>
      </div>
    </main>
  );
}

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
