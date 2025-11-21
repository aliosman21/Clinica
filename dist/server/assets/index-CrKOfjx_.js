import { jsxs, jsx } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { c as createSsrRpc, u as useServerFn, b as getOrders } from "./router-CUTPFSxq.js";
import { u as useDebounce, a as useConfirmDialog, C as CustomTable, b as ConfirmDialog } from "./useDebounce-Cp7i4SFB.js";
import { L as Label, C as CustomTextInput } from "./CustomTextInput-BL_3-NLe.js";
import { c as cn } from "./utils-H80jjgLf.js";
import { ChevronDown, FileText, Eye, Trash2 } from "lucide-react";
import { B as Button } from "./button-DTJ7Hz9H.js";
import { B as Badge } from "./badge-C5jHjo0s.js";
import { p as prismaClient } from "./prisma-DiAJCEci.js";
import { a as authMiddleware } from "./middleware-leKOZ4bV.js";
import { OrderStatus } from "@prisma/client";
import { c as createServerFn } from "../server.js";
import { toast } from "sonner";
import "@tanstack/react-router-devtools";
import "./session-CRRQK3Ha.js";
import "@tanstack/react-router-ssr-query";
import "@radix-ui/react-select";
import "@radix-ui/react-label";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core";
import "node:async_hooks";
import "@tanstack/router-core/ssr/server";
import "h3-v2";
import "tiny-invariant";
import "seroval";
import "@tanstack/react-router/ssr/server";
function CustomSelect({
  field,
  label,
  placeholder = "Select an option",
  helperText,
  options,
  disabled = false,
  className
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  const currentValue = field.state.value;
  const hasError = field.state.meta.isTouched && Array.isArray(field.state.meta.errors) && field.state.meta.errors && field.state.meta.errors.length > 0;
  const errorMessage = hasError && Array.isArray(field.state.meta.errors) ? field.state.meta.errors[0] : void 0;
  const selectedOption = options.find((opt) => opt.value === currentValue);
  const handleOptionSelect = (option) => {
    if (!option.disabled) {
      field.handleChange(option.value);
      setIsOpen(false);
      field.handleBlur();
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        const currentIndex = options.findIndex((opt) => opt.value === currentValue);
        const nextIndex = (currentIndex + 1) % options.length;
        const nextOption = options[nextIndex];
        if (nextOption && !nextOption.disabled) {
          field.handleChange(nextOption.value);
        }
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (isOpen) {
        const currentIndex = options.findIndex((opt) => opt.value === currentValue);
        const prevIndex = currentIndex <= 0 ? options.length - 1 : currentIndex - 1;
        const prevOption = options[prevIndex];
        if (prevOption && !prevOption.disabled) {
          field.handleChange(prevOption.value);
        }
      }
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
    label && /* @__PURE__ */ jsx(
      Label,
      {
        htmlFor: `select-${field.name}`,
        className: cn(hasError && "text-red-500"),
        children: label
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative", ref: selectRef, children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          id: `select-${field.name}`,
          role: "combobox",
          "aria-expanded": isOpen,
          "aria-haspopup": "listbox",
          tabIndex: disabled ? -1 : 0,
          className: cn(
            "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background cursor-pointer",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            hasError && "border-red-500 focus:ring-red-500",
            className
          ),
          onClick: () => !disabled && setIsOpen(!isOpen),
          onKeyDown: handleKeyDown,
          children: [
            /* @__PURE__ */ jsx("span", { className: cn(
              "flex-1 text-left",
              !selectedOption && "text-muted-foreground"
            ), children: selectedOption?.label || placeholder }),
            /* @__PURE__ */ jsx(
              ChevronDown,
              {
                className: cn(
                  "h-4 w-4 opacity-50 transition-transform",
                  isOpen && "rotate-180"
                )
              }
            )
          ]
        }
      ),
      isOpen && /* @__PURE__ */ jsx("div", { className: "absolute top-full z-50 w-full mt-1 rounded-md border bg-popover shadow-md", children: /* @__PURE__ */ jsx(
        "div",
        {
          role: "listbox",
          className: "max-h-60 overflow-auto p-1",
          children: options.map((option) => /* @__PURE__ */ jsx(
            "div",
            {
              role: "option",
              "aria-selected": option.value === currentValue,
              className: cn(
                "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
                "hover:bg-accent hover:text-accent-foreground",
                "focus:bg-accent focus:text-accent-foreground",
                option.value === currentValue && "bg-accent text-accent-foreground",
                option.disabled && "pointer-events-none opacity-50"
              ),
              onClick: () => handleOptionSelect(option),
              children: option.label
            },
            option.value
          ))
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-between items-start", children: /* @__PURE__ */ jsx("div", { className: "flex-1", children: (errorMessage || helperText) && /* @__PURE__ */ jsx("p", { className: cn(
      "text-sm",
      hasError ? "text-red-500" : "text-muted-foreground"
    ), children: errorMessage || helperText }) }) })
  ] });
}
const deleteOrder_createServerFn_handler = createSsrRpc("86f303f442bd6a6cd2200a3b53b5498707cf3134f40c6dc657d3f51d7acd4433");
const deleteOrder = createServerFn({
  method: "POST"
}).middleware([authMiddleware]).inputValidator((params) => params).handler(deleteOrder_createServerFn_handler, async ({
  data
}) => {
  try {
    const order = await prismaClient.order.findUnique({
      where: {
        id: data.id
      },
      select: {
        status: true
      }
    });
    if (!order) {
      throw new Error("Order not found");
    }
    if (order.status !== OrderStatus.PENDING && order.status !== OrderStatus.CANCELLED) {
      throw new Error("Only pending or cancelled orders can be deleted");
    }
    await prismaClient.order.delete({
      where: {
        id: data.id
      }
    });
    return {
      message: "Order deleted successfully"
    };
  } catch (error) {
    throw new Error("Failed to delete order");
  }
});
const statusOptions = [{
  value: "",
  label: "All Statuses"
}, {
  value: "PENDING",
  label: "Pending"
}, {
  value: "PROCESSING",
  label: "Processing"
}, {
  value: "COMPLETED",
  label: "Completed"
}, {
  value: "CANCELLED",
  label: "Cancelled"
}];
function OrdersPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [patientSearch, setPatientSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const debouncedPatientSearch = useDebounce(patientSearch, 500);
  const [pagination, setPagination] = useState({
    total: 0,
    limit: 25,
    offset: 0,
    hasMore: false
  });
  const {
    dialogState,
    openDialog,
    closeDialog,
    handleConfirm
  } = useConfirmDialog();
  const getOrdersFn = useServerFn(getOrders);
  const deleteOrderFn = useServerFn(deleteOrder);
  const {
    data: ordersData,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["orders", pagination.limit, pagination.offset, debouncedSearchTerm, debouncedPatientSearch, selectedStatus],
    queryFn: () => getOrdersFn({
      data: {
        limit: pagination.limit,
        offset: pagination.offset,
        orderNumber: debouncedSearchTerm || void 0,
        patientName: debouncedPatientSearch || void 0,
        status: selectedStatus || void 0
      }
    }),
    staleTime: 3e4
    // 30 seconds
  });
  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      offset: 0
    }));
  }, [debouncedSearchTerm, debouncedPatientSearch, selectedStatus]);
  const deleteOrderMutation = useMutation({
    mutationFn: (id) => deleteOrderFn({
      data: {
        id
      }
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"]
      });
      toast.success("Order deleted successfully");
      closeDialog();
    },
    onError: (error2) => {
      toast.error("Error deleting order: " + error2.message);
      closeDialog();
    }
  });
  const handleOrderNumberSearch = (term) => {
    setSearchTerm(term);
  };
  const handlePatientNameSearch = (term) => {
    setPatientSearch(term);
  };
  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };
  const handlePageChange = (offset) => {
    setPagination((prev) => ({
      ...prev,
      offset
    }));
  };
  const handlePageSizeChange = (limit) => {
    setPagination((prev) => ({
      ...prev,
      limit,
      offset: 0
    }));
  };
  const handleDeleteOrder = (orderId) => {
    openDialog({
      title: "Delete Order",
      description: "Are you sure you want to delete this order? This action cannot be undone.",
      id: orderId,
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "destructive",
      onConfirm: (id) => {
        deleteOrderMutation.mutate(id);
      }
    });
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
      case "PENDING":
        return "outline";
      case "CANCELLED":
        return "destructive";
      default:
        return "outline";
    }
  };
  const orders = ordersData?.orders || [];
  const currentPagination = ordersData?.pagination || pagination;
  const columns = [{
    key: "orderNumber",
    header: "Order #",
    accessor: "orderNumber",
    className: "font-medium"
  }, {
    key: "patient",
    header: "Patient",
    render: (order) => /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "font-medium", children: order.patient.name }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: order.patient.email || order.patient.phone || "No contact info" })
    ] })
  }, {
    key: "items",
    header: "Tests",
    render: (order) => /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("p", { className: "text-sm", children: [
        order._count.orderItems,
        " test",
        order._count.orderItems !== 1 ? "s" : ""
      ] }),
      order.orderItems.slice(0, 2).map((item) => /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: item.labTest.name }, item.id)),
      order.orderItems.length > 2 && /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
        "+",
        order.orderItems.length - 2,
        " more..."
      ] })
    ] })
  }, {
    key: "totalAmount",
    header: "Total",
    render: (order) => {
      const total = order.totalAmount || order.orderItems?.reduce((sum, item) => sum + (item.unitPrice || item.labTest?.price || 0) * item.quantity, 0) || 0;
      return /* @__PURE__ */ jsx("span", { className: "font-medium", children: formatCurrency(total) });
    },
    className: "text-right"
  }, {
    key: "status",
    header: "Status",
    render: (order) => /* @__PURE__ */ jsx(Badge, { variant: getStatusBadgeVariant(order.status), children: order.status }),
    className: "text-center"
  }, {
    key: "estimatedReady",
    header: "Est. Ready",
    render: (order) => order.estimatedReady ? new Date(order.estimatedReady).toLocaleDateString() : "TBD",
    className: "text-muted-foreground text-sm"
  }, {
    key: "createdAt",
    header: "Created",
    render: (order) => new Date(order.createdAt).toLocaleDateString(),
    className: "text-muted-foreground text-sm"
  }];
  if (error) {
    return /* @__PURE__ */ jsx("div", { className: "container mx-auto py-4", children: /* @__PURE__ */ jsxs("div", { className: "text-center text-red-500", children: [
      "Error loading orders: ",
      error.message,
      /* @__PURE__ */ jsx("br", {}),
      /* @__PURE__ */ jsx(Button, { onClick: () => refetch(), className: "mt-4", children: "Try Again" })
    ] }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto py-4 space-y-6", children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-between items-center", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold", children: "Orders" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Manage lab test orders and their statuses" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsx(CustomTextInput, { field: {
        name: "orderSearch",
        state: {
          value: searchTerm,
          meta: {
            errors: [],
            isTouched: false,
            isBlurred: false,
            isDirty: false,
            errorMap: {},
            errorSourceMap: {},
            isValidating: false
          }
        },
        handleChange: handleOrderNumberSearch,
        handleBlur: () => {
        }
      }, placeholder: "Search by order number...", label: "Order Number" }),
      /* @__PURE__ */ jsx(CustomTextInput, { field: {
        name: "patientSearch",
        state: {
          value: patientSearch,
          meta: {
            errors: [],
            isTouched: false,
            isBlurred: false,
            isDirty: false,
            errorMap: {},
            errorSourceMap: {},
            isValidating: false
          }
        },
        handleChange: handlePatientNameSearch,
        handleBlur: () => {
        }
      }, placeholder: "Search by patient name...", label: "Patient Name" }),
      /* @__PURE__ */ jsx(CustomSelect, { field: {
        name: "statusFilter",
        state: {
          value: selectedStatus,
          meta: {
            errors: [],
            isTouched: false,
            isBlurred: false,
            isDirty: false,
            errorMap: {},
            errorSourceMap: {},
            isValidating: false
          }
        },
        handleChange: handleStatusChange,
        handleBlur: () => {
        }
      }, options: statusOptions, label: "Status Filter", placeholder: "Select status..." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-card rounded-lg border p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Total Orders" }),
          /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold", children: currentPagination.total })
        ] }),
        /* @__PURE__ */ jsx(FileText, { className: "h-8 w-8 text-blue-500" })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "bg-card rounded-lg border p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Pending Orders" }),
          /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-yellow-600", children: orders.filter((o) => o.status === "PENDING").length })
        ] }),
        /* @__PURE__ */ jsx(FileText, { className: "h-8 w-8 text-yellow-500" })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "bg-card rounded-lg border p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Completed" }),
          /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-blue-600", children: orders.filter((o) => o.status === "COMPLETED").length })
        ] }),
        /* @__PURE__ */ jsx(FileText, { className: "h-8 w-8 text-blue-500" })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "bg-card rounded-lg border p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "Completed" }),
          /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-green-600", children: orders.filter((o) => o.status === "COMPLETED").length })
        ] }),
        /* @__PURE__ */ jsx(FileText, { className: "h-8 w-8 text-green-500" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(CustomTable, { data: orders, columns, pagination: currentPagination, onPageChange: handlePageChange, onPageSizeChange: handlePageSizeChange, loading: isLoading, emptyMessage: "No orders found", actions: (order) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", onClick: () => navigate({
        to: "/orders/$orderId",
        params: {
          orderId: order.id
        }
      }), children: /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", onClick: () => handleDeleteOrder(order.id), className: "text-destructive hover:text-destructive", disabled: deleteOrderMutation.isPending, children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
    ] }) }),
    /* @__PURE__ */ jsx(ConfirmDialog, { isOpen: dialogState.isOpen, onClose: closeDialog, onConfirm: handleConfirm, title: dialogState.title, description: dialogState.description, confirmText: dialogState.confirmText, cancelText: dialogState.cancelText, id: dialogState.id, variant: dialogState.variant, isLoading: deleteOrderMutation.isPending })
  ] });
}
export {
  OrdersPage as component
};
