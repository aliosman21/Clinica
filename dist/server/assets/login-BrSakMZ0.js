import { a as createServerRpc, c as createServerFn } from "../server.js";
import { h as hashPassword } from "./password-DeI-Yahi.js";
import { p as prismaClient } from "./prisma-DiAJCEci.js";
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
import "node:crypto";
import "@prisma/client";
const loginFn_createServerFn_handler = createServerRpc("2ef30eddd7c47d0d46d82843c1ce6b06a43ca54037008a0dc3fc159705fc12a8", (opts, signal) => {
  return loginFn.__executeServer(opts, signal);
});
const loginFn = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(loginFn_createServerFn_handler, async ({
  data
}) => {
  const user = await prismaClient.user.findUnique({
    where: {
      email: data.email
    }
  });
  if (!user) {
    return {
      error: true,
      userNotFound: true,
      message: "User not found"
    };
  }
  const hashedPassword = await hashPassword(data.password);
  if (user.password !== hashedPassword) {
    return {
      error: true,
      message: "Incorrect password"
    };
  }
  const session = await useAppSession();
  await session.update({
    userEmail: user.email
  });
});
export {
  loginFn_createServerFn_handler
};
