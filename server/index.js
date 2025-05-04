import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams, useRouteError, Meta, Links, ScrollRestoration, Scripts, Outlet, isRouteErrorResponse, useNavigation, Link, redirect, Form, createCookie, useFetcher, useSearchParams, useNavigate } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createElement, useState, useEffect } from "react";
import { MinusCircleIcon, PlusCircleIcon, Bars3Icon, XMarkIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { XMarkIcon as XMarkIcon$1, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary$c = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$c,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const Label = ({ htmlFor, className, children }) => {
  return /* @__PURE__ */ jsx(
    "label",
    {
      htmlFor,
      className: `pb-1 block text-sm/6 font-medium text-gray-900 dark:text-white ${className}`,
      children
    }
  );
};
const Input = ({
  name,
  type = "text",
  placeholder,
  wrapperClassName = "",
  inputClassName = "",
  ...rest
}) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `flex items-center rounded-md bg-white outline-1 -outline-offset-1  outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 ${wrapperClassName}`,
      children: /* @__PURE__ */ jsx(
        "input",
        {
          id: name,
          name,
          type,
          placeholder,
          className: `block min-w-0 grow py-1.5 pr-3 pl-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 ${inputClassName}`,
          ...rest
        }
      )
    }
  );
};
const Divider = ({ className }) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `w-full h-[1px] bg-gray-300 dark:bg-gray-500 ${className}`
    }
  );
};
const TextArea = ({ name, className, ...rest }) => {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      id: name,
      name,
      rows: 3,
      className: `block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${className}`,
      ...rest
    }
  );
};
const RadioButton = ({
  id,
  name,
  label,
  className,
  ...rest
}) => {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-x-3", children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        ...rest,
        id,
        name,
        type: "radio",
        className: `${className} cursor-pointer relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden`
      }
    ),
    /* @__PURE__ */ jsx(
      "label",
      {
        htmlFor: id,
        className: "block text-sm/6 font-medium text-gray-900 dark:text-white",
        children: label
      }
    )
  ] });
};
const ContactInformationForm = ({ selectedOption, onOptionChange }) => {
  console.log("fd", selectedOption);
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsxs("div", { id: "title", className: "tracking-[2px] text-xl", children: [
      /* @__PURE__ */ jsx("h1", { children: "Contact information" }),
      /* @__PURE__ */ jsxs("div", { className: "mt-5", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email address" }),
        /* @__PURE__ */ jsx(Input, { name: "email", type: "email", placeholder: "example@email.com" })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Divider, { className: "mt-10" }),
    /* @__PURE__ */ jsxs("div", { className: "mt-10", children: [
      /* @__PURE__ */ jsx("div", { className: "tracking-[2px] text-xl", children: /* @__PURE__ */ jsx("h1", { children: "Shipping information" }) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex w-full gap-5 max-sm:flex-col", children: [
          /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "firstname", children: "First Name" }),
            /* @__PURE__ */ jsx(Input, { name: "firstname", type: "text" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "lastname", children: "Last Name" }),
            /* @__PURE__ */ jsx(Input, { name: "lastname", type: "text" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "w-full mt-5", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "phoneNumber", children: "Phone Number" }),
          /* @__PURE__ */ jsx(Input, { name: "phoneNumber", type: "text" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex w-full gap-5 max-sm:flex-col mt-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "district", children: "District" }),
            /* @__PURE__ */ jsx(Input, { name: "district", type: "text" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "subDistrict", children: "Sub District" }),
            /* @__PURE__ */ jsx(Input, { name: "subDistrict", type: "text" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "w-full mt-5", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "address", children: "Address" }),
          /* @__PURE__ */ jsx(Input, { name: "address", type: "text" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "w-full mt-5", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "comments", children: "Comments" }),
          /* @__PURE__ */ jsx(TextArea, { name: "comments" })
        ] }),
        /* @__PURE__ */ jsx(Divider, { className: "mt-10" }),
        /* @__PURE__ */ jsx("div", { className: "mt-10", children: /* @__PURE__ */ jsxs("fieldset", { children: [
          /* @__PURE__ */ jsx("legend", { className: "tracking-[2px] text-xl  text-gray-900 dark:text-white", children: "Delivery Location" }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-4 mt-5 flex-col md:flex-row", children: [
            /* @__PURE__ */ jsx(
              RadioButton,
              {
                id: "inside-dhaka",
                name: "delivery-location",
                label: "Inside Dhaka",
                value: "inside-dhaka",
                checked: selectedOption === "inside-dhaka",
                onChange: (e) => onOptionChange(e.target.value),
                required: selectedOption === "pick-up" ? false : true,
                disabled: selectedOption === "pick-up"
              }
            ),
            /* @__PURE__ */ jsx(
              RadioButton,
              {
                id: "outside-dhaka",
                name: "delivery-location",
                label: "Outside Dhaka",
                value: "outside-dhaka",
                checked: selectedOption === "outside-dhaka",
                onChange: (e) => onOptionChange(e.target.value),
                required: selectedOption === "pick-up" ? false : true,
                disabled: selectedOption === "pick-up"
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "mt-10", children: /* @__PURE__ */ jsxs("fieldset", { children: [
          /* @__PURE__ */ jsx("legend", { className: "tracking-[2px] text-xl  text-gray-900 dark:text-white", children: "Delivery Method" }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-4 mt-5 flex-col md:flex-row", children: [
            /* @__PURE__ */ jsx(
              RadioButton,
              {
                id: "pick-up",
                name: "delivery-method",
                label: "Pick Up",
                value: "pick-up",
                onChange: (e) => onOptionChange(e.target.value),
                required: true
              }
            ),
            /* @__PURE__ */ jsx(
              RadioButton,
              {
                defaultChecked: true,
                id: "home-delivery",
                name: "delivery-method",
                label: "Home Delivery",
                value: "home-delivery",
                onChange: (e) => onOptionChange(e.target.value)
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "mt-10", children: /* @__PURE__ */ jsxs("fieldset", { children: [
          /* @__PURE__ */ jsx("legend", { className: "tracking-[2px] text-xl  text-gray-900 dark:text-white", children: "Payment Method" }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-4 mt-5 flex-col md:flex-row", children: [
            /* @__PURE__ */ jsx(
              RadioButton,
              {
                defaultChecked: true,
                id: "bkash",
                name: "payment-method",
                label: "Bkash",
                value: "bkash"
              }
            ),
            /* @__PURE__ */ jsx(
              RadioButton,
              {
                id: "cash",
                name: "payment-method",
                label: "Cash On Delivery",
                value: "cash"
              }
            )
          ] })
        ] }) })
      ] })
    ] })
  ] });
};
const Button = ({
  className,
  bg = "bg-indigo-600",
  children,
  ...rest
}) => {
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "submit",
      className: `${className} cursor-pointer rounded-md ${bg} px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`,
      ...rest,
      children
    }
  );
};
const OrderSummery = ({
  product: product2,
  shippingFeesData,
  handleDelete,
  selectedOption
}) => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";
  const unitPrice = product2.price;
  const [number, setNumber] = useState(1);
  const [shippingFees, setShippingFees] = useState(0);
  const [subTotal, setSubTotal] = useState(unitPrice);
  const [total, setTotal] = useState(unitPrice + shippingFees);
  const colors = product2.color.split(",").map((color) => color.trim());
  const sizes = product2.size.split(",").map((size) => size.trim());
  useEffect(() => {
    let updatedShipping = 0;
    switch (selectedOption) {
      case "inside-dhaka":
        updatedShipping = shippingFeesData.insideDhaka;
        break;
      case "outside-dhaka":
        updatedShipping = shippingFeesData.outsideDhaka;
        break;
      case "pick-up":
        updatedShipping = 20;
        break;
    }
    const updatedSubTotal = unitPrice * number;
    setShippingFees(updatedShipping);
    setSubTotal(updatedSubTotal);
    setTotal(updatedSubTotal + updatedShipping);
  }, [selectedOption, number]);
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsx("input", { id: "total", name: "total", hidden: true, value: total }),
    /* @__PURE__ */ jsx("input", { id: "number", name: "number", hidden: true, value: number }),
    /* @__PURE__ */ jsx("div", { className: "tracking-[2px] text-xl  text-gray-900 dark:text-white mb-5", children: /* @__PURE__ */ jsx("h1", { children: "Order Summery " }) }),
    /* @__PURE__ */ jsxs("div", { className: "w-full h-full border-none rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-600", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between h-full p-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-[6rem] h-[8rem] object-cover", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: product2 == null ? void 0 : product2.productImageUrl,
              className: "w-full h-full rounded-md"
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h1", { className: "text-sm text-gray-800 dark:text-white", children: product2 == null ? void 0 : product2.name }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 mt-1", children: [
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    name: "color",
                    id: "color",
                    className: "text-[.8rem] text-gray-400",
                    children: [
                      /* @__PURE__ */ jsx("option", { selected: true, children: "Color" }),
                      colors.map((color, index2) => /* @__PURE__ */ jsx("option", { value: color, children: color.length ? color : "n/a" }, index2))
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    name: "size",
                    id: "size",
                    className: "text-[.8rem] text-gray-400",
                    children: [
                      /* @__PURE__ */ jsx("option", { selected: true, children: "Size" }),
                      sizes.map((size, index2) => /* @__PURE__ */ jsx("option", { value: size, children: size.length ? size : "n/a" }, index2))
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("h2", { className: "text-sm text-gray-900 dark:text-white", children: [
              "BDT ",
              product2 == null ? void 0 : product2.price
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between items-center", children: [
          /* @__PURE__ */ jsx("div", { children: "Quantity" }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsx("div", { hidden: number <= 1 ? true : false, children: /* @__PURE__ */ jsx(
              MinusCircleIcon,
              {
                className: "text-gray-500 dark:text-gray-200 size-6 cursor-pointer",
                onClick: () => {
                  if (number > 1) {
                    const newQuantity = number - 1;
                    const newSubTotal = unitPrice * newQuantity;
                    setNumber(newQuantity);
                    setSubTotal(newSubTotal);
                    setTotal(newSubTotal + shippingFees);
                  }
                }
              }
            ) }),
            /* @__PURE__ */ jsx("h1", { children: number }),
            /* @__PURE__ */ jsx(
              PlusCircleIcon,
              {
                className: "text-gray-500 dark:text-gray-200 size-6 cursor-pointer",
                onClick: () => {
                  const newQuantity = number + 1;
                  const newSubTotal = unitPrice * newQuantity;
                  setNumber(newQuantity);
                  setSubTotal(newSubTotal);
                  setTotal(newSubTotal + shippingFees);
                }
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Divider, { className: "mt-5 mb-5" }),
      /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2", children: [
            /* @__PURE__ */ jsx("p", { children: "Subtotal" }),
            /* @__PURE__ */ jsxs("p", { className: "grid justify-end", children: [
              "BDT ",
              subTotal
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2", children: [
            /* @__PURE__ */ jsxs("p", { children: [
              "Shipping fees",
              " ",
              selectedOption === "inside-dhaka" ? "/ inside dhaka" : "/ outside dhaka"
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "grid justify-end", children: [
              "BDT ",
              shippingFees
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(Divider, { className: "mt-5 mb-5" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2", children: [
          /* @__PURE__ */ jsx("p", { children: "Total" }),
          /* @__PURE__ */ jsxs("p", { className: "grid justify-end", children: [
            "BDT ",
            total
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Divider, { className: "mt-5 mb-5" }),
      /* @__PURE__ */ jsxs("div", { className: "p-5 flex gap-4", children: [
        /* @__PURE__ */ jsx(Button, { disabled: isLoading, className: "w-full", children: isLoading ? "Loading..." : "Confirm order" }),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "#",
            className: "w-full flex items-center justify-center border-1 rounded-md hover:border-red-700",
            children: "Cancel order"
          }
        )
      ] })
    ] })
  ] });
};
const baseUrl = "http://httpool-001-site1.anytempurl.com";
btoa(`${"11240566"}:${"60-dayfreetrial"}`);
const LoginReq = async (username, password) => {
  var _a;
  try {
    const { data } = await axios.post(
      `${baseUrl}/api/v1/auth/login`,
      { userName: username, password },
      {
        headers: {
          Accept: "text/plain",
          "Content-Type": "application/json"
        }
      }
    );
    return data;
  } catch (error) {
    console.error("Login error:", ((_a = error.response) == null ? void 0 : _a.data) || error.message);
    return { success: false, message: "Invalid username or password" };
  }
};
const Registration = async (formPayload, authToken) => {
  var _a;
  try {
    const { data } = await axios.post(
      `${baseUrl}/api/v1/auth/registration`,
      formPayload,
      {
        headers: {
          Accept: "text/plain",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`
          // Include token here
        }
      }
    );
    return data;
  } catch (error) {
    console.error("Registration error:", ((_a = error.response) == null ? void 0 : _a.data) || error.message);
    return { success: false, message: error == null ? void 0 : error.message };
  }
};
const GetUser = async (id, authToken) => {
  try {
    const { data } = await axios.get(`${baseUrl}/api/v1/user/get`, {
      params: { Id: id },
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`
      }
    });
    const res = data;
    return res;
  } catch (error) {
    console.error("Error during getting data:", error);
    return error;
  }
};
const DeactivateUser = async (formPayload, authToken) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/api/v1/user/update-status`,
      formPayload,
      {
        headers: {
          Accept: "text/plain",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
          // Include token here
        }
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};
const GetProduct = async (id) => {
  try {
    const { data } = await axios.get(
      `http://httpool-001-site1.anytempurl.com/api/v1/product/get`,
      {
        params: { Id: id },
        headers: {
          Accept: "text/plain",
          "Content-Type": "application/json"
        }
      }
    );
    return data;
  } catch (error) {
    console.error("Error during getting data:", error);
    return error;
  }
};
const UpdateDeliveryStatus = async (formPayload, authToken) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/api/v1/order/update-delivery-status`,
      formPayload,
      {
        headers: {
          Accept: "text/plain",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
        }
      }
    );
    return data;
  } catch (error) {
    console.error("Error during getting data:", error);
    return error;
  }
};
const GetAll = async (authToken, apiName, user2) => {
  try {
    const { data } = await axios.get(`${baseUrl}/api/v1/${apiName}/getall`, {
      params: { user: user2 },
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`
      }
    });
    const res = data;
    return res;
  } catch (error) {
    console.error("Error during getting data:", error);
    return error;
  }
};
const Get = async (id, authToken, apiName) => {
  try {
    const { data } = await axios.get(
      `http://httpool-001-site1.anytempurl.com/api/v1/${apiName}/get`,
      {
        params: { Id: id },
        headers: {
          Accept: "text/plain",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
        }
      }
    );
    const res = data;
    return res;
  } catch (error) {
    console.error("Error during getting data:", error);
    return error;
  }
};
const Create = async (formPayload, authToken, endPoint) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/api/v1/${endPoint}/create`,
      formPayload,
      {
        headers: {
          Accept: "text/plain",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
          // Include token here
        }
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};
const CreateMulti = async (formPayload, authToken, endPoint) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/api/v1/${endPoint}/create`,
      formPayload,
      {
        headers: {
          Accept: "text/plain",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`
          // Include token here
        }
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};
const UpdateMulti = async (formPayload, authToken, endPoint) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/api/v1/${endPoint}/update`,
      formPayload,
      {
        headers: {
          Accept: "text/plain",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`
          // Include token here
        }
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};
const Delete = async (id, authToken, endPoint) => {
  try {
    const { data } = await axios.delete(
      `${baseUrl}/api/v1/${endPoint}/delete`,
      {
        params: { Id: id },
        // Pass query parameters here
        headers: {
          Accept: "text/plain",
          // Set header as in curl request
          Authorization: `Bearer ${authToken}`
          // Include token here
        }
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};
const GetBkashGrantToken = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/api/v1/bkash/get-token`);
    const res = data;
    return res;
  } catch (error) {
    console.error("Error during getting data:", error);
    return error;
  }
};
const CreateBkashPayment = async (formPayload) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/api/v1/bkash/create-payment`,
      formPayload,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return data;
  } catch (error) {
    console.error("Error during getting data:", error);
    return error;
  }
};
const ExecuteBkashPayment = async (formPayload) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/api/v1/bkash/execute-payment`,
      formPayload,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return data;
  } catch (error) {
    console.error("Error during getting data:", error);
    return error;
  }
};
function meta$2({}) {
  return [{
    title: "Landing Page"
  }, {
    name: "description",
    content: "Welcome to landign page dashboard"
  }];
}
const loader$e = async ({
  request,
  params
}) => {
  const {
    productId
  } = params;
  const res = await GetProduct(Number(productId));
  const shippingFeesData = await Get(1, "", "all-cost");
  return {
    product: res.results,
    shippingFeesData: shippingFeesData.results
  };
};
const action$a = async ({
  request
}) => {
  var _a;
  const formData = await request.formData();
  const paymentMethod = formData.get("payment-method");
  const totalAmount = formData.get("total");
  const formPayload = new FormData();
  formPayload.append("productId", formData.get("productId"));
  formPayload.append("email", formData.get("email"));
  formPayload.append("firstname", formData.get("firstname"));
  formPayload.append("lastname", formData.get("lastname"));
  formPayload.append("district", formData.get("district"));
  formPayload.append("subDistrict", formData.get("subDistrict"));
  formPayload.append("address", formData.get("address"));
  formPayload.append("phoneNumber", formData.get("phoneNumber"));
  formPayload.append("quantity", formData.get("number"));
  formPayload.append("comment", formData.get("comments"));
  formPayload.append("productColor", formData.get("color"));
  formPayload.append("productSize", formData.get("size"));
  formPayload.append("deliveryMethod", formData.get("delivery-method"));
  formPayload.append("paymentMethod", paymentMethod);
  formPayload.append("totalPrice", totalAmount);
  try {
    const res = await Create(formPayload, "", "order");
    console.log(res);
    if (res.success) {
      return redirect(`/response?success=${res == null ? void 0 : res.success}&&status=${res == null ? void 0 : res.statusCode}&&message=${res == null ? void 0 : res.message}&&orderNumber=${(_a = res == null ? void 0 : res.results) == null ? void 0 : _a.orderNumber}&&paymentMethod=${paymentMethod}`);
    }
  } catch (error) {
    console.log(error);
    return redirect(`/response?error=${error}`);
  }
  console.log("COn", formPayload);
  return "";
};
const home = withComponentProps(function Home() {
  const {
    product: product2,
    shippingFeesData
  } = useLoaderData();
  const [selectedOption, setSelectedOption] = useState("");
  const handleDelete = () => {
  };
  return /* @__PURE__ */ jsx("main", {
    children: /* @__PURE__ */ jsx("div", {
      className: "md:w-[90%] md:p-10 m-auto p-5 w-full",
      children: /* @__PURE__ */ jsxs(Form, {
        method: "post",
        children: [/* @__PURE__ */ jsx("input", {
          hidden: true,
          name: "productId",
          id: "productId",
          value: product2 == null ? void 0 : product2.id
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex gap-10 border-none flex-col lg:flex-row border-gray-200 p-5  rounded-md shadow-2xl shadow-gray-500",
          children: [/* @__PURE__ */ jsx("div", {
            id: "contact-information",
            className: "w-full",
            children: /* @__PURE__ */ jsx(ContactInformationForm, {
              selectedOption,
              onOptionChange: setSelectedOption
            })
          }), /* @__PURE__ */ jsx("div", {
            id: "order-summary",
            className: "w-full",
            children: /* @__PURE__ */ jsx(OrderSummery, {
              product: product2,
              shippingFeesData,
              handleDelete,
              selectedOption
            })
          })]
        })]
      })
    })
  });
});
const ErrorBoundary$b = withErrorBoundaryProps(function ErrorBoundary22({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: "Something went wrong!"
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$b,
  action: action$a,
  default: home,
  loader: loader$e,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
const Header = ({ token, handleLogout, userRole }) => {
  const [open, setOpen] = useState(true);
  return /* @__PURE__ */ jsx("div", { className: "w-full h-10 bg-gradient-to-br from-indigo-100 dark:from-black to-white dark:to-gray-800 border-b-1 border-b-gray-400 dark:border-b-cyan-50 p-8 sm:p-12", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between h-full", children: [
    /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx(Link, { to: "/dashboard", children: /* @__PURE__ */ jsx("h1", { children: "Dashboard" }) }) }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `hidden md:block ${!open ? "max-md:block max-md:bg-gray-200 max-md:text-gray-600 max-md:p-3  max-md:w-full max-md:text-center max-md:fixed max-md:top-[6rem] max-sm:top-[4rem] max-md:right-[0rem]" : ""}`,
        children: /* @__PURE__ */ jsxs("ul", { className: "flex gap-4 max-md:flex-col", children: [
          /* @__PURE__ */ jsx("li", { className: "hover:underline", children: /* @__PURE__ */ jsx(Link, { to: "/dashboard", onClick: () => setOpen(!open), children: "Home" }) }),
          userRole === "admin" ? /* @__PURE__ */ jsx("li", { className: "hover:underline", children: /* @__PURE__ */ jsx(Link, { to: "/dashboard/user", onClick: () => setOpen(!open), children: "User" }) }) : null,
          /* @__PURE__ */ jsx("li", { className: "hover:underline", children: /* @__PURE__ */ jsx(Link, { to: "/dashboard/product", onClick: () => setOpen(!open), children: "Products" }) }),
          /* @__PURE__ */ jsx("li", { className: "hover:underline", children: /* @__PURE__ */ jsx(Link, { to: "/dashboard/order", onClick: () => setOpen(!open), children: "Order" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/dashboard/payment", onClick: () => setOpen(!open), children: "Payment" }) }),
          token ? /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/login", onClick: handleLogout, children: "Logout" }) }) : ""
        ] })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "block md:hidden ", children: open ? /* @__PURE__ */ jsx("button", { onClick: () => setOpen(!open), className: "cursor-pointer", children: /* @__PURE__ */ jsx(Bars3Icon, { "aria-hidden": "true", className: "size-8 " }) }) : /* @__PURE__ */ jsx("button", { onClick: () => setOpen(!open), className: "cursor-pointer", children: /* @__PURE__ */ jsx(XMarkIcon, { "aria-hidden": "true", className: "size-8" }) }) })
  ] }) });
};
const authCookie = createCookie("auth", {
  httpOnly: false,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24 * 7
  // 1 week
});
const bkashToken = createCookie("bkash", {
  httpOnly: false,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 10
  // 10 minutes
});
const userIdCookie = createCookie("userId", {
  httpOnly: false,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24 * 7
  // 1 week
});
const userRoleCookie = createCookie("userRole", {
  httpOnly: false,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24 * 7
  // 1 week
});
function meta$1({}) {
  return [{
    title: "Landing Page | Dashboard"
  }, {
    name: "description",
    content: "Welcome to landign page dashboard"
  }];
}
async function loader$d({
  request
}) {
  const cookieHeader = request.headers.get("Cookie");
  const cookieUserRole = request.headers.get("Cookie");
  const token = await authCookie.parse(cookieHeader) || null;
  const userRole = await userRoleCookie.parse(cookieUserRole) || null;
  if (!token) {
    return redirect("/login");
  }
  return {
    token,
    userRole
  };
}
const action$9 = async () => {
  return redirect("/login?message=Logged+out", {
    headers: {
      "Set-Cookie": [await authCookie.serialize("", {
        maxAge: 0
      }), await userIdCookie.serialize("", {
        maxAge: 0
      }), await userRoleCookie.serialize("", {
        maxAge: 0
      })].join(", ")
    }
  });
};
const Dashboard = () => {
  const {
    token,
    userRole
  } = useLoaderData();
  const fetcher = useFetcher();
  const handleLogout = () => {
    fetcher.submit(null, {
      method: "post"
    });
  };
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx("div", {
      children: /* @__PURE__ */ jsx(Header, {
        userRole,
        token,
        handleLogout
      })
    }), /* @__PURE__ */ jsx("div", {
      children: /* @__PURE__ */ jsx(Outlet, {})
    })]
  });
};
const dashboard = withComponentProps(Dashboard);
const ErrorBoundary$a = withErrorBoundaryProps(function ErrorBoundary23({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: "Something went wrong!"
    })]
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$a,
  action: action$9,
  default: dashboard,
  loader: loader$d,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
async function loader$c({
  request
}) {
  const cookieHeader = request.headers.get("Cookie");
  const token = await authCookie.parse(cookieHeader) || null;
  const userIDH = request.headers.get("Cookie");
  const userId = await userIdCookie.parse(userIDH) || null;
  const userRoleHe = request.headers.get("Cookie");
  const userRole = await userRoleCookie.parse(userRoleHe) || null;
  const res = await Get(userId, token, "user");
  const users = res == null ? void 0 : res.results;
  return {
    user: users,
    userRole
  };
}
const Index = () => {
  const {
    user: user2,
    userRole
  } = useLoaderData();
  console.log("user", user2);
  return /* @__PURE__ */ jsx("div", {
    className: "min-h-screen bg-gradient-to-tr from-indigo-100 dark:from-black to-white dark:to-gray-800 flex items-center justify-center p-6",
    children: /* @__PURE__ */ jsx("div", {
      className: "w-full max-w-5xl bg-white dark:bg-gray-600 text-gray-800 dark:text-white rounded-3xl shadow-2xl overflow-hidden",
      children: /* @__PURE__ */ jsxs("div", {
        className: "grid md:grid-cols-3",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "bg-indigo-600 p-8 flex flex-col items-center justify-center",
          children: [/* @__PURE__ */ jsx("img", {
            src: user2.imageUrl,
            alt: "User",
            className: "w-36 h-36 rounded-full border-4 border-white shadow-lg object-cover mb-4"
          }), /* @__PURE__ */ jsx("h2", {
            className: "text-2xl font-bold text-white",
            children: user2.userName
          }), /* @__PURE__ */ jsx("h2", {
            className: "text-lg text-gray-400",
            children: userRole
          }), /* @__PURE__ */ jsx("p", {
            className: "text-indigo-100 mt-2",
            children: user2.email
          }), /* @__PURE__ */ jsx("span", {
            className: `mt-4 inline-block px-4 py-1 text-sm rounded-full ${user2.active ? "bg-green-400" : "bg-red-400"}`,
            children: user2.active === 1 ? "Active" : "Deactivated"
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "md:col-span-2 p-10",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "mb-6 flex-col sm:flex-row flex max-sm:gap-2 max-sm:items-start justify-between items-center",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-2xl font-semibold ",
              children: "User Information"
            }), /* @__PURE__ */ jsx(Link, {
              to: `/dashboard/update-userinfo`,
              children: /* @__PURE__ */ jsxs(Button, {
                className: " flex gap-2 justify-center items-center",
                children: [/* @__PURE__ */ jsx(PencilSquareIcon, {
                  className: "size-6"
                }), " ", /* @__PURE__ */ jsx("p", {
                  children: "Update Info"
                })]
              })
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "grid grid-cols-1 md:grid-cols-2 gap-6",
            children: [/* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("h4", {
                className: " font-medium",
                children: "Phone Number"
              }), /* @__PURE__ */ jsx("p", {
                className: "",
                children: user2.phoneNumber
              })]
            }), /* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("h4", {
                className: " font-medium",
                children: "Address"
              }), /* @__PURE__ */ jsx("p", {
                className: "",
                children: user2.address
              })]
            }), /* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("h4", {
                className: " font-medium",
                children: "Created Date"
              }), /* @__PURE__ */ jsx("p", {
                className: "",
                children: new Date(user2.createdDate).toLocaleString()
              })]
            }), /* @__PURE__ */ jsx("div", {
              className: "flex justify-end max-sm:justify-start",
              children: /* @__PURE__ */ jsx(Link, {
                to: "#",
                children: /* @__PURE__ */ jsx(Button, {
                  children: "Change Password"
                })
              })
            })]
          })]
        })]
      })
    })
  });
};
const index = withComponentProps(Index);
const ErrorBoundary$9 = withErrorBoundaryProps(function ErrorBoundary24({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: "Something went wrong!"
    })]
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$9,
  default: index,
  loader: loader$c
}, Symbol.toStringTag, { value: "Module" }));
const Notification = ({
  open,
  statusCode,
  error,
  handleClick
}) => {
  return /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxs(
    "div",
    {
      hidden: open,
      className: "bg-red-600 rounded p-2 mt-2 flex justify-between items-center w-[30rem] ",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "", children: [
          /* @__PURE__ */ jsxs("h1", { children: [
            "Status: ",
            statusCode
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Message: ",
            error
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx(
          Button,
          {
            bg: "bg-none",
            className: "hover:bg-red-700",
            onClick: handleClick,
            children: /* @__PURE__ */ jsx(XMarkIcon$1, { className: "size-7" })
          }
        ) })
      ]
    }
  ) });
};
const loader$b = async ({
  request
}) => {
  const cookiesHeader = request.headers.get("Cookie");
  const token = await authCookie.parse(cookiesHeader) || null;
  const userIDH = request.headers.get("Cookie");
  const userId = await userIdCookie.parse(userIDH) || null;
  try {
    const res = await Get(userId, token, "user");
    return {
      user: res == null ? void 0 : res.results
    };
  } catch (error) {
    return redirect(`/dashboard?error=${error}`);
  }
};
const action$8 = async ({
  request
}) => {
  const cookiesHeader = request.headers.get("Cookie");
  const token = await authCookie.parse(cookiesHeader) || null;
  const formData = await request.formData();
  const formPayload = new FormData();
  formPayload.append("id", formData.get("userId"));
  formPayload.append("userName", formData.get("userName"));
  formPayload.append("phoneNumber", formData.get("phoneNumber"));
  formPayload.append("address", formData.get("address"));
  formPayload.append("email", formData.get("email"));
  const imageUrl = formData.get("imageUrl");
  if (imageUrl instanceof File) formPayload.append("imageUrl", imageUrl);
  try {
    const res = await UpdateMulti(formPayload, token, "user");
    if (res.success) {
      return redirect(`/dashboard`);
    } else {
      return redirect(`/dashboard/update-userinfo?status=${res == null ? void 0 : res.statusCode}&&error=${res == null ? void 0 : res.message}`);
    }
  } catch (error) {
    return redirect(`/dashboard/update-userinfo?error=${error}`);
  }
};
const UpdateUserInfo = () => {
  const {
    user: user2
  } = useLoaderData();
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(true);
  const statusCode = searchParams.get("status");
  const error = searchParams.get("error");
  useEffect(() => {
    if (error) {
      setOpen(false);
    }
  }, [error]);
  const handleClick = () => {
    setOpen(!open);
    setSearchParams({});
  };
  const [formData, setFormData] = useState({
    userName: user2 == null ? void 0 : user2.userName,
    phoneNumber: user2 == null ? void 0 : user2.phoneNumber,
    address: user2 == null ? void 0 : user2.address,
    email: user2 == null ? void 0 : user2.email
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleChangeTextArea = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "sm:w-[60%] w-[80%] m-auto max-sm:mb-4",
    children: [/* @__PURE__ */ jsx(Notification, {
      open,
      statusCode: statusCode || void 0,
      error: error || void 0,
      handleClick
    }), /* @__PURE__ */ jsxs(Form, {
      method: "post",
      encType: "multipart/form-data",
      children: [/* @__PURE__ */ jsx(Input, {
        hidden: true,
        name: "userId",
        type: "text",
        value: user2 == null ? void 0 : user2.id
      }), /* @__PURE__ */ jsxs("div", {
        className: "sm:p-10",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "mt-10",
          children: [/* @__PURE__ */ jsx("div", {
            className: "tracking-[2px] text-xl",
            children: /* @__PURE__ */ jsx("h1", {
              children: "Update User information"
            })
          }), /* @__PURE__ */ jsxs("div", {
            className: "mt-5",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "w-full",
              children: [/* @__PURE__ */ jsx(Label, {
                htmlFor: "userName",
                children: "User Name"
              }), /* @__PURE__ */ jsx(Input, {
                name: "userName",
                type: "text",
                value: formData.userName,
                onChange: handleChange
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "w-full mt-5",
              children: [/* @__PURE__ */ jsx(Label, {
                htmlFor: "phoneNumber",
                children: "Phone Number"
              }), /* @__PURE__ */ jsx(Input, {
                name: "phoneNumber",
                type: "text",
                value: formData.phoneNumber,
                onChange: handleChange
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "w-full mt-5",
              children: [/* @__PURE__ */ jsx(Label, {
                htmlFor: "address",
                children: "Address"
              }), /* @__PURE__ */ jsx(TextArea, {
                name: "address",
                value: formData.address,
                onChange: handleChangeTextArea
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "w-full mt-5",
              children: [/* @__PURE__ */ jsx(Label, {
                htmlFor: "email",
                children: "Email"
              }), /* @__PURE__ */ jsx(Input, {
                name: "email",
                type: "email",
                value: formData.email,
                onChange: handleChange
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "w-full mt-5",
              children: [/* @__PURE__ */ jsx(Label, {
                htmlFor: "imageUrl",
                children: "Image"
              }), /* @__PURE__ */ jsx(Input, {
                name: "imageUrl",
                type: "file",
                inputClassName: "cursor-pointer"
              })]
            }), /* @__PURE__ */ jsx(Divider, {
              className: "mt-10"
            })]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "mt-5 flex gap-3",
          children: [/* @__PURE__ */ jsxs(Button, {
            className: "w-full",
            children: [" ", isLoading ? "Updating..." : "Update"]
          }), /* @__PURE__ */ jsx(Link, {
            to: "/dashboard",
            className: "w-full flex items-center justify-center border-1 rounded-md hover:border-red-700",
            children: "Cancel"
          })]
        })]
      })]
    })]
  });
};
const updateUserinfo = withComponentProps(UpdateUserInfo);
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$8,
  default: updateUserinfo,
  loader: loader$b
}, Symbol.toStringTag, { value: "Module" }));
const Table = ({
  columns: columns2,
  rows: rows2,
  onRowClick,
  rowsPerPage = 5,
  handleUpdate,
  handleDelete,
  show,
  updateBtnText,
  hideDeleteBtn,
  bg
}) => {
  var _a;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);
  const handleSort = (key) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };
  const sortedRows = (_a = [...rows2]) == null ? void 0 : _a.sort((a, b) => {
    if (!sortKey) return 0;
    const valA = a[sortKey];
    const valB = b[sortKey];
    return sortAsc ? String(valA).localeCompare(String(valB)) : String(valB).localeCompare(String(valA));
  });
  const totalPages = Math.ceil((rows2 == null ? void 0 : rows2.length) / rowsPerPage);
  const paginatedRows = sortedRows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  return /* @__PURE__ */ jsxs("div", { className: "overflow-x-auto shadow-md rounded-xl border", children: [
    /* @__PURE__ */ jsxs("table", { className: "min-w-full bg-white", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-gray-100 dark:bg-black text-gray-700 dark:text-white text-sm uppercase", children: /* @__PURE__ */ jsxs("tr", { className: "text-start", children: [
        columns2 == null ? void 0 : columns2.map((col) => /* @__PURE__ */ jsxs(
          "th",
          {
            className: "px-4 py-3 cursor-pointer text-start",
            onClick: () => handleSort(col.key),
            children: [
              col.label,
              sortKey === col.key ? sortAsc ? " ↑" : " ↓" : ""
            ]
          },
          col.key
        )),
        show == "payment" ? "" : /* @__PURE__ */ jsx("th", { className: "text-center", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "dark:bg-gray-700 dark:text-white text-gray-600", children: paginatedRows && (paginatedRows == null ? void 0 : paginatedRows.length) > 0 ? paginatedRows == null ? void 0 : paginatedRows.map((row, rowIndex) => /* @__PURE__ */ jsxs(
        "tr",
        {
          onClick: () => onRowClick == null ? void 0 : onRowClick(row),
          className: "dark:hover:bg-gray-600 hover:bg-gray-100 cursor-pointer",
          children: [
            columns2.map((col) => {
              const value = col.key.includes(".") ? col.key.split(".").reduce((acc, key) => acc == null ? void 0 : acc[key], row) : row[col.key];
              return /* @__PURE__ */ jsx("td", { className: "px-4 py-2 border-t", children: (col == null ? void 0 : col.render) ? col.render(value, row) : value || "No data" }, col.key);
            }),
            show === "payment" ? null : /* @__PURE__ */ jsx("td", { className: "px-4 py-2 border-t", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-4 justify-center", children: [
              /* @__PURE__ */ jsx(Button, { onClick: () => handleUpdate == null ? void 0 : handleUpdate(row.id), bg, children: updateBtnText ? updateBtnText : "Update" }),
              hideDeleteBtn ? null : /* @__PURE__ */ jsx(
                Button,
                {
                  bg: "bg-red-600",
                  className: "hover:bg-red-700",
                  onClick: () => {
                    const confirmDelete = window.confirm(
                      "Are you sure you want to delete this item?"
                    );
                    if (confirmDelete) {
                      handleDelete == null ? void 0 : handleDelete(row.id);
                    }
                  },
                  children: "Delete"
                }
              )
            ] }) })
          ]
        },
        rowIndex
      )) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx(
        "td",
        {
          colSpan: columns2.length + (show === "payment" ? 0 : 1),
          className: "text-center py-4 text-gray-500",
          children: "No data available."
        }
      ) }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center p-4 gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setCurrentPage((p) => Math.max(p - 1, 1)),
          disabled: currentPage === 1,
          className: "px-3 py-1 border rounded disabled:opacity-50 cursor-pointer",
          children: "Prev"
        }
      ),
      /* @__PURE__ */ jsxs("span", { className: "text-sm", children: [
        "Page ",
        currentPage,
        " of ",
        totalPages
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setCurrentPage((p) => Math.min(p + 1, totalPages)),
          disabled: currentPage === totalPages,
          className: "px-3 py-1 border rounded disabled:opacity-50 cursor-pointer",
          children: "Next"
        }
      )
    ] })
  ] });
};
const columns$3 = [
  {
    key: "imageUrl",
    label: "Image",
    render: (val) => /* @__PURE__ */ jsx(
      "img",
      {
        src: val,
        alt: "image",
        className: "w-[5rem] h-[6rem] rounded-md object-cover"
      }
    )
  },
  {
    key: "userName",
    label: "User Number",
    render: (val) => /* @__PURE__ */ jsx("span", { className: "font-semibold", children: val })
  },
  {
    key: "phoneNumber",
    label: "Phone Number"
  },
  {
    key: "email",
    label: "Email"
  },
  {
    key: "address",
    label: "Address"
  },
  {
    key: "active",
    label: "Status",
    render: (val) => /* @__PURE__ */ jsx(
      "span",
      {
        className: `font-semibold ${{
          1: "text-green-500",
          0: "text-red-500"
        }[val] || ""}`,
        children: val == "1" ? "Active" : "Deactivated"
      }
    )
  }
];
const loader$a = async ({
  request
}) => {
  const cookiesHeader = request.headers.get("Cookie");
  const token = await authCookie.parse(cookiesHeader) || null;
  try {
    const res = await GetAll(token, "user", "all");
    return {
      user: res == null ? void 0 : res.results
    };
  } catch (error) {
    return redirect(`/dashboard?error=${error}`);
  }
};
const User = () => {
  const {
    user: user2
  } = useLoaderData();
  const navigate = useNavigate();
  const handleUpdate = (id) => {
    navigate(`/dashboard/update-user-status/${id}`);
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "p-10",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "flex justify-between mb-5 text-2xl p-1",
      children: [/* @__PURE__ */ jsx("h1", {
        children: "User List"
      }), /* @__PURE__ */ jsx(Link, {
        to: `/dashboard/user-registration`,
        children: /* @__PURE__ */ jsx(Button, {
          children: "Add User"
        })
      })]
    }), /* @__PURE__ */ jsx(Table, {
      columns: columns$3,
      rows: user2,
      show: "user",
      updateBtnText: "Deactivate",
      handleUpdate,
      hideDeleteBtn: true,
      bg: "bg-red-500"
    })]
  });
};
const user = withComponentProps(User);
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: user,
  loader: loader$a
}, Symbol.toStringTag, { value: "Module" }));
const action$7 = async ({
  request
}) => {
  const cookiesHeader = request.headers.get("Cookie");
  const token = await authCookie.parse(cookiesHeader) || null;
  const formData = await request.formData();
  const formPayload = new FormData();
  formPayload.append("userName", formData.get("userName"));
  formPayload.append("password", formData.get("password"));
  formPayload.append("phoneNumber", formData.get("phoneNumber"));
  formPayload.append("address", formData.get("address"));
  formPayload.append("email", formData.get("email"));
  formPayload.append("active", formData.get("active"));
  const imageUrl = formData.get("imageUrl");
  if (imageUrl instanceof File) formPayload.append("imageUrl", imageUrl);
  try {
    const res = await Registration(formPayload, token);
    if (res.success) {
      return redirect(`/dashboard/user`);
    } else {
      return redirect(`/dashboard/user-registration?status=${res == null ? void 0 : res.statusCode}&&error=${res == null ? void 0 : res.message}`);
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
  return /* @__PURE__ */ jsxs("div", {
    className: "sm:w-[60%] w-[80%] m-auto max-sm:mb-4",
    children: [/* @__PURE__ */ jsxs("div", {
      hidden: error ? false : true,
      className: "bg-red-600 rounded-md p-1 mt-2",
      children: [/* @__PURE__ */ jsx("h1", {
        children: statusCode
      }), /* @__PURE__ */ jsx("p", {
        children: error
      })]
    }), /* @__PURE__ */ jsx(Form, {
      method: "post",
      encType: "multipart/form-data",
      children: /* @__PURE__ */ jsxs("div", {
        className: "sm:p-10",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "mt-10",
          children: [/* @__PURE__ */ jsx("div", {
            className: "tracking-[2px] text-xl",
            children: /* @__PURE__ */ jsx("h1", {
              children: "User Registration"
            })
          }), /* @__PURE__ */ jsxs("div", {
            className: "mt-5",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "w-full",
              children: [/* @__PURE__ */ jsx(Label, {
                htmlFor: "userName",
                children: "User Name"
              }), /* @__PURE__ */ jsx(Input, {
                name: "userName",
                type: "text"
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "w-full",
              children: [/* @__PURE__ */ jsx(Label, {
                htmlFor: "password",
                children: "Password"
              }), /* @__PURE__ */ jsx(Input, {
                name: "password",
                type: "text"
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "w-full mt-5",
              children: [/* @__PURE__ */ jsx(Label, {
                htmlFor: "phoneNumber",
                children: "Phone Number"
              }), /* @__PURE__ */ jsx(Input, {
                name: "phoneNumber",
                type: "text"
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "w-full mt-5",
              children: [/* @__PURE__ */ jsx(Label, {
                htmlFor: "address",
                children: "Address"
              }), /* @__PURE__ */ jsx(TextArea, {
                name: "address"
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "w-full mt-5",
              children: [/* @__PURE__ */ jsx(Label, {
                htmlFor: "email",
                children: "Email"
              }), /* @__PURE__ */ jsx(Input, {
                name: "email",
                type: "email"
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "w-full mt-5",
              children: [/* @__PURE__ */ jsx(Label, {
                htmlFor: "active",
                children: "Active Status"
              }), /* @__PURE__ */ jsxs("select", {
                name: "active",
                className: "bg-white p-2 w-full text-black",
                children: [/* @__PURE__ */ jsx("option", {
                  selected: true,
                  value: 1,
                  children: "Active"
                }), /* @__PURE__ */ jsx("option", {
                  value: 0,
                  children: "InActive"
                })]
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "w-full mt-5",
              children: [/* @__PURE__ */ jsx(Label, {
                htmlFor: "imageUrl",
                children: "Image"
              }), /* @__PURE__ */ jsx(Input, {
                name: "imageUrl",
                type: "file",
                inputClassName: "cursor-pointer"
              })]
            }), /* @__PURE__ */ jsx(Divider, {
              className: "mt-10"
            })]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "mt-5 flex gap-3",
          children: [/* @__PURE__ */ jsxs(Button, {
            className: "w-full",
            children: [" ", isLoading ? "Creating..." : "Create"]
          }), /* @__PURE__ */ jsx(Link, {
            to: "/dashboard/user",
            className: "w-full flex items-center justify-center border-1 rounded-md hover:border-red-700",
            children: "Cancel"
          })]
        })]
      })
    })]
  });
};
const userRegistration = withComponentProps(UserRegistration);
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$7,
  default: userRegistration
}, Symbol.toStringTag, { value: "Module" }));
const loader$9 = async ({
  request,
  params
}) => {
  const {
    userId
  } = params;
  const cookiesHeader = request.headers.get("Cookie");
  const token = await authCookie.parse(cookiesHeader) || null;
  try {
    const res = await GetUser(userId, token);
    return {
      user: res == null ? void 0 : res.results
    };
  } catch (error) {
    return redirect(`/dashboard/user?error=${error}`);
  }
};
const action$6 = async ({
  request
}) => {
  const cookiesHeader = request.headers.get("Cookie");
  const token = await authCookie.parse(cookiesHeader) || null;
  const formData = await request.formData();
  const formPayload = new FormData();
  const userId = formData.get("userId");
  formPayload.append("id", userId);
  formPayload.append("active", formData.get("active"));
  try {
    const res = await DeactivateUser(formPayload, token);
    if (res.success) {
      return redirect(`/dashboard/user`);
    } else {
      return redirect(`/dashboard/update-user-status/${userId}?status=${res == null ? void 0 : res.statusCode}&&error=${res == null ? void 0 : res.message}`);
    }
  } catch (error) {
    return redirect(`/dashboard/update-user-status/${userId}?error=${error}`);
  }
};
const UpdateUserStatus = () => {
  const {
    user: user2
  } = useLoaderData();
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";
  const [searchParams, setSearchParams] = useSearchParams();
  const statusCode = searchParams.get("status");
  const error = searchParams.get("error");
  const [formData, setFormData] = useState({
    id: user2 == null ? void 0 : user2.id,
    active: user2 == null ? void 0 : user2.active
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "sm:w-[60%] w-[80%] m-auto",
    children: [/* @__PURE__ */ jsxs("div", {
      hidden: error ? false : true,
      className: "bg-red-600 rounded-md p-1 mt-2",
      children: [/* @__PURE__ */ jsx("h1", {
        children: statusCode
      }), /* @__PURE__ */ jsx("p", {
        children: error
      })]
    }), /* @__PURE__ */ jsxs(Form, {
      method: "post",
      encType: "multipart/form-data",
      children: [/* @__PURE__ */ jsx(Input, {
        hidden: true,
        name: "userId",
        type: "text",
        value: formData.id
      }), /* @__PURE__ */ jsxs("div", {
        className: "sm:p-10",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "mt-10",
          children: [/* @__PURE__ */ jsx("div", {
            className: "tracking-[2px] text-xl",
            children: /* @__PURE__ */ jsx("h1", {
              children: "Deactivate User"
            })
          }), /* @__PURE__ */ jsxs("div", {
            className: "w-full mt-5 rounded-md",
            children: [/* @__PURE__ */ jsx(Label, {
              htmlFor: "active",
              children: "Active Status"
            }), /* @__PURE__ */ jsxs("select", {
              value: formData.active,
              onChange: handleChange,
              name: "active",
              className: "bg-white p-2 w-full text-black rounded-md",
              children: [/* @__PURE__ */ jsx("option", {
                value: 1,
                children: "Active"
              }), /* @__PURE__ */ jsx("option", {
                value: 0,
                children: "Deactivate"
              })]
            })]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "mt-5 flex gap-3",
          children: [/* @__PURE__ */ jsxs(Button, {
            className: "w-full",
            children: [" ", isLoading ? "Updating..." : "Update"]
          }), /* @__PURE__ */ jsx(Link, {
            to: "/dashboard/user",
            className: "w-full flex items-center justify-center border-1 rounded-md hover:border-red-700",
            children: "Cancel"
          })]
        })]
      })]
    })]
  });
};
const updateUserStatus = withComponentProps(UpdateUserStatus);
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$6,
  default: updateUserStatus,
  loader: loader$9
}, Symbol.toStringTag, { value: "Module" }));
const columns$2 = [
  {
    key: "productImageUrl",
    label: "Image",
    render: (val) => /* @__PURE__ */ jsx(
      "img",
      {
        src: val,
        alt: "image",
        className: "w-[5rem] h-[6rem] rounded-md object-cover"
      }
    )
  },
  {
    key: "name",
    label: "Name",
    render: (val) => /* @__PURE__ */ jsx("span", { className: "font-semibold", children: val })
  },
  {
    key: "color",
    label: "Color"
  },
  {
    key: "size",
    label: "Size"
  },
  {
    key: "price",
    label: "Price",
    render: (val) => {
      const amount = parseFloat(val);
      const formatted = new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: "BDT"
      }).format(amount);
      return /* @__PURE__ */ jsx("span", { className: "text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded", children: formatted });
    }
  }
];
async function loader$8({
  request
}) {
  const cookieHeader = request.headers.get("Cookie");
  const token = await authCookie.parse(cookieHeader) || null;
  const userIDH = request.headers.get("Cookie");
  const userRoleHe = request.headers.get("Cookie");
  const userRole = await userRoleCookie.parse(userRoleHe) || null;
  const userId = await userIdCookie.parse(userIDH) || null;
  const res = await GetAll(token, "product", userRole == "user" ? userId : "all");
  const product2 = res == null ? void 0 : res.results;
  return {
    product: product2
  };
}
async function action$5({
  request
}) {
  const cookieHeader = request.headers.get("Cookie");
  const token = await authCookie.parse(cookieHeader) || null;
  const formData = await request.formData();
  const id = formData.get("productId");
  const res = await Delete(Number(id), token, "product");
  if (res.success) {
    return redirect(`/dashboard/product?message=${res.message}&status=${res.statusCode}`);
  } else {
    return redirect(`/dashboard/product?error=${res.message}&status=${res.statusCode}`);
  }
}
const Product = () => {
  const {
    product: product2
  } = useLoaderData();
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const handleUpdate = (id) => {
    navigate(`/dashboard/product_item/${id}`);
  };
  const handleDelete = (id) => {
    fetcher.submit({
      productId: id.toString()
    }, {
      method: "post"
    });
  };
  const [searchParams, setSearchParams] = useSearchParams();
  searchParams.get("message");
  searchParams.get("status");
  searchParams.get("error");
  useEffect(() => {
  }, [isLoading]);
  return /* @__PURE__ */ jsxs("div", {
    className: "p-10",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "flex justify-between mb-5 text-2xl p-1",
      children: [/* @__PURE__ */ jsx("h1", {
        children: "Product List"
      }), /* @__PURE__ */ jsx(Link, {
        to: `/dashboard/create_product`,
        children: /* @__PURE__ */ jsx(Button, {
          children: "Add Product"
        })
      })]
    }), /* @__PURE__ */ jsx(Table, {
      columns: columns$2,
      rows: product2,
      show: "product",
      handleUpdate,
      handleDelete
    })]
  });
};
const product = withComponentProps(Product);
const ErrorBoundary$8 = withErrorBoundaryProps(function ErrorBoundary25({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: "Something went wrong!"
    })]
  });
});
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$8,
  action: action$5,
  default: product,
  loader: loader$8
}, Symbol.toStringTag, { value: "Module" }));
async function loader$7({
  request,
  params
}) {
  const cookieHeader = request.headers.get("Cookie");
  const userIDH = request.headers.get("Cookie");
  const token = await authCookie.parse(cookieHeader) || null;
  const userId = await userIdCookie.parse(userIDH) || null;
  const {
    productId
  } = params;
  try {
    const res = await Get(Number(productId), token, "product");
    return {
      product: res == null ? void 0 : res.results,
      userId
    };
  } catch (error) {
    return {
      error
    };
  }
}
const action$4 = async ({
  request
}) => {
  const formData = await request.formData();
  const ProductId = formData.get("id");
  const userID = formData.get("userId");
  const imageUrl = formData.get("imageUrl");
  const formPayload = new FormData();
  formPayload.append("id", ProductId);
  formPayload.append("userId", userID);
  formPayload.append("name", formData.get("name"));
  formPayload.append("color", formData.get("color"));
  formPayload.append("size", formData.get("size"));
  formPayload.append("price", formData.get("price"));
  if (imageUrl instanceof File) formPayload.append("productImageUrl", imageUrl);
  const cookieHeader = request.headers.get("Cookie");
  const token = await authCookie.parse(cookieHeader) || null;
  try {
    const response2 = await UpdateMulti(formPayload, token, "product");
    if (response2.success) {
      return redirect(`/dashboard/product?message=${response2.message}&status=${response2.statusCode}`);
    } else {
      return redirect(`/dashboard/product_item/${Number(ProductId)}?error=${response2.message}&status=${response2.statusCode}`);
    }
  } catch (error) {
    return redirect(`/dashboard/product_item?error=${error}`);
  }
};
const ProductItem$1 = () => {
  const {
    product: product2,
    userId
  } = useLoaderData();
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";
  const [formData, setFormData] = useState({
    name: product2 == null ? void 0 : product2.name,
    color: product2 == null ? void 0 : product2.color,
    size: product2 == null ? void 0 : product2.size,
    price: product2 == null ? void 0 : product2.price
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const [searchParams, setSearchParams] = useSearchParams();
  searchParams.get("message");
  const statusCode = searchParams.get("status");
  const error = searchParams.get("error");
  return /* @__PURE__ */ jsxs("div", {
    className: "sm:w-[60%] w-[80%] m-auto max-sm:mt-5",
    children: [/* @__PURE__ */ jsxs("div", {
      hidden: error ? false : true,
      className: "bg-red-600 rounded-md p-1 mt-2",
      children: [/* @__PURE__ */ jsx("h1", {
        children: statusCode
      }), /* @__PURE__ */ jsx("p", {
        children: error
      })]
    }), /* @__PURE__ */ jsxs(Form, {
      method: "post",
      encType: "multipart/form-data",
      children: [/* @__PURE__ */ jsx(Input, {
        hidden: true,
        name: "id",
        type: "number",
        value: product2 == null ? void 0 : product2.id
      }), /* @__PURE__ */ jsx(Input, {
        hidden: true,
        name: "userId",
        type: "text",
        value: userId
      }), /* @__PURE__ */ jsxs("div", {
        className: "sm:p-10",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-2xl",
          children: "Update Product"
        }), /* @__PURE__ */ jsxs("div", {
          className: "mt-6",
          children: [/* @__PURE__ */ jsx(Label, {
            children: "Product Name"
          }), /* @__PURE__ */ jsx(Input, {
            type: "text",
            name: "name",
            value: formData.name,
            onChange: handleChange
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "mt-5",
          children: [/* @__PURE__ */ jsx(Label, {
            children: "Product Color"
          }), /* @__PURE__ */ jsx(Input, {
            type: "text",
            name: "color",
            value: formData.color,
            onChange: handleChange
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "mt-5",
          children: [/* @__PURE__ */ jsx(Label, {
            children: "Product Size"
          }), /* @__PURE__ */ jsx(Input, {
            type: "text",
            name: "size",
            value: formData.size,
            onChange: handleChange
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "mt-5",
          children: [/* @__PURE__ */ jsx(Label, {
            children: "Product Price"
          }), /* @__PURE__ */ jsx(Input, {
            type: "text",
            name: "price",
            value: formData.price,
            onChange: handleChange
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "mt-5",
          children: [/* @__PURE__ */ jsx(Label, {
            children: "Product Image"
          }), /* @__PURE__ */ jsx(Input, {
            type: "file",
            name: "imageUrl",
            inputClassName: "cursor-pointer"
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "mt-5 flex gap-3",
          children: [/* @__PURE__ */ jsxs(Button, {
            className: "w-full",
            children: [" ", isLoading ? "Updating..." : "Update"]
          }), /* @__PURE__ */ jsx(Link, {
            to: "/dashboard/product",
            className: "w-full flex items-center justify-center border-1 rounded-md hover:border-red-700",
            children: "Cancel"
          })]
        })]
      })]
    })]
  });
};
const product_item = withComponentProps(ProductItem$1);
const ErrorBoundary$7 = withErrorBoundaryProps(function ErrorBoundary26({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: "Something went wrong!"
    })]
  });
});
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$7,
  action: action$4,
  default: product_item,
  loader: loader$7
}, Symbol.toStringTag, { value: "Module" }));
async function loader$6({
  request,
  params
}) {
  const userIDH = request.headers.get("Cookie");
  const userId = await userIdCookie.parse(userIDH) || null;
  return {
    userId
  };
}
const action$3 = async ({
  request
}) => {
  const formData = await request.formData();
  const imageUrl = formData.get("imageUrl");
  const userID = formData.get("userId");
  const formPayload = new FormData();
  formPayload.append("userId", userID);
  formPayload.append("name", formData.get("name"));
  formPayload.append("color", formData.get("color"));
  formPayload.append("size", formData.get("size"));
  formPayload.append("price", formData.get("price"));
  if (imageUrl instanceof File) formPayload.append("productImageUrl", imageUrl);
  const cookieHeader = request.headers.get("Cookie");
  const token = await authCookie.parse(cookieHeader) || null;
  try {
    const response2 = await CreateMulti(formPayload, token, "product");
    if (response2.success) {
      return redirect(`/dashboard/product?message=${response2.message}&status=${response2.statusCode}`);
    } else {
      return redirect(`/dashboard/create_product?error=${response2.message}&status=${response2.statusCode}`);
    }
  } catch (error) {
    return redirect(`/dashboard/create_product?error=${error}`);
  }
};
const ProductItem = () => {
  const {
    userId
  } = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  navigation.state === "loading";
  const [searchParams, setSearchParams] = useSearchParams();
  searchParams.get("message");
  const statusCode = searchParams.get("status");
  const error = searchParams.get("error");
  return /* @__PURE__ */ jsxs("div", {
    className: "sm:w-[60%] w-[80%] m-auto max-sm:mt-5",
    children: [/* @__PURE__ */ jsxs("div", {
      hidden: error ? false : true,
      className: "bg-red-600 rounded-md p-1 mt-2",
      children: [/* @__PURE__ */ jsx("h1", {
        children: statusCode
      }), /* @__PURE__ */ jsx("p", {
        children: error
      })]
    }), /* @__PURE__ */ jsxs(Form, {
      method: "post",
      encType: "multipart/form-data",
      children: [/* @__PURE__ */ jsx(Input, {
        hidden: true,
        name: "userId",
        type: "text",
        value: userId
      }), /* @__PURE__ */ jsxs("div", {
        className: "sm:p-10",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-2xl",
          children: "Create Product"
        }), /* @__PURE__ */ jsxs("div", {
          className: "mt-6",
          children: [/* @__PURE__ */ jsx(Label, {
            children: "Product Name"
          }), /* @__PURE__ */ jsx(Input, {
            type: "text",
            name: "name"
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "mt-5",
          children: [/* @__PURE__ */ jsx(Label, {
            children: "Product Color"
          }), /* @__PURE__ */ jsx(Input, {
            type: "text",
            name: "color"
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "mt-5",
          children: [/* @__PURE__ */ jsx(Label, {
            children: "Product Size"
          }), /* @__PURE__ */ jsx(Input, {
            type: "text",
            name: "size"
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "mt-5",
          children: [/* @__PURE__ */ jsx(Label, {
            children: "Product Price"
          }), /* @__PURE__ */ jsx(Input, {
            type: "text",
            name: "price"
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "mt-5",
          children: [/* @__PURE__ */ jsx(Label, {
            children: "Product Image"
          }), /* @__PURE__ */ jsx(Input, {
            type: "file",
            name: "imageUrl",
            inputClassName: "cursor-pointer"
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "mt-5 flex gap-3",
          children: [/* @__PURE__ */ jsxs(Button, {
            className: "w-full",
            children: [" ", isSubmitting ? "Creating..." : "Create"]
          }), /* @__PURE__ */ jsx(Link, {
            to: "/dashboard/product",
            className: "w-full flex items-center justify-center border-1 rounded-md hover:border-red-700",
            children: "Cancel"
          })]
        })]
      })]
    })]
  });
};
const product_item_create = withComponentProps(ProductItem);
const ErrorBoundary$6 = withErrorBoundaryProps(function ErrorBoundary27({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: "Something went wrong!"
    })]
  });
});
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$6,
  action: action$3,
  default: product_item_create,
  loader: loader$6
}, Symbol.toStringTag, { value: "Module" }));
const columns$1 = [
  {
    key: "orderNumber",
    label: "Order Number",
    render: (val) => /* @__PURE__ */ jsx("span", { className: "font-semibold", children: val })
  },
  {
    key: "product.name",
    label: "Product Name",
    render: (val) => /* @__PURE__ */ jsx("span", { className: "font-semibold", children: val })
  },
  {
    key: "productSize",
    label: "Product Size",
    render: (val) => /* @__PURE__ */ jsx("span", { className: "font-semibold", children: val })
  },
  {
    key: "productColor",
    label: "Product Color",
    render: (val) => /* @__PURE__ */ jsx("span", { className: "font-semibold", children: val })
  },
  {
    key: "quantity",
    label: "Product Quantity",
    render: (val) => /* @__PURE__ */ jsx("span", { className: "font-semibold", children: val })
  },
  {
    key: "totalPrice",
    label: "Total Price",
    render: (val) => {
      const amount = parseFloat(val);
      const formatted = new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: "BDT"
      }).format(amount);
      return /* @__PURE__ */ jsx("span", { className: "text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded", children: formatted });
    }
  },
  {
    key: "firstName",
    label: "Customer Name"
  },
  {
    key: "comment",
    label: "Customer Comment"
  },
  {
    key: "phoneNumber",
    label: "Customer Phone"
  },
  {
    key: "email",
    label: "Customer Email"
  },
  {
    key: "address",
    label: "Customer Address"
  },
  {
    key: "deliveryMethod",
    label: "Delivery Method"
  },
  {
    key: "deliveryStatus",
    label: "Delivery Status",
    render: (val) => {
      return /* @__PURE__ */ jsx(
        "span",
        {
          className: `font-semibold ${{
            Completed: "text-green-500",
            Failed: "text-red-500",
            "In Process": "text-yellow-500",
            Cancelled: "text-red-500"
          }[val] || ""}`,
          children: val
        }
      );
    }
  },
  {
    key: "paymentMethod",
    label: "Payment Method"
  },
  {
    key: "paymentStatus",
    label: "Payment Status"
  }
];
const loader$5 = async ({
  request
}) => {
  const cookieHeader = request.headers.get("Cookie");
  const token = await authCookie.parse(cookieHeader) || null;
  const userIDH = request.headers.get("Cookie");
  const userRoleHe = request.headers.get("Cookie");
  const userRole = await userRoleCookie.parse(userRoleHe) || null;
  const userId = await userIdCookie.parse(userIDH) || null;
  const res = await GetAll(token, "order", userRole == "user" ? userId : "all");
  const order2 = res == null ? void 0 : res.results;
  return {
    order: order2
  };
};
const OrderCom = () => {
  const {
    order: order2
  } = useLoaderData();
  console.log("w", order2);
  const navigate = useNavigate();
  useFetcher();
  const handleStatusUpdate = (id) => {
    navigate(`/dashboard/update_delivery_status/${id}`);
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "p-10",
    children: [/* @__PURE__ */ jsx("div", {
      className: "flex justify-between mb-5 text-2xl p-1",
      children: /* @__PURE__ */ jsx("h1", {
        children: "Order List"
      })
    }), /* @__PURE__ */ jsx(Table, {
      columns: columns$1,
      rows: order2,
      show: "order",
      handleUpdate: handleStatusUpdate,
      hideDeleteBtn: true,
      updateBtnText: "Update Status"
    })]
  });
};
const order = withComponentProps(OrderCom);
const ErrorBoundary$5 = withErrorBoundaryProps(function ErrorBoundary28({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: "Something went wrong!"
    })]
  });
});
const route11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$5,
  default: order,
  loader: loader$5
}, Symbol.toStringTag, { value: "Module" }));
const loader$4 = async ({
  request,
  params
}) => {
  const cookieHeader = request.headers.get("Cookie");
  const token = await authCookie.parse(cookieHeader) || null;
  const {
    orderId
  } = params;
  const res = await Get(Number(orderId), token, "order");
  return {
    orders: res.results
  };
};
const action$2 = async ({
  request
}) => {
  const cookieHeader = request.headers.get("Cookie");
  const token = await authCookie.parse(cookieHeader) || null;
  const formData = await request.formData();
  const orderId = formData.get("orderId");
  const formPayload = new FormData();
  formPayload.append("id", orderId);
  formPayload.append("status", formData.get("deliveryStatus"));
  try {
    const res = await UpdateDeliveryStatus(formPayload, token);
    console.log(res);
    if (res.success) {
      return redirect(`/dashboard/order`);
    }
  } catch (error) {
    return redirect(`/dashboard/update_delivery_status/${orderId}?error=${error}`);
  }
};
const UpdateOrderStatus = () => {
  const {
    orders
  } = useLoaderData();
  console.log("d", orders);
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";
  const [searchParams, setSearchParams] = useSearchParams();
  searchParams.get("message");
  const statusCode = searchParams.get("status");
  const error = searchParams.get("error");
  return /* @__PURE__ */ jsxs("div", {
    className: "sm:w-[60%] w-[80%] m-auto max-sm:mt-5 ",
    children: [/* @__PURE__ */ jsxs("div", {
      hidden: error ? false : true,
      className: "bg-red-600 rounded-md p-1 mt-2",
      children: [/* @__PURE__ */ jsx("h1", {
        children: statusCode
      }), /* @__PURE__ */ jsx("p", {
        children: error
      })]
    }), /* @__PURE__ */ jsxs(Form, {
      method: "post",
      children: [/* @__PURE__ */ jsx(Input, {
        hidden: true,
        name: "orderId",
        type: "text",
        value: orders.id
      }), /* @__PURE__ */ jsxs("div", {
        className: "sm:p-10",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-2xl",
          children: "Update Delivery Status"
        }), /* @__PURE__ */ jsxs("div", {
          className: "mt-6",
          children: [/* @__PURE__ */ jsx(Label, {
            children: "Delivery Status"
          }), /* @__PURE__ */ jsxs("select", {
            name: "deliveryStatus",
            className: "border-1 border-gray-400 w-full rounded-md p-3",
            defaultValue: orders.deliveryStatus,
            children: [/* @__PURE__ */ jsx("option", {
              value: "In Process",
              children: "In Process"
            }), /* @__PURE__ */ jsx("option", {
              value: "Completed",
              children: "Completed"
            }), /* @__PURE__ */ jsx("option", {
              value: "Failed",
              children: "Failed"
            }), /* @__PURE__ */ jsx("option", {
              value: "Cancelled",
              children: "Cancelled"
            })]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "mt-5 flex gap-3",
          children: [/* @__PURE__ */ jsxs(Button, {
            className: "w-full",
            children: [" ", isLoading ? "Updating..." : "Update"]
          }), /* @__PURE__ */ jsx(Link, {
            to: "/dashboard/order",
            className: "w-full flex items-center justify-center border-1 rounded-md hover:border-red-700",
            children: "Cancel"
          })]
        })]
      })]
    })]
  });
};
const update_delivery_status = withComponentProps(UpdateOrderStatus);
const ErrorBoundary$4 = withErrorBoundaryProps(function ErrorBoundary29({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: "Something went wrong!"
    })]
  });
});
const route12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$4,
  action: action$2,
  default: update_delivery_status,
  loader: loader$4
}, Symbol.toStringTag, { value: "Module" }));
const columns = [
  {
    key: "name",
    label: "Name",
    render: (val) => /* @__PURE__ */ jsx("span", { className: "font-semibold", children: val })
  },
  {
    key: "email",
    label: "Email"
  },
  {
    key: "role",
    label: "Role",
    render: (val) => /* @__PURE__ */ jsx("span", { className: "text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded", children: val })
  }
];
const rows = [{
  name: "Jane Doe",
  email: "jane@example.com",
  role: "Admin"
}, {
  name: "John Smith",
  email: "john@example.com",
  role: "User"
}, {
  name: "Sarah Lee",
  email: "sarah@example.com",
  role: "Manager"
}, {
  name: "Tom Hardy",
  email: "tom@example.com",
  role: "User"
}, {
  name: "Anna Kim",
  email: "anna@example.com",
  role: "Admin"
}, {
  name: "Leo Grant",
  email: "leo@example.com",
  role: "Manager"
}];
const Payment = () => {
  return /* @__PURE__ */ jsxs("div", {
    className: "p-10",
    children: [/* @__PURE__ */ jsx("div", {
      className: "mb-5 text-2xl p-1",
      children: /* @__PURE__ */ jsx("h1", {
        children: "Payment List"
      })
    }), /* @__PURE__ */ jsx(Table, {
      columns,
      rows,
      show: "payment"
    })]
  });
};
const payment = withComponentProps(Payment);
const ErrorBoundary$3 = withErrorBoundaryProps(function ErrorBoundary210({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: "Something went wrong!"
    })]
  });
});
const route13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$3,
  default: payment
}, Symbol.toStringTag, { value: "Module" }));
function meta({}) {
  return [{
    title: "Landing Page | Login"
  }, {
    name: "description",
    content: "Welcome to landign page login"
  }];
}
async function loader$3({
  request
}) {
  const cookieHeader = request.headers.get("Cookie");
  const token = await authCookie.parse(cookieHeader) || null;
  if (token !== null) {
    return redirect("/dashboard");
  }
  return {
    token
  };
}
async function action$1({
  request
}) {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");
  const res = await LoginReq(username, password);
  try {
    if (res == null ? void 0 : res.success) {
      return redirect(`/dashboard?message=${res == null ? void 0 : res.message}&status=${res == null ? void 0 : res.statusCode}`, {
        headers: {
          "Set-Cookie": [await authCookie.serialize(res == null ? void 0 : res.results.token), await userIdCookie.serialize(res == null ? void 0 : res.results.id), await userRoleCookie.serialize(res == null ? void 0 : res.results.role)].join(", ")
        }
      });
    } else {
      return redirect(`/login?message=${res == null ? void 0 : res.message}&status=${res == null ? void 0 : res.statusCode}`);
    }
  } catch (error) {
    return redirect(`/login?error=${error}`);
  }
}
const Login = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";
  const [open, setOpen] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const statusCode = searchParams.get("status");
  const error = searchParams.get("error");
  useEffect(() => {
    if (error || statusCode === void 0) {
      setOpen(false);
    }
  }, [error]);
  const handleClick = () => {
    setOpen(!open);
    setSearchParams({});
  };
  return /* @__PURE__ */ jsxs("div", {
    className: " flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8",
    children: [/* @__PURE__ */ jsx(Notification, {
      open,
      statusCode: statusCode || void 0,
      error: error || void 0,
      handleClick
    }), /* @__PURE__ */ jsxs("div", {
      className: "sm:mx-auto sm:w-full sm:max-w-sm",
      children: [/* @__PURE__ */ jsx("img", {
        alt: "Your Company",
        src: "/favicon.ico",
        className: "mx-auto h-20 w-auto"
      }), /* @__PURE__ */ jsx("h2", {
        className: "mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-gray-100",
        children: "Login into your account"
      })]
    }), /* @__PURE__ */ jsx("div", {
      className: "mt-10 sm:mx-auto sm:w-full sm:max-w-sm",
      children: /* @__PURE__ */ jsxs(Form, {
        method: "POST",
        className: "space-y-6",
        children: [/* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("label", {
            htmlFor: "username",
            className: "block text-sm/6 font-medium text-gray-900 dark:text-gray-100",
            children: "User Name"
          }), /* @__PURE__ */ jsx("div", {
            className: "mt-2",
            children: /* @__PURE__ */ jsx("input", {
              id: "username",
              name: "username",
              type: "text",
              required: true,
              autoComplete: "username",
              className: "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900  outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            })
          })]
        }), /* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("div", {
            className: "flex items-center justify-between",
            children: /* @__PURE__ */ jsx("label", {
              htmlFor: "password",
              className: "block text-sm/6 font-medium text-gray-900 dark:text-gray-100",
              children: "Password"
            })
          }), /* @__PURE__ */ jsx("div", {
            className: "mt-2",
            children: /* @__PURE__ */ jsx("input", {
              id: "password",
              name: "password",
              type: "password",
              required: true,
              autoComplete: "current-password",
              className: "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            })
          })]
        }), /* @__PURE__ */ jsx("div", {
          children: /* @__PURE__ */ jsx("button", {
            type: "submit",
            className: "flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
            disabled: isLoading,
            children: isLoading ? "Loading..." : "Login"
          })
        })]
      })
    })]
  });
};
const login = withComponentProps(Login);
const route14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$1,
  default: login,
  loader: loader$3,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const loader$2 = async ({
  request
}) => {
  const url = new URL(request.url);
  const totalAmount = url.searchParams.get("total");
  return {
    totalAmount
  };
};
const action = async ({
  request
}) => {
  const formData = await request.formData();
  const res = await GetBkashGrantToken();
  if ((res == null ? void 0 : res.statusMessage) === "Successful") {
    console.log("bToken", res);
    const cookie = await bkashToken.serialize(res.id_token);
    const formPayload = {
      amount: formData.get("total"),
      token: res.id_token
      // <-- Insert your token here
    };
    const createPay = await CreateBkashPayment(formPayload);
    if ((createPay == null ? void 0 : createPay.statusMessage) === "Successful") {
      console.log("createBkash", createPay);
      return redirect(createPay.bkashURL, {
        headers: {
          "Set-Cookie": cookie
          // Send the cookie to the browser
        }
      });
    }
  }
  return "";
};
const BkashPayment = () => {
  const {
    totalAmount
  } = useLoaderData();
  const amount = parseFloat(totalAmount || "");
  const formatted = new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT"
  }).format(amount);
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";
  return /* @__PURE__ */ jsx("main", {
    className: "min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900",
    children: /* @__PURE__ */ jsxs(Form, {
      method: "post",
      children: [/* @__PURE__ */ jsx("input", {
        id: "total",
        name: "total",
        hidden: true,
        value: Number(totalAmount)
      }), /* @__PURE__ */ jsxs("div", {
        className: "bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-10 max-w-lg w-full text-center",
        children: [/* @__PURE__ */ jsx("img", {
          src: "/BKash.png",
          className: " bg-gray-200 rounded-lg mx-auto mb-4"
        }), /* @__PURE__ */ jsx("span", {
          className: "text-center text-red-600",
          children: formatted
        }), /* @__PURE__ */ jsx("h1", {
          className: "text-2xl font-bold text-gray-900 dark:text-white mb-2",
          children: "Pay With Bkash."
        }), /* @__PURE__ */ jsx("button", {
          disabled: isLoading,
          type: "submit",
          className: "inline-block bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition cursor-pointer",
          children: isLoading ? "Loading..." : "Pay now"
        })]
      })]
    })
  });
};
const bkashPayment = withComponentProps(BkashPayment);
const ErrorBoundary$2 = withErrorBoundaryProps(function ErrorBoundary211({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: "Something went wrong!"
    })]
  });
});
const route15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$2,
  action,
  default: bkashPayment,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
