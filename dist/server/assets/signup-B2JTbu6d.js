import { a as createServerRpc, c as createServerFn } from "../server.js";
import { redirect } from "@tanstack/react-router";
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
import "node:crypto";
import "@prisma/client";
const signupFn_createServerFn_handler = createServerRpc("297629842e2d65fb3b4d80b076ff308dd6d22bdba756791f6f74ccb618c756c6", (opts, signal) => {
  return signupFn.__executeServer(opts, signal);
});
const signupFn = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(signupFn_createServerFn_handler, async ({
  data
}) => {
  const found = await prismaClient.user.findUnique({
    where: {
      email: data.email
    }
  });
  const password = await hashPassword(data.password);
  const session = await useAppSession();
  if (found) {
    if (found.password !== password) {
      return {
        error: true,
        userExists: true,
        message: "User already exists"
      };
    }
    await session.update({
      userEmail: found.email
    });
    throw redirect({
      href: data.redirectUrl || "/"
    });
  }
  const user = await prismaClient.user.create({
    data: {
      email: data.email,
      password
    }
  });
  await session.update({
    userEmail: user.email
  });
  throw redirect({
    href: data.redirectUrl || "/"
  });
});
export {
  signupFn_createServerFn_handler
};
