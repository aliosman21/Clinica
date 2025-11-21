import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { c as createSsrRpc, u as useServerFn, g as getPatients } from "./router-CUTPFSxq.js";
import { u as useDebounce, a as useConfirmDialog, C as CustomTable, b as ConfirmDialog } from "./useDebounce-Cp7i4SFB.js";
import { C as CustomTextInput } from "./CustomTextInput-BL_3-NLe.js";
import { B as Button } from "./button-DTJ7Hz9H.js";
import { B as Badge } from "./badge-C5jHjo0s.js";
import { p as prismaClient } from "./prisma-DiAJCEci.js";
import { a as authMiddleware } from "./middleware-leKOZ4bV.js";
import { c as createServerFn } from "../server.js";
import { Plus, Eye, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import "@tanstack/react-router-devtools";
import "./session-CRRQK3Ha.js";
import "@tanstack/react-router-ssr-query";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-select";
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
const deletePatient_createServerFn_handler = createSsrRpc("9fb36a3bc07db7f995bfaf430ef6864612da15a3b35e379d7deb968238d76812");
const deletePatient = createServerFn({
  method: "POST"
}).middleware([authMiddleware]).inputValidator((params) => params).handler(deletePatient_createServerFn_handler, async ({
  data
}) => {
  try {
    const orderCount = await prismaClient.order.count({
      where: {
        patientId: data.id
      }
    });
    if (orderCount > 0) {
      throw new Error("Cannot delete patient with existing orders");
    }
    await prismaClient.patient.delete({
      where: {
        id: data.id
      }
    });
    return {
      message: "Patient deleted successfully"
    };
  } catch (error) {
    throw new Error("Failed to delete patient");
  }
});
function PatientsPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [pagination, setPagination] = useState({
    total: 0,
    limit: 5,
    offset: 0,
    hasMore: false
  });
  const {
    dialogState,
    openDialog,
    closeDialog,
    handleConfirm
  } = useConfirmDialog();
  const getPatientsFn = useServerFn(getPatients);
  const deletePatientFn = useServerFn(deletePatient);
  const {
    data: patientsData,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["patients", pagination.limit, pagination.offset, debouncedSearchTerm],
    queryFn: () => getPatientsFn({
      data: {
        limit: pagination.limit,
        offset: pagination.offset,
        name: debouncedSearchTerm || void 0
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
  }, [debouncedSearchTerm]);
  const deletePatientMutation = useMutation({
    mutationFn: (id) => deletePatientFn({
      data: {
        id
      }
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["patients"]
      });
      toast.success("Patient deleted successfully");
      closeDialog();
    },
    onError: (error2) => {
      toast.error("Error deleting patient: " + error2.message);
      closeDialog();
    }
  });
  const handleSearch = (term) => {
    setSearchTerm(term);
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
  const handleDeletePatient = (patientId) => {
    openDialog({
      title: "Delete Patient",
      description: "Are you sure you want to delete this patient? This action cannot be undone.",
      id: patientId,
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "destructive",
      onConfirm: (id) => {
        deletePatientMutation.mutate(id);
      }
    });
  };
  const patients = patientsData?.patients || [];
  const currentPagination = patientsData?.pagination || pagination;
  const columns = [{
    key: "name",
    header: "Name",
    headerClassName: "text-center",
    accessor: "name",
    className: "font-medium"
  }, {
    key: "email",
    header: "Email",
    headerClassName: "text-center",
    render: (patient) => patient.email || "-"
  }, {
    key: "phone",
    header: "Phone",
    headerClassName: "text-center",
    render: (patient) => patient.phone || "-"
  }, {
    key: "dateOfBirth",
    header: "Date of Birth",
    headerClassName: "text-center",
    render: (patient) => patient.dateOfBirth ? new Date(patient.dateOfBirth).toLocaleDateString() : "-"
  }, {
    key: "orders",
    header: "Orders",
    headerClassName: "text-center",
    render: (patient) => /* @__PURE__ */ jsxs(Badge, { variant: "secondary", children: [
      patient._count.orders,
      " orders"
    ] }),
    className: "text-center"
  }, {
    key: "createdAt",
    header: "Created",
    headerClassName: "text-center",
    render: (patient) => new Date(patient.createdAt).toLocaleDateString(),
    className: "text-muted-foreground text-sm"
  }];
  if (error) {
    return /* @__PURE__ */ jsx("div", { className: "container mx-auto py-8", children: /* @__PURE__ */ jsxs("div", { className: "text-center text-red-500", children: [
      "Error loading patients: ",
      error.message,
      /* @__PURE__ */ jsx("br", {}),
      /* @__PURE__ */ jsx(Button, { onClick: () => refetch(), className: "mt-4", children: "Try Again" })
    ] }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto py-4 space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold", children: "Patients" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Manage patient information and records" })
      ] }),
      /* @__PURE__ */ jsxs(Button, { onClick: () => navigate({
        to: "/patients/new"
      }), children: [
        /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4 mr-2" }),
        "Add Patient"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-2", children: /* @__PURE__ */ jsx("div", { className: "flex-1 max-w-sm", children: /* @__PURE__ */ jsx(CustomTextInput, { field: {
      name: "search",
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
      handleChange: handleSearch,
      handleBlur: () => {
      }
    }, placeholder: "Search patients by name..." }) }) }),
    /* @__PURE__ */ jsx(CustomTable, { data: patients, columns, pagination: currentPagination, onPageChange: handlePageChange, onPageSizeChange: handlePageSizeChange, loading: isLoading, emptyMessage: "No patients found", actions: (patient) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", onClick: () => navigate({
        to: "/patients/$patientId",
        params: {
          patientId: patient.id
        }
      }), children: /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", onClick: () => navigate({
        to: "/patients/$patientId/edit",
        params: {
          patientId: patient.id
        }
      }), children: /* @__PURE__ */ jsx(Edit, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", onClick: () => handleDeletePatient(patient.id), className: "text-destructive hover:text-destructive", disabled: deletePatientMutation.isPending, children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
    ] }) }),
    /* @__PURE__ */ jsx(ConfirmDialog, { isOpen: dialogState.isOpen, onClose: closeDialog, onConfirm: handleConfirm, title: dialogState.title, description: dialogState.description, confirmText: dialogState.confirmText, cancelText: dialogState.cancelText, id: dialogState.id, variant: dialogState.variant, isLoading: deletePatientMutation.isPending })
  ] });
}
export {
  PatientsPage as component
};
