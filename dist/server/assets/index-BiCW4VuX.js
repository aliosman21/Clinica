import { jsxs, jsx } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { B as Button } from "./button-DTJ7Hz9H.js";
import { B as Badge } from "./badge-C5jHjo0s.js";
import { ArrowLeft, Edit, Calendar, Mail, Phone, MapPin, FileText, DollarSign, Clock, Eye, Activity } from "lucide-react";
import { d as Route } from "./router-CUTPFSxq.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@tanstack/react-router-devtools";
import "react";
import "../server.js";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core";
import "node:async_hooks";
import "@tanstack/router-core/ssr/server";
import "h3-v2";
import "tiny-invariant";
import "seroval";
import "@tanstack/react-router/ssr/server";
import "./session-CRRQK3Ha.js";
import "sonner";
import "./prisma-DiAJCEci.js";
import "@prisma/client";
import "./middleware-leKOZ4bV.js";
import "@tanstack/react-router-ssr-query";
import "@tanstack/react-query";
function PatientDetailsPage() {
  const navigate = useNavigate();
  const patient = Route.useLoaderData();
  const {
    patientId
  } = Route.useParams();
  const formatDate = (date) => {
    if (!date) return "Not provided";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };
  const calculateAge = (birthDate) => {
    if (!birthDate) return "Unknown";
    const today = /* @__PURE__ */ new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || monthDiff === 0 && today.getDate() < birth.getDate()) {
      age--;
    }
    return age;
  };
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(amount);
  };
  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case "COMPLETED":
        return "default";
      case "PROCESSING":
        return "secondary";
      case "PENDING":
        return "outline";
      case "CANCELLED":
        return "destructive";
      default:
        return "outline";
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto py-4 space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
        /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "sm", onClick: () => navigate({
          to: "/patients"
        }), children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }),
          "Back to Patients"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center flex-1", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold", children: patient.name }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Patient Details" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Button, { onClick: () => navigate({
        to: "/patients/$patientId/edit",
        params: {
          patientId
        }
      }), children: [
        /* @__PURE__ */ jsx(Edit, { className: "h-4 w-4 mr-2" }),
        "Edit Patient"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-lg border p-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-4", children: "Patient Information" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4 justify-center", children: [
                /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 text-blue-600", children: /* @__PURE__ */ jsx(Calendar, { className: "w-5 h-5" }) }),
                /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-muted-foreground mb-1", children: "Date of Birth" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm", children: formatDate(patient.dateOfBirth) }),
                  patient.dateOfBirth && /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    "Age: ",
                    calculateAge(patient.dateOfBirth),
                    " years"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4 justify-center", children: [
                /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-10 h-10 rounded-lg bg-green-100 text-green-600", children: /* @__PURE__ */ jsx(Mail, { className: "w-5 h-5" }) }),
                /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-muted-foreground mb-1", children: "Email" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm", children: patient.email || "Not provided" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4 justify-center", children: [
                /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-10 h-10 rounded-lg bg-purple-100 text-purple-600", children: /* @__PURE__ */ jsx(Phone, { className: "w-5 h-5" }) }),
                /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-muted-foreground mb-1", children: "Phone" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm", children: patient.phone || "Not provided" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4 justify-center", children: [
                /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-10 h-10 rounded-lg bg-orange-100 text-orange-600", children: /* @__PURE__ */ jsx(MapPin, { className: "w-5 h-5" }) }),
                /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-muted-foreground mb-1", children: "Address" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm", children: patient.address || "Not provided" })
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-lg border p-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold flex items-center", children: [
              /* @__PURE__ */ jsx(FileText, { className: "w-5 h-5 mr-2" }),
              "Recent Orders"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ jsxs(Badge, { variant: "secondary", children: [
                patient._count.orders,
                " total orders"
              ] }),
              /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", onClick: () => navigate({
                to: "/orders"
              }), children: "View All Orders" })
            ] })
          ] }),
          patient.orders && patient.orders.length > 0 ? /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            patient.orders.map((order) => /* @__PURE__ */ jsx("div", { className: "border rounded-lg p-4 hover:bg-muted/50 transition-colors", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3 mb-2", children: [
                  /* @__PURE__ */ jsxs("p", { className: "font-semibold", children: [
                    "Order #",
                    order.orderNumber || order.id.slice(-8)
                  ] }),
                  /* @__PURE__ */ jsx(Badge, { variant: getStatusBadgeVariant(order.status), children: order.status })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-3 text-sm", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                    /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4 text-muted-foreground" }),
                    /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: new Date(order.createdAt).toLocaleDateString() })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                    /* @__PURE__ */ jsx(FileText, { className: "w-4 h-4 text-muted-foreground" }),
                    /* @__PURE__ */ jsxs("span", { className: "text-muted-foreground", children: [
                      order.orderItems?.length || 0,
                      " test",
                      (order.orderItems?.length || 0) !== 1 ? "s" : ""
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                    /* @__PURE__ */ jsx(DollarSign, { className: "w-4 h-4 text-muted-foreground" }),
                    /* @__PURE__ */ jsx("span", { className: "font-medium", children: order.totalCost ? formatCurrency(order.totalCost) : "TBD" })
                  ] })
                ] }),
                order.estimatedReady && /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 mt-2 text-sm", children: [
                  /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4 text-orange-500" }),
                  /* @__PURE__ */ jsxs("span", { className: "text-orange-600", children: [
                    "Est. ready: ",
                    new Date(new Date(order.createdAt).getTime() + order.estimatedReady * 60 * 60 * 1e3).toLocaleDateString()
                  ] })
                ] }),
                order.orderItems && order.orderItems.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-2", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Tests:" }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                    order.orderItems.slice(0, 2).map((item) => /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      "• ",
                      item.labTest?.name || "Unknown Test"
                    ] }, item.id)),
                    order.orderItems.length > 2 && /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      "• +",
                      order.orderItems.length - 2,
                      " more test",
                      order.orderItems.length - 2 !== 1 ? "s" : "",
                      "..."
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", onClick: () => navigate({
                to: "/orders/$orderId",
                params: {
                  orderId: order.id
                }
              }), children: [
                /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4 mr-1" }),
                "View"
              ] })
            ] }) }, order.id)),
            patient.orders.length >= 10 && /* @__PURE__ */ jsx("div", { className: "text-center pt-4 border-t", children: /* @__PURE__ */ jsxs(Button, { variant: "outline", onClick: () => navigate({
              to: "/orders"
            }), children: [
              "View All ",
              patient._count.orders,
              " Orders"
            ] }) })
          ] }) : /* @__PURE__ */ jsxs("div", { className: "text-center py-8 text-muted-foreground", children: [
            /* @__PURE__ */ jsx(Activity, { className: "mx-auto h-12 w-12 mb-4 opacity-50" }),
            /* @__PURE__ */ jsx("p", { children: "No orders found for this patient" }),
            /* @__PURE__ */ jsx(Button, { variant: "outline", className: "mt-4", onClick: () => navigate({
              to: "/orders"
            }), children: "View Orders" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-lg border p-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold mb-4", children: "Summary" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center p-3 bg-muted rounded-lg", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Total Orders" }),
            /* @__PURE__ */ jsx("span", { className: "text-lg font-bold", children: patient._count.orders })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center p-3 bg-muted rounded-lg", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Member Since" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm", children: formatDate(patient.createdAt) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center p-3 bg-muted rounded-lg", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Last Updated" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm", children: formatDate(patient.updatedAt) })
          ] })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  PatientDetailsPage as component
};