const loader$1 = async ({
  request
}) => {
  const cookieHeader = request.headers.get("Cookie");
  const token = await bkashToken.parse(cookieHeader) || null;
  const url = new URL(request.url);
  const paymentID = url.searchParams.get("paymentID");
  const status = url.searchParams.get("status");
  const signature = url.searchParams.get("signature");
  const formPayload = {
    paymentID,
    token
    // <-- Insert your token here
  };
  if (status === "success") {
    const res = await ExecuteBkashPayment(formPayload);
    console.log("ex", res);
  }
  return {
    paymentID,
    status,
    signature
  };
};
const paymentSuccess = withComponentProps(function PaymentSuccess() {
  const {
    paymentID,
    status,
    signature
  } = useLoaderData();
  return /* @__PURE__ */ jsx("main", {
    className: "min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900",
    children: /* @__PURE__ */ jsxs("div", {
      className: "bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-10 max-w-lg w-full text-center",
      children: [status === "success" ? /* @__PURE__ */ jsx(CheckCircleIcon, {
        className: "w-20 h-20 text-green-500 mx-auto mb-4"
      }) : "", status === "failure" ? /* @__PURE__ */ jsx(XCircleIcon, {
        className: "w-20 h-20 text-red-500 mx-auto mb-4"
      }) : "", status === "cancel" ? /* @__PURE__ */ jsx(CheckCircleIcon, {
        className: "w-20 h-20 text-red-500 mx-auto mb-4"
      }) : "", /* @__PURE__ */ jsxs("h1", {
        className: "text-2xl font-bold text-gray-900 dark:text-white mb-2",
        children: ["Payment ", status, "!"]
      }), /* @__PURE__ */ jsxs("p", {
        className: "text-gray-600 dark:text-gray-300 mb-6",
        children: ["Payment Id: ", paymentID]
      }), /* @__PURE__ */ jsxs("p", {
        className: "text-gray-600 dark:text-gray-300 mb-6",
        children: ["Payment signature: ", signature]
      }), /* @__PURE__ */ jsx(Link, {
        to: "/",
        className: "inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full transition",
        children: "Go to Home"
      })]
    })
  });
});
const ErrorBoundary$1 = withErrorBoundaryProps(function ErrorBoundary212({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: "Something went wrong!"
    })]
  });
});
const route16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$1,
  default: paymentSuccess,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
