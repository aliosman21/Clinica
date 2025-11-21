import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { c as cn } from "./utils-H80jjgLf.js";
import { ChevronDownIcon, CheckIcon, ChevronUpIcon, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight, X, AlertTriangle } from "lucide-react";
import { B as Button } from "./button-DTJ7Hz9H.js";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as React from "react";
import { useState, useEffect } from "react";
function Table({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "table-container",
      className: "relative w-full overflow-x-auto",
      children: /* @__PURE__ */ jsx(
        "table",
        {
          "data-slot": "table",
          className: cn("w-full caption-bottom text-sm", className),
          ...props
        }
      )
    }
  );
}
function TableHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "thead",
    {
      "data-slot": "table-header",
      className: cn("[&_tr]:border-b", className),
      ...props
    }
  );
}
function TableBody({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "tbody",
    {
      "data-slot": "table-body",
      className: cn("[&_tr:last-child]:border-0", className),
      ...props
    }
  );
}
function TableRow({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "tr",
    {
      "data-slot": "table-row",
      className: cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      ),
      ...props
    }
  );
}
function TableHead({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "th",
    {
      "data-slot": "table-head",
      className: cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
function TableCell({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "td",
    {
      "data-slot": "table-cell",
      className: cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
function Select({
  ...props
}) {
  return /* @__PURE__ */ jsx(SelectPrimitive.Root, { "data-slot": "select", ...props });
}
function SelectValue({
  ...props
}) {
  return /* @__PURE__ */ jsx(SelectPrimitive.Value, { "data-slot": "select-value", ...props });
}
function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    SelectPrimitive.Trigger,
    {
      "data-slot": "select-trigger",
      "data-size": size,
      className: cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDownIcon, { className: "size-4 opacity-50" }) })
      ]
    }
  );
}
function SelectContent({
  className,
  children,
  position = "popper",
  align = "center",
  ...props
}) {
  return /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
    SelectPrimitive.Content,
    {
      "data-slot": "select-content",
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
        position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      ),
      position,
      align,
      ...props,
      children: [
        /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
        /* @__PURE__ */ jsx(
          SelectPrimitive.Viewport,
          {
            className: cn(
              "p-1",
              position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
            ),
            children
          }
        ),
        /* @__PURE__ */ jsx(SelectScrollDownButton, {})
      ]
    }
  ) });
}
function SelectItem({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    SelectPrimitive.Item,
    {
      "data-slot": "select-item",
      className: cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx("span", { className: "absolute right-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(CheckIcon, { className: "size-4" }) }) }),
        /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
      ]
    }
  );
}
function SelectScrollUpButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SelectPrimitive.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(ChevronUpIcon, { className: "size-4" })
    }
  );
}
function SelectScrollDownButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SelectPrimitive.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(ChevronDownIcon, { className: "size-4" })
    }
  );
}
function CustomTable({
  data,
  columns,
  pagination,
  onPageChange,
  onPageSizeChange,
  loading = false,
  emptyMessage = "No data available",
  className,
  onRowClick,
  actions
}) {
  const currentPage = pagination ? Math.floor(pagination.offset / pagination.limit) + 1 : 1;
  const totalPages = pagination ? Math.ceil(pagination.total / pagination.limit) : 1;
  const pageSizes = [5, 10, 25, 50];
  const handlePageChange = (page) => {
    if (pagination && onPageChange) {
      const newOffset = (page - 1) * pagination.limit;
      onPageChange(newOffset);
    }
  };
  const handlePageSizeChange = (size) => {
    if (onPageSizeChange) {
      onPageSizeChange(parseInt(size));
    }
  };
  const displayColumns = actions ? [...columns, { key: "actions", header: "Actions", className: "w-[100px]" }] : columns;
  return /* @__PURE__ */ jsxs("div", { className: cn("space-y-4", className), children: [
    /* @__PURE__ */ jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsx(TableRow, { children: displayColumns.map((column) => /* @__PURE__ */ jsx(
        TableHead,
        {
          className: cn(column.headerClassName, column.className),
          children: column.header
        },
        column.key
      )) }) }),
      /* @__PURE__ */ jsx(TableBody, { children: loading ? /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(
        TableCell,
        {
          colSpan: displayColumns.length,
          className: "h-24 text-center",
          children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center", children: [
            /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-6 w-6 border-b-2 border-primary" }),
            /* @__PURE__ */ jsx("span", { className: "ml-2", children: "Loading..." })
          ] })
        }
      ) }) : data.length === 0 ? /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(
        TableCell,
        {
          colSpan: displayColumns.length,
          className: "h-24 text-center text-muted-foreground",
          children: emptyMessage
        }
      ) }) : data.map((item, index) => /* @__PURE__ */ jsxs(
        TableRow,
        {
          className: cn(
            onRowClick && "cursor-pointer hover:bg-muted/50"
          ),
          onClick: () => onRowClick?.(item, index),
          children: [
            columns.map((column) => /* @__PURE__ */ jsx(
              TableCell,
              {
                className: column.className,
                children: column.render ? column.render(item, index) : column.accessor ? String(item[column.accessor] || "-") : "-"
              },
              column.key
            )),
            actions && /* @__PURE__ */ jsx(TableCell, { className: "w-[100px]", children: actions(item, index) })
          ]
        },
        index
      )) })
    ] }) }),
    pagination && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: "Rows per page" }),
        /* @__PURE__ */ jsxs(
          Select,
          {
            value: String(pagination.limit),
            onValueChange: handlePageSizeChange,
            children: [
              /* @__PURE__ */ jsx(SelectTrigger, { className: "h-8 w-[70px]", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsx(SelectContent, { side: "top", children: pageSizes.map((size) => /* @__PURE__ */ jsx(SelectItem, { value: String(size), children: size }, size)) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-6 lg:space-x-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex w-[100px] items-center justify-center text-sm font-medium", children: [
          "Page ",
          currentPage,
          " of ",
          totalPages
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              className: "h-8 w-8 p-0",
              onClick: () => handlePageChange(1),
              disabled: currentPage <= 1,
              children: [
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Go to first page" }),
                /* @__PURE__ */ jsx(ChevronsLeft, { className: "h-4 w-4" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              className: "h-8 w-8 p-0",
              onClick: () => handlePageChange(currentPage - 1),
              disabled: currentPage <= 1,
              children: [
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Go to previous page" }),
                /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              className: "h-8 w-8 p-0",
              onClick: () => handlePageChange(currentPage + 1),
              disabled: currentPage >= totalPages,
              children: [
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Go to next page" }),
                /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              className: "h-8 w-8 p-0",
              onClick: () => handlePageChange(totalPages),
              disabled: currentPage >= totalPages,
              children: [
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Go to last page" }),
                /* @__PURE__ */ jsx(ChevronsRight, { className: "h-4 w-4" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: pagination.total > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
        "Showing ",
        pagination.offset + 1,
        " to",
        " ",
        Math.min(pagination.offset + pagination.limit, pagination.total),
        " of",
        " ",
        pagination.total,
        " entries"
      ] }) })
    ] })
  ] });
}
const Dialog = ({ open, onOpenChange, children }) => {
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && onOpenChange) {
        onOpenChange(false);
      }
    };
    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [open, onOpenChange]);
  if (!open) return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center", children });
};
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = "DialogOverlay";
const DialogContent = React.forwardRef(({ className, children, onClose, ...props }, ref) => /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, { onClick: onClose }),
  /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        onClose && /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: onClose,
            className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            children: [
              /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
            ]
          }
        )
      ]
    }
  )
] }));
DialogContent.displayName = "DialogContent";
const DialogHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    ),
    ...props
  }
);
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    ),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "h2",
  {
    ref,
    className: cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
DialogTitle.displayName = "DialogTitle";
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "p",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = "DialogDescription";
function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  id,
  isLoading = false,
  variant = "destructive"
}) {
  const handleConfirm = () => {
    onConfirm(id);
  };
  return /* @__PURE__ */ jsx(Dialog, { open: isOpen, onOpenChange: onClose, children: /* @__PURE__ */ jsxs(DialogContent, { className: "sm:max-w-[425px]", onClose, children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      variant === "destructive" && /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-10 h-10 rounded-full bg-red-100 text-red-600", children: /* @__PURE__ */ jsx(AlertTriangle, { className: "w-5 h-5" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: title }),
        /* @__PURE__ */ jsx(DialogDescription, { className: "mt-1", children: description })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs(DialogFooter, { className: "gap-2 sm:gap-0", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          onClick: onClose,
          disabled: isLoading,
          children: cancelText
        }
      ),
      /* @__PURE__ */ jsxs(
        Button,
        {
          variant,
          onClick: handleConfirm,
          disabled: isLoading,
          children: [
            isLoading ? /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" }) : null,
            confirmText
          ]
        }
      )
    ] })
  ] }) });
}
function useConfirmDialog() {
  const [dialogState, setDialogState] = useState({
    isOpen: false,
    title: "",
    description: "",
    id: ""
  });
  const openDialog = (config) => {
    setDialogState({
      isOpen: true,
      ...config
    });
  };
  const closeDialog = () => {
    setDialogState((prev) => ({
      ...prev,
      isOpen: false
    }));
  };
  const handleConfirm = (id) => {
    if (dialogState.onConfirm) {
      dialogState.onConfirm(id);
    }
    closeDialog();
  };
  return {
    dialogState,
    openDialog,
    closeDialog,
    handleConfirm
  };
}
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}
export {
  CustomTable as C,
  useConfirmDialog as a,
  ConfirmDialog as b,
  useDebounce as u
};
