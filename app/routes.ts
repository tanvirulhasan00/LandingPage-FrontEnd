import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // route("home", "./routes/home.tsx", [index("routes/home.tsx")]),
  route("checkout/:productId", "routes/home.tsx"),
  route("dashboard", "./routes/dashboard/dashboard.tsx", [
    index("routes/dashboard/index.tsx"),
    route("update-userinfo", "routes/dashboard/update-userinfo.tsx"),
    route("user", "routes/dashboard/user.tsx"),
    route("user-registration", "routes/dashboard/user-registration.tsx"),
    route(
      "update-user-status/:userId",
      "routes/dashboard/update-user-status.tsx"
    ),
    route("product", "routes/products/product.tsx"),
    route("product_item/:productId", "routes/products/product_item.tsx"),
    route("order", "routes/order.tsx"),
    route(
      "update_delivery_status/:orderId",
      "routes/update_delivery_status.tsx"
    ),
    route("payment", "routes/payment.tsx"),
  ]),
  route("login", "routes/auth/login.tsx"),
  route("bkash-payment", "routes/bkash-payment.tsx"),
  route("payment-success", "routes/payment-success.tsx"),
  route("response", "routes/response.tsx"),
  // route("error", "routes/error.tsx"),
] satisfies RouteConfig;
