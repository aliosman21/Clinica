import { a as createServerRpc, c as createServerFn } from "../server.js";
import { redirect } from "@tanstack/react-router";
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
const logoutFn_createServerFn_handler = createServerRpc("f5bd48d1524c4f31fe78ff373daf8dada5107a3ac1afe0c8c75f9efa3e2dee99", (opts, signal) => {
  return logoutFn.__executeServer(opts, signal);
});
const logoutFn = createServerFn().handler(logoutFn_createServerFn_handler, async () => {
  const session = await useAppSession();
  session.clear();
  throw redirect({
    href: "/"
  });
});
export {
  logoutFn_createServerFn_handler
};
