import { jsx, jsxs } from "react/jsx-runtime";
import { c as cn } from "./utils-H80jjgLf.js";
import * as LabelPrimitive from "@radix-ui/react-label";
import { EyeOff, Eye } from "lucide-react";
import { useState } from "react";
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    LabelPrimitive.Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
function CustomTextInput({
  field,
  label,
  placeholder,
  helperText,
  multiline = false,
  rows = 3,
  disabled = false,
  id,
  maxLength,
  showCharCount,
  className,
  password = false
}) {
  const [showPassword, setShowPassword] = useState(false);
  const currentLength = field.state.value?.length || 0;
  const hasError = field.state.meta.isTouched && Array.isArray(field.state.meta.errors) && field.state.meta.errors && field.state.meta.errors.length > 0;
  const errorMessage = hasError && Array.isArray(field.state.meta.errors) ? field.state.meta.errors[0] : void 0;
  const inputProps = {
    id: id || `field-${field.name}`,
    name: field.name,
    value: field.state.value || "",
    onChange: (e) => field.handleChange(e.target.value),
    onBlur: field.handleBlur,
    disabled,
    placeholder,
    maxLength,
    type: password && !showPassword ? "password" : "text",
    className: cn(
      hasError && "border-red-500 focus-visible:ring-red-500",
      password && "pr-10",
      // Add padding for the toggle button
      className
    )
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
    label && /* @__PURE__ */ jsx(
      Label,
      {
        htmlFor: inputProps.id,
        className: cn(hasError && "text-red-500"),
        children: label
      }
    ),
    multiline ? /* @__PURE__ */ jsx(
      "textarea",
      {
        ...inputProps,
        rows,
        className: cn(
          "flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          hasError && "border-red-500 focus-visible:ring-red-500",
          className
        )
      }
    ) : /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx(Input, { ...inputProps }),
      password && /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => setShowPassword(!showPassword),
          className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
          disabled,
          tabIndex: -1,
          children: showPassword ? /* @__PURE__ */ jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
      /* @__PURE__ */ jsx("div", { className: "flex-1", children: (errorMessage || helperText) && /* @__PURE__ */ jsx("p", { className: cn(
        "text-sm",
        hasError ? "text-red-500" : "text-muted-foreground"
      ), children: errorMessage || helperText }) }),
      showCharCount && /* @__PURE__ */ jsxs("p", { className: cn(
        "text-sm ml-2 shrink-0",
        maxLength && currentLength >= maxLength * 0.9 ? currentLength >= maxLength ? "text-red-500" : "text-yellow-500" : "text-muted-foreground"
      ), children: [
        currentLength,
        maxLength !== void 0 ? `/${maxLength}` : ""
      ] })
    ] })
  ] });
}
export {
  CustomTextInput as C,
  Label as L
};
