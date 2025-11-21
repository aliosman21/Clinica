import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { redirect, Link } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { c as createSsrRpc, R as Route } from "./router-CUTPFSxq.js";
import { h as hashPassword } from "./password-DeI-Yahi.js";
import { p as prismaClient } from "./prisma-DiAJCEci.js";
import { u as useAppSession } from "./session-CRRQK3Ha.js";
import { c as createServerFn } from "../server.js";
import { useForm } from "@tanstack/react-form";
import { C as CustomTextInput } from "./CustomTextInput-BL_3-NLe.js";
import "@tanstack/react-router-devtools";
import "react";
import "lucide-react";
import "sonner";
import "./middleware-leKOZ4bV.js";
import "@tanstack/react-router-ssr-query";
import "node:crypto";
import "@prisma/client";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core";
import "node:async_hooks";
import "@tanstack/router-core/ssr/server";
import "h3-v2";
import "tiny-invariant";
import "seroval";
import "@tanstack/react-router/ssr/server";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
const signupFn_createServerFn_handler = createSsrRpc("297629842e2d65fb3b4d80b076ff308dd6d22bdba756791f6f74ccb618c756c6");
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
function RouteComponent() {
  const navigate = Route.useNavigate();
  const signupMutation = useMutation({
    mutationFn: signupFn,
    onSuccess: (data) => {
      if (!data?.error) {
        console.log("Signup successful", data);
        navigate({
          to: "/login"
        });
        return;
      }
    },
    onError: (error) => {
      console.error("Signup error:", error);
    }
  });
  const {
    Field,
    handleSubmit,
    state,
    Subscribe
  } = useForm({
    defaultValues: {
      email: "",
      password: ""
    },
    onSubmit: async ({
      value
    }) => {
      signupMutation.mutate({
        data: value
      });
      console.log("submitted values:", value);
    }
  });
  return /* @__PURE__ */ jsx("div", { className: " flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md w-full space-y-4 p-6 border rounded-lg", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-center", children: "Sign Up" }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Field, { name: "email", validators: {
        onChange: ({
          value
        }) => {
          if (!value) return "Email is required";
          if (!/\S+@\S+\.\S+/.test(value)) return "Please enter a valid email";
          return void 0;
        }
      }, children: (field) => /* @__PURE__ */ jsx(CustomTextInput, { field, label: "Email", placeholder: "Enter your email" }) }),
      /* @__PURE__ */ jsx(Field, { name: "password", validators: {
        onChange: ({
          value
        }) => {
          if (!value) return "Password is required";
          return void 0;
        }
      }, children: (field) => /* @__PURE__ */ jsx(CustomTextInput, { field, label: "Password", placeholder: "Enter your password", password: true }) })
    ] }),
    /* @__PURE__ */ jsx(Subscribe, { selector: (state2) => [state2.canSubmit, state2.isTouched], children: ([isValid, isTouched]) => /* @__PURE__ */ jsx("button", { onClick: handleSubmit, disabled: signupMutation.isPending || !isValid || !isTouched, className: "w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed", children: signupMutation.isPending ? "Signing up..." : "Sign Up" }) }),
    signupMutation.data?.error && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "text-red-500 mt-4", children: signupMutation.data.message }),
      signupMutation.data.userExists && /* @__PURE__ */ jsx(Link, { to: "/login", className: "text-blue-500", children: "Login instead" })
    ] })
  ] }) });
}
export {
  RouteComponent as component
};
