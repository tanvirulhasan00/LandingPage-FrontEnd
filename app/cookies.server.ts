import { createCookie } from "react-router"; // or cloudflare/deno

export const authCookie = createCookie("auth", {
  httpOnly: false,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24 * 7, // 1 week
});
export const bkashToken = createCookie("bkash", {
  httpOnly: false,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 10, // 10 minutes
});
export const userIdCookie = createCookie("userId", {
  httpOnly: false,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24 * 7, // 1 week
});
export const userRoleCookie = createCookie("userRole", {
  httpOnly: false,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24 * 7, // 1 week
});
