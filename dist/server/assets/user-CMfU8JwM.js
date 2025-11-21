import { a as createServerRpc, c as createServerFn } from "../server.js";
import { u as useAppSession } from "./session-CRRQK3Ha.js";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core";
import "node:async_hooks";
import "@tanstack/router-core/ssr/server";
import "h3-v2";
import "tiny-invariant";
import "seroval";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
import "@tanstack/react-router";
const fetchUser_createServerFn_handler = createServerRpc("4dd14be03b6a3bc889697fce696b6760308355fb014129c843bc0126b915798a", (opts, signal) => {
  return fetchUser.__executeServer(opts, signal);
});
const fetchUser = createServerFn({
  method: "GET"
}).handler(fetchUser_createServerFn_handler, async () => {
  const session = await useAppSession();
  if (!session.data.userEmail) {
    return null;
  }
  return {
    email: session.data.userEmail
  };
});
export {
  fetchUser_createServerFn_handler
};