const loader = async ({
  request
}) => {
  const url = new URL(request.url);
  const success = url.searchParams.get("success");
  const message = url.searchParams.get("message");
  const status = url.searchParams.get("status");
  const paymentMethod = url.searchParams.get("paymentMethod");
  const orderNumber = url.searchParams.get("orderNumber");
  const error = url.searchParams.get("error");
  return {
    success,
    status,
    message,
    orderNumber,
    paymentMethod,
    error
  };
};
const Success = () => {
  const {
    success,
    status,
    message,
    orderNumber,
    paymentMethod,
    error
  } = useLoaderData();
  return /* @__PURE__ */ jsx("main", {
    className: "min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900",
    children: /* @__PURE__ */ jsxs("div", {
      className: "bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-10 max-w-lg w-full text-center",
      children: [success === "true" ? /* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx(CheckCircleIcon, {
          className: "w-20 h-20 text-green-500 mx-auto mb-4"
        }), /* @__PURE__ */ jsx("h1", {
          className: "text-2xl font-bold text-gray-900 dark:text-white mb-2",
          children: message
        }), /* @__PURE__ */ jsxs("p", {
          className: "text-gray-600 dark:text-gray-300 mb-2",
          children: ["Order Number:", " ", /* @__PURE__ */ jsx("span", {
            className: "text-green-500",
            children: orderNumber
          })]
        }), /* @__PURE__ */ jsxs("p", {
          className: "text-gray-600 dark:text-gray-300 mb-6",
          children: [/* @__PURE__ */ jsx("span", {
            className: "text-green-500",
            children: paymentMethod === "bkash" ? /* @__PURE__ */ jsx("span", {
              className: "text-red-500",
              children: "Pay now or your order will cancel."
            }) : /* @__PURE__ */ jsx("span", {
              children: "Thank you for trust us"
            })
          }), " "]
        }), /* @__PURE__ */ jsxs("p", {
          className: "text-gray-600 dark:text-gray-300 mb-6",
          children: ["Payment Method:", " ", /* @__PURE__ */ jsx("span", {
            className: "text-green-500",
            children: paymentMethod == null ? void 0 : paymentMethod.toUpperCase()
          }), " ", "☞", " ", paymentMethod === "bkash" ? /* @__PURE__ */ jsx(Link, {
            className: "border-none bg-red-500 p-1.5 rounded-md text-sm",
            to: `/bkash-payment?total=${20}`,
            children: "Pay now"
          }) : ""]
        })]
      }) : /* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx(XCircleIcon, {
          className: "w-20 h-20 text-red-500 mx-auto mb-4"
        }), /* @__PURE__ */ jsx("h1", {
          className: "text-2xl font-bold text-gray-900 dark:text-white mb-2",
          children: error
        })]
      }), /* @__PURE__ */ jsx(Link, {
        to: "/",
        className: "inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full transition",
        children: "Go to Home"
      })]
    })
  });
};
const response = withComponentProps(Success);
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary213({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: "Something went wrong!"
    })]
  });
});
const route17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  default: response,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-CCJAos1w.js", "imports": ["/assets/chunk-LSOULM7L-C1R3u2BY.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-CEReA8oT.js", "imports": ["/assets/chunk-LSOULM7L-C1R3u2BY.js", "/assets/with-props-gZE1CkT6.js"], "css": ["/assets/root-9t-ING9d.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": "checkout/:productId", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/home-CKtKKhrO.js", "imports": ["/assets/with-props-gZE1CkT6.js", "/assets/chunk-LSOULM7L-C1R3u2BY.js", "/assets/input-D80yJxZR.js", "/assets/text-area-f64noj3q.js", "/assets/button-DmsZFn-V.js", "/assets/data-hukx3rJh.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/dashboard/dashboard": { "id": "routes/dashboard/dashboard", "parentId": "root", "path": "dashboard", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/dashboard-C8x0e7Bn.js", "imports": ["/assets/with-props-gZE1CkT6.js", "/assets/chunk-LSOULM7L-C1R3u2BY.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/dashboard/index": { "id": "routes/dashboard/index", "parentId": "routes/dashboard/dashboard", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/index-D-KtaaVc.js", "imports": ["/assets/with-props-gZE1CkT6.js", "/assets/chunk-LSOULM7L-C1R3u2BY.js", "/assets/button-DmsZFn-V.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/dashboard/update-userinfo": { "id": "routes/dashboard/update-userinfo", "parentId": "routes/dashboard/dashboard", "path": "update-userinfo", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/update-userinfo-CkJTNVbw.js", "imports": ["/assets/with-props-gZE1CkT6.js", "/assets/chunk-LSOULM7L-C1R3u2BY.js", "/assets/button-DmsZFn-V.js", "/assets/text-area-f64noj3q.js", "/assets/input-D80yJxZR.js", "/assets/notification-BmqfVPAH.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/dashboard/user": { "id": "routes/dashboard/user", "parentId": "routes/dashboard/dashboard", "path": "user", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/user-C1OZoajR.js", "imports": ["/assets/with-props-gZE1CkT6.js", "/assets/chunk-LSOULM7L-C1R3u2BY.js", "/assets/button-DmsZFn-V.js", "/assets/table-ClCQzlU3.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/dashboard/user-registration": { "id": "routes/dashboard/user-registration", "parentId": "routes/dashboard/dashboard", "path": "user-registration", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/user-registration-DuGIv0pa.js", "imports": ["/assets/with-props-gZE1CkT6.js", "/assets/chunk-LSOULM7L-C1R3u2BY.js", "/assets/button-DmsZFn-V.js", "/assets/text-area-f64noj3q.js", "/assets/input-D80yJxZR.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/dashboard/update-user-status": { "id": "routes/dashboard/update-user-status", "parentId": "routes/dashboard/dashboard", "path": "update-user-status/:userId", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/update-user-status-BSeREb37.js", "imports": ["/assets/with-props-gZE1CkT6.js", "/assets/chunk-LSOULM7L-C1R3u2BY.js", "/assets/data-hukx3rJh.js", "/assets/button-DmsZFn-V.js", "/assets/input-D80yJxZR.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/products/product": { "id": "routes/products/product", "parentId": "routes/dashboard/dashboard", "path": "product", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/product-CSyzS5u4.js", "imports": ["/assets/with-props-gZE1CkT6.js", "/assets/chunk-LSOULM7L-C1R3u2BY.js", "/assets/button-DmsZFn-V.js", "/assets/table-ClCQzlU3.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/products/product_item": { "id": "routes/products/product_item", "parentId": "routes/dashboard/dashboard", "path": "product_item/:productId", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/product_item-B0blrPbg.js", "imports": ["/assets/with-props-gZE1CkT6.js", "/assets/chunk-LSOULM7L-C1R3u2BY.js", "/assets/data-hukx3rJh.js", "/assets/input-D80yJxZR.js", "/assets/button-DmsZFn-V.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/products/product_item_create": { "id": "routes/products/product_item_create", "parentId": "routes/dashboard/dashboard", "path": "create_product", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/product_item_create-Bunm5H7o.js", "imports": ["/assets/with-props-gZE1CkT6.js", "/assets/chunk-LSOULM7L-C1R3u2BY.js", "/assets/input-D80yJxZR.js", "/assets/button-DmsZFn-V.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/order": { "id": "routes/order", "parentId": "routes/dashboard/dashboard", "path": "order", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/order-BQ81bhH6.js", "imports": ["/assets/with-props-gZE1CkT6.js", "/assets/chunk-LSOULM7L-C1R3u2BY.js", "/assets/table-ClCQzlU3.js", "/assets/button-DmsZFn-V.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/update_delivery_status": { "id": "routes/update_delivery_status", "parentId": "routes/dashboard/dashboard", "path": "update_delivery_status/:orderId", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/update_delivery_status-Dpu6OYzH.js", "imports": ["/assets/with-props-gZE1CkT6.js", "/assets/chunk-LSOULM7L-C1R3u2BY.js", "/assets/input-D80yJxZR.js", "/assets/button-DmsZFn-V.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/payment": { "id": "routes/payment", "parentId": "routes/dashboard/dashboard", "path": "payment", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/payment-Be2fSInL.js", "imports": ["/assets/with-props-gZE1CkT6.js", "/assets/chunk-LSOULM7L-C1R3u2BY.js", "/assets/table-ClCQzlU3.js", "/assets/button-DmsZFn-V.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/auth/login": { "id": "routes/auth/login", "parentId": "root", "path": "login", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/login-RLsbzwRV.js", "imports": ["/assets/with-props-gZE1CkT6.js", "/assets/chunk-LSOULM7L-C1R3u2BY.js", "/assets/notification-BmqfVPAH.js", "/assets/button-DmsZFn-V.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/bkash-payment": { "id": "routes/bkash-payment", "parentId": "root", "path": "bkash-payment", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/bkash-payment-6IZmCubQ.js", "imports": ["/assets/with-props-gZE1CkT6.js", "/assets/chunk-LSOULM7L-C1R3u2BY.js", "/assets/data-hukx3rJh.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/payment-success": { "id": "routes/payment-success", "parentId": "root", "path": "payment-success", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/payment-success-B6rJkF7t.js", "imports": ["/assets/with-props-gZE1CkT6.js", "/assets/chunk-LSOULM7L-C1R3u2BY.js", "/assets/XCircleIcon-B6wH-aCH.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/response": { "id": "routes/response", "parentId": "root", "path": "response", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/response-BoGuN5t-.js", "imports": ["/assets/with-props-gZE1CkT6.js", "/assets/chunk-LSOULM7L-C1R3u2BY.js", "/assets/XCircleIcon-B6wH-aCH.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-6b33d757.js", "version": "6b33d757", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: "checkout/:productId",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/dashboard/dashboard": {
    id: "routes/dashboard/dashboard",
    parentId: "root",
    path: "dashboard",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/dashboard/index": {
    id: "routes/dashboard/index",
    parentId: "routes/dashboard/dashboard",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route3
  },
  "routes/dashboard/update-userinfo": {
    id: "routes/dashboard/update-userinfo",
    parentId: "routes/dashboard/dashboard",
    path: "update-userinfo",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/dashboard/user": {
    id: "routes/dashboard/user",
    parentId: "routes/dashboard/dashboard",
    path: "user",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/dashboard/user-registration": {
    id: "routes/dashboard/user-registration",
    parentId: "routes/dashboard/dashboard",
    path: "user-registration",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/dashboard/update-user-status": {
    id: "routes/dashboard/update-user-status",
    parentId: "routes/dashboard/dashboard",
    path: "update-user-status/:userId",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/products/product": {
    id: "routes/products/product",
    parentId: "routes/dashboard/dashboard",
    path: "product",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/products/product_item": {
    id: "routes/products/product_item",
    parentId: "routes/dashboard/dashboard",
    path: "product_item/:productId",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "routes/products/product_item_create": {
    id: "routes/products/product_item_create",
    parentId: "routes/dashboard/dashboard",
    path: "create_product",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  },
  "routes/order": {
    id: "routes/order",
    parentId: "routes/dashboard/dashboard",
    path: "order",
    index: void 0,
    caseSensitive: void 0,
    module: route11
  },
  "routes/update_delivery_status": {
    id: "routes/update_delivery_status",
    parentId: "routes/dashboard/dashboard",
    path: "update_delivery_status/:orderId",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  },
  "routes/payment": {
    id: "routes/payment",
    parentId: "routes/dashboard/dashboard",
    path: "payment",
    index: void 0,
    caseSensitive: void 0,
    module: route13
  },
  "routes/auth/login": {
    id: "routes/auth/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: route14
  },
  "routes/bkash-payment": {
    id: "routes/bkash-payment",
    parentId: "root",
    path: "bkash-payment",
    index: void 0,
    caseSensitive: void 0,
    module: route15
  },
  "routes/payment-success": {
    id: "routes/payment-success",
    parentId: "root",
    path: "payment-success",
    index: void 0,
    caseSensitive: void 0,
    module: route16
  },
  "routes/response": {
    id: "routes/response",
    parentId: "root",
    path: "response",
    index: void 0,
    caseSensitive: void 0,
    module: route17
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routes,
  ssr
};
