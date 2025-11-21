import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { c as createSsrRpc, a as Route } from "./router-CUTPFSxq.js";
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
const loginFn_createServerFn_handler = createSsrRpc("2ef30eddd7c47d0d46d82843c1ce6b06a43ca54037008a0dc3fc159705fc12a8");
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
function RouteComponent() {
  const navigate = Route.useNavigate();
  const loginMutation = useMutation({
    mutationFn: loginFn,
    onSuccess: (data) => {
      if (!data?.error) {
        navigate({
          to: "/"
        });
        return;
      }
    },
    onError: (error) => {
      console.error("Login error:", error);
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
      loginMutation.mutate({
        data: value
      });
      console.log("submitted values:", value);
    }
  });
  return /* @__PURE__ */ jsx("div", { className: " flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md w-full space-y-4 p-6 border rounded-lg", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-center", children: "Login" }),
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
    /* @__PURE__ */ jsx(Subscribe, { selector: (state2) => [state2.canSubmit, state2.isTouched], children: ([isValid, isTouched]) => /* @__PURE__ */ jsx("button", { onClick: handleSubmit, disabled: loginMutation.isPending || !isValid || !isTouched, className: "w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed", children: loginMutation.isPending ? "Logging in..." : "Login" }) }),
    loginMutation.data?.error && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "text-red-500 mt-4", children: loginMutation.data.message }),
      loginMutation.data.userNotFound && /* @__PURE__ */ jsx(Link, { to: "/signup", color: "blue", children: "Sign Up instead" })
    ] })
  ] }) });
}
export {
  RouteComponent as component
};
