import {
  Form,
  isRouteErrorResponse,
  redirect,
  useLoaderData,
  useNavigation,
} from "react-router";
import type { Route } from "./+types/home";
import ContactInformationForm from "~/components/contact-information";
import OrderSummery from "~/components/order-summery";
import { useEffect, useState } from "react";
import { Create, Get, GetProduct } from "~/components/data";
import Loading from "~/components/loading";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Landing Page" },
    { name: "description", content: "Welcome to landign page dashboard" },
  ];
}

export const clientLoader = async ({
  request,
  params,
}: Route.ClientLoaderArgs) => {
  const { productId } = params;
  const res = await GetProduct(Number(productId));
  const shippingFeesData = await Get(1, "", "all-cost");
  return {
    success: res.success,
    product: res.results,
    shippingFeesData: shippingFeesData.results,
  };
};
export const clientAction = async ({ request }: Route.ClientActionArgs) => {
  const formData = await request.formData();
  const paymentMethod = formData.get("payment-method") as string;
  const totalAmount = formData.get("total") as string;

  const formPayload = new FormData();
  formPayload.append("productId", formData.get("productId") as string);
  formPayload.append("email", formData.get("email") as string);
  formPayload.append("firstname", formData.get("firstname") as string);
  formPayload.append("lastname", formData.get("lastname") as string);
  formPayload.append("district", formData.get("district") as string);
  formPayload.append("subDistrict", formData.get("subDistrict") as string);
  formPayload.append("address", formData.get("address") as string);
  formPayload.append("phoneNumber", formData.get("phoneNumber") as string);
  formPayload.append("quantity", formData.get("number") as string);
  formPayload.append("comment", formData.get("comments") as string);
  formPayload.append("productColor", formData.get("color") as string);
  formPayload.append("productSize", formData.get("size") as string);

  formPayload.append(
    "deliveryMethod",
    formData.get("delivery-method") as string
  );
  formPayload.append("paymentMethod", paymentMethod);
  formPayload.append("totalPrice", totalAmount);

  try {
    const res = await Create(formPayload, "", "order");
    if (res.success) {
      return redirect(
        `/response?success=${res?.success}&&status=${res?.statusCode}&&message=${res?.message}&&orderNumber=${res?.results?.orderNumber}&&paymentMethod=${paymentMethod}`
      );
    }
  } catch (error) {
    console.log(error);
    return redirect(`/response?error=${error}`);
  }

  console.log("COn", formPayload);
  // if (paymentMethod === "bkash") {
  //   return redirect(`/bkash-payment?total=${totalAmount}`);
  // }
  return "";
};

export default function Home() {
  const { product, shippingFeesData, success } =
    useLoaderData<typeof clientLoader>();
  const [selectedOption, setSelectedOption] = useState<string>("");
  const handleDelete = () => {};

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  console.log("Navigation state:", success);

  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setShowLoader(false), 2000); // Delay for UX
    return () => clearTimeout(timeout);
  }, [showLoader]);

  return (
    <main>
      <div className="md:w-[90%] md:p-10 m-auto p-5 w-full">
        <Form method="post">
          <input hidden name="productId" id="productId" value={product?.id} />
          <div className="flex gap-10 border-none flex-col lg:flex-row border-gray-200 p-5  rounded-md shadow-2xl shadow-gray-500">
            <div id="contact-information" className="w-full">
              <ContactInformationForm
                selectedOption={selectedOption}
                onOptionChange={setSelectedOption}
              />
            </div>
            <div id="order-summary" className="w-full">
              {showLoader ? (
                <Loading />
              ) : (
                <OrderSummery
                  product={product}
                  shippingFeesData={shippingFeesData}
                  handleDelete={handleDelete}
                  selectedOption={selectedOption}
                />
              )}
            </div>
          </div>
        </Form>
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
