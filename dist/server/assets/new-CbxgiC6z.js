import { jsxs, jsx } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { c as createSsrRpc, u as useServerFn } from "./router-CUTPFSxq.js";
import { useForm } from "@tanstack/react-form";
import { C as CustomTextInput } from "./CustomTextInput-BL_3-NLe.js";
import { B as Button } from "./button-DTJ7Hz9H.js";
import { p as prismaClient } from "./prisma-DiAJCEci.js";
import { a as authMiddleware } from "./middleware-leKOZ4bV.js";
import { c as createServerFn } from "../server.js";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import "@tanstack/react-router-devtools";
import "react";
import "./session-CRRQK3Ha.js";
import "@tanstack/react-router-ssr-query";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
import "@radix-ui/react-slot";
import "class-variance-authority";
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
const createPatient_createServerFn_handler = createSsrRpc("ef99fa68986f704a3b4faad8aa951c748224e97076d74f49ac79a6870214a0ef");
const createPatient = createServerFn({
  method: "POST"
}).middleware([authMiddleware]).inputValidator((data) => data).handler(createPatient_createServerFn_handler, async ({
  data
}) => {
  try {
    const patient = await prismaClient.patient.create({
      data: {
        name: data.name,
        dateOfBirth: new Date(data.dateOfBirth),
        email: data.email || null,
        phone: data.phone || null,
        address: data.address || null
      }
    });
    return patient;
  } catch (error) {
    throw new Error("Failed to create patient");
  }
});
function NewPatientPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const createPatientFn = useServerFn(createPatient);
  const createPatientMutation = useMutation({
    mutationFn: (data) => createPatientFn({
      data
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["patients"]
      });
      toast.success("Patient created successfully");
      navigate({
        to: "/patients"
      });
    },
    onError: (error) => {
      toast.error("Error creating patient: " + error.message);
    }
  });
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      address: ""
    },
    onSubmit: async ({
      value
    }) => {
      createPatientMutation.mutate(value);
    }
  });
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto py-4 space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center space-y-4", children: [
      /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "sm", onClick: () => navigate({
        to: "/patients"
      }), children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }),
        "Back to Patients"
      ] }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold", children: "Create New Patient" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Add a new patient to the system" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-card rounded-lg border p-6 space-y-4 max-w-4xl mx-auto", children: /* @__PURE__ */ jsxs("form", { onSubmit: (e) => {
      e.preventDefault();
      e.stopPropagation();
      form.handleSubmit();
    }, className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsx(form.Field, { name: "name", validators: {
          onChange: ({
            value
          }) => !value?.trim() ? "Name is required" : void 0
        }, children: (field) => /* @__PURE__ */ jsx(CustomTextInput, { field, label: "Full Name *", placeholder: "Enter patient's full name" }) }),
        /* @__PURE__ */ jsx(form.Field, { name: "dateOfBirth", validators: {
          onChange: ({
            value
          }) => {
            if (!value?.trim()) return "Date of birth is required";
            const date = new Date(value);
            if (isNaN(date.getTime())) return "Please enter a valid date";
            if (date > /* @__PURE__ */ new Date()) return "Date cannot be in the future";
            return void 0;
          }
        }, children: (field) => /* @__PURE__ */ jsx(CustomTextInput, { field, label: "Date of Birth *", placeholder: "YYYY-MM-DD", helperText: "Format: YYYY-MM-DD" }) }),
        /* @__PURE__ */ jsx(form.Field, { name: "email", validators: {
          onChange: ({
            value
          }) => {
            if (value && value.trim()) {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(value)) return "Please enter a valid email";
            }
            return void 0;
          }
        }, children: (field) => /* @__PURE__ */ jsx(CustomTextInput, { field, label: "Email", placeholder: "patient@example.com" }) }),
        /* @__PURE__ */ jsx(form.Field, { name: "phone", children: (field) => /* @__PURE__ */ jsx(CustomTextInput, { field, label: "Phone", placeholder: "+1 (555) 123-4567" }) })
      ] }),
      /* @__PURE__ */ jsx(form.Field, { name: "address", children: (field) => /* @__PURE__ */ jsx(CustomTextInput, { field, label: "Address", placeholder: "Enter patient's address", multiline: true, rows: 3 }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-end space-x-2", children: [
        /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", onClick: () => navigate({
          to: "/patients"
        }), disabled: createPatientMutation.isPending, children: "Cancel" }),
        /* @__PURE__ */ jsxs(Button, { type: "submit", disabled: createPatientMutation.isPending, children: [
          createPatientMutation.isPending ? /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" }) : null,
          "Create Patient"
        ] })
      ] })
    ] }) })
  ] });
}
export {
  NewPatientPage as component
};
