import { jsxs, jsx } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { B as Button } from "./button-DTJ7Hz9H.js";
import { B as Badge } from "./badge-C5jHjo0s.js";
import { ArrowLeft, User, Package, Clock, FileText } from "lucide-react";
import { toast } from "sonner";
import { e as Route } from "./router-CUTPFSxq.js";
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
import "./prisma-DiAJCEci.js";
import "@prisma/client";
import "./middleware-leKOZ4bV.js";
import "@tanstack/react-router-ssr-query";
import "@tanstack/react-query";
function OrderDetailsPage() {
  const navigate = useNavigate();
  const order = Route.useLoaderData();
  const {
    orderId
  } = Route.useParams();
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
  const getStatusColor = (status) => {
    switch (status) {
      case "COMPLETED":
        return "text-green-600 bg-green-100";
      case "PROCESSING":
        return "text-blue-600 bg-blue-100";
      case "PENDING":
        return "text-yellow-600 bg-yellow-100";
      case "CANCELLED":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };
  const calculateTotalAmount = () => {
    return order.orderItems.reduce((total, item) => {
      return total + item.labTest.price * item.quantity;
    }, 0);
  };
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto py-4 space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
        /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "sm", onClick: () => navigate({
          to: "/orders"
        }), children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }),
          "Back to Orders"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxs("h1", { className: "text-3xl font-bold", children: [
            "Order #",
            order.orderNumber
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Order Details" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-2", children: /* @__PURE__ */ jsx(Badge, { variant: getStatusBadgeVariant(order.status), className: "text-lg px-3 py-1", children: order.status }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-lg border p-6", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold mb-4 flex items-center", children: [
            /* @__PURE__ */ jsx(User, { className: "w-5 h-5 mr-2" }),
            "Patient Information"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Full Name" }),
                /* @__PURE__ */ jsx("p", { className: "text-lg font-semibold", children: order.patient.name })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Date of Birth" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm", children: order.patient.dateOfBirth ? new Date(order.patient.dateOfBirth).toLocaleDateString() : "Not provided" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Email" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm", children: order.patient.email || "Not provided" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Phone" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm", children: order.patient.phone || "Not provided" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-4 pt-4 border-t", children: /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", onClick: () => navigate({
            to: "/patients/$patientId",
            params: {
              patientId: order.patient.id
            }
          }), children: "View Patient Details" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-lg border p-6", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold mb-4 flex items-center", children: [
            /* @__PURE__ */ jsx(Package, { className: "w-5 h-5 mr-2" }),
            "Lab Tests Ordered"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-3", children: order.orderItems.map((item, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-4 border rounded-lg", children: [
            /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 text-blue-600 text-sm font-medium", children: index + 1 }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "font-medium", children: item.labTest.name }),
                /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
                  "Code: ",
                  item.labTest.code
                ] }),
                item.labTest.turnaroundTime && /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground flex items-center mt-1", children: [
                  /* @__PURE__ */ jsx(Clock, { className: "w-3 h-3 mr-1" }),
                  item.labTest.turnaroundTime,
                  " days turnaround"
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
                "Quantity: ",
                item.quantity
              ] }),
              /* @__PURE__ */ jsx("p", { className: "font-semibold", children: formatCurrency(item.labTest.price * item.quantity) }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
                formatCurrency(item.labTest.price),
                " each"
              ] })
            ] })
          ] }, item.id)) }),
          /* @__PURE__ */ jsx("div", { className: "mt-6 pt-4 border-t", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsx("p", { className: "text-lg font-semibold", children: "Total Amount:" }),
            /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-green-600", children: formatCurrency(calculateTotalAmount()) })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-lg border p-6", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-lg font-semibold mb-4 flex items-center", children: [
            /* @__PURE__ */ jsx(FileText, { className: "w-5 h-5 mr-2" }),
            "Order Summary"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center p-3 bg-muted rounded-lg", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Order Number" }),
              /* @__PURE__ */ jsx("span", { className: "font-mono", children: order.orderNumber })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center p-3 bg-muted rounded-lg", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Status" }),
              /* @__PURE__ */ jsx("div", { className: `px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`, children: order.status })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center p-3 bg-muted rounded-lg", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Total Tests" }),
              /* @__PURE__ */ jsx("span", { className: "text-lg font-bold", children: order.orderItems.length })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center p-3 bg-muted rounded-lg", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Created Date" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm", children: new Date(order.createdAt).toLocaleDateString() })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center p-3 bg-muted rounded-lg", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Last Updated" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm", children: new Date(order.updatedAt).toLocaleDateString() })
            ] }),
            order.estimatedReady && /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center p-3 bg-muted rounded-lg", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Est. Ready Date" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-orange-600", children: new Date(order.estimatedReady).toLocaleDateString() })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-lg border p-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold mb-4", children: "Quick Actions" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", className: "w-full justify-start", onClick: () => navigate({
              to: "/patients/$patientId",
              params: {
                patientId: order.patient.id
              }
            }), children: [
              /* @__PURE__ */ jsx(User, { className: "w-4 h-4 mr-2" }),
              "View Patient"
            ] }),
            /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", className: "w-full justify-start", onClick: () => {
              toast.success("Print functionality would be implemented here");
            }, children: [
              /* @__PURE__ */ jsx(FileText, { className: "w-4 h-4 mr-2" }),
              "Print Order"
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  OrderDetailsPage as component
};
