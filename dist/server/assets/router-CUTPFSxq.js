import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useRouter, isRedirect, useMatch, rootRouteId, ErrorComponent, Link, redirect, createRootRoute, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import * as React from "react";
import { useState, Activity } from "react";
import { Menu, Home, StickyNote, ChevronDown, ChevronRight } from "lucide-react";
import { T as TSS_SERVER_FUNCTION, g as getServerFnById, c as createServerFn } from "../server.js";
import { u as useAppSession } from "./session-CRRQK3Ha.js";
import { Toaster } from "sonner";
import { p as prismaClient } from "./prisma-DiAJCEci.js";
import { a as authMiddleware } from "./middleware-leKOZ4bV.js";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { QueryClient } from "@tanstack/react-query";
function useServerFn(serverFn) {
  const router2 = useRouter();
  return React.useCallback(
    async (...args) => {
      try {
        const res = await serverFn(...args);
        if (isRedirect(res)) {
          throw res;
        }
        return res;
      } catch (err) {
        if (isRedirect(err)) {
          err.options._fromLocation = router2.state.location;
          return router2.navigate(router2.resolveRedirect(err).options);
        }
        throw err;
      }
    },
    [router2, serverFn]
  );
}
function DefaultCatchBoundary({ error }) {
  const router2 = useRouter();
  const isRoot = useMatch({
    strict: false,
    select: (state) => state.id === rootRouteId
  });
  console.error(error);
  return /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1 p-4 flex flex-col items-center justify-center gap-6", children: [
    /* @__PURE__ */ jsx(ErrorComponent, { error }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center flex-wrap", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
          },
          className: `px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded-sm text-white uppercase font-extrabold`,
          children: "Try Again"
        }
      ),
      isRoot ? /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: `px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded-sm text-white uppercase font-extrabold`,
          children: "Home"
        }
      ) : /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: `px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded-sm text-white uppercase font-extrabold`,
          onClick: (e) => {
            e.preventDefault();
            window.history.back();
          },
          children: "Go Back"
        }
      )
    ] })
  ] });
}
const createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const fn = async (...args) => {
    const serverFn = await getServerFnById(functionId);
    return serverFn(...args);
  };
  return Object.assign(fn, {
    url,
    functionId,
    [TSS_SERVER_FUNCTION]: true
  });
};
const logoutFn_createServerFn_handler = createSsrRpc("f5bd48d1524c4f31fe78ff373daf8dada5107a3ac1afe0c8c75f9efa3e2dee99");
const logoutFn = createServerFn().handler(logoutFn_createServerFn_handler, async () => {
  const session = await useAppSession();
  session.clear();
  throw redirect({
    href: "/"
  });
});
function Header({ isOpen, setIsOpen, user }) {
  const [groupedExpanded, setGroupedExpanded] = useState({});
  const logout = useServerFn(logoutFn);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("header", { className: "p-4 flex justify-between items-center bg-gray-800 text-white shadow-lg", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex", children: [
        /* @__PURE__ */ jsx(Activity, { mode: user ? "visible" : "hidden", children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setIsOpen(!isOpen),
            className: "p-2 hover:bg-gray-700 rounded-lg transition-colors",
            "aria-label": "Open menu",
            children: /* @__PURE__ */ jsx(Menu, { size: 24 })
          }
        ) }),
        /* @__PURE__ */ jsx("h1", { className: "ml-4 text-xl font-semibold", children: /* @__PURE__ */ jsx(Link, { to: "/", disabled: !user, children: /* @__PURE__ */ jsx(
          "img",
          {
            src: "/tanstack-word-logo-white.svg",
            alt: "TanStack Logo",
            className: "h-10"
          }
        ) }) })
      ] }),
      /* @__PURE__ */ jsx(Activity, { mode: user ? "visible" : "hidden", children: /* @__PURE__ */ jsx("div", { onClick: () => logout(), className: "cursor-pointer", children: "Logout" }) })
    ] }),
    /* @__PURE__ */ jsxs(
      "aside",
      {
        className: `fixed top-0 left-0 h-full w-80 bg-gray-900 text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? "translate-x-0" : "-translate-x-full"}`,
        children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between p-4 border-b border-gray-700", children: /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold", children: "Navigation" }) }),
          /* @__PURE__ */ jsxs("nav", { className: "flex-1 p-4 overflow-y-auto", children: [
            /* @__PURE__ */ jsxs(
              Link,
              {
                to: "/",
                onClick: () => setIsOpen(false),
                className: "flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2",
                activeProps: {
                  className: "flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2"
                },
                children: [
                  /* @__PURE__ */ jsx(Home, { size: 20 }),
                  /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Home" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-row justify-between", children: [
              /* @__PURE__ */ jsxs(
                Link,
                {
                  to: "/patients",
                  onClick: () => setIsOpen(false),
                  activeOptions: { exact: true },
                  className: "flex-1 flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors ",
                  activeProps: {
                    className: "flex-1 flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors"
                  },
                  children: [
                    /* @__PURE__ */ jsx(StickyNote, { size: 20 }),
                    /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Patients" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: "px-2 hover:bg-gray-800 rounded-lg transition-colors",
                  onClick: () => setGroupedExpanded((prev) => ({
                    ...prev,
                    patients: !prev.patients
                  })),
                  children: groupedExpanded.patients ? /* @__PURE__ */ jsx(ChevronDown, { size: 20 }) : /* @__PURE__ */ jsx(ChevronRight, { size: 20 })
                }
              )
            ] }),
            groupedExpanded.patients && /* @__PURE__ */ jsx("div", { className: "flex flex-col ml-4", children: /* @__PURE__ */ jsxs(
              Link,
              {
                to: "/patients/new",
                onClick: () => setIsOpen(false),
                activeOptions: { exact: true },
                className: "flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2",
                activeProps: {
                  className: "flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2"
                },
                children: [
                  /* @__PURE__ */ jsx(StickyNote, { size: 20 }),
                  /* @__PURE__ */ jsx("span", { className: "font-medium", children: "New Patient" })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxs(
              Link,
              {
                to: "/orders",
                onClick: () => setIsOpen(false),
                activeOptions: { exact: true },
                className: "flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2",
                activeProps: {
                  className: "flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2"
                },
                children: [
                  /* @__PURE__ */ jsx(StickyNote, { size: 20 }),
                  /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Orders" })
                ]
              }
            )
          ] })
        ]
      }
    )
  ] });
}
function NotFound({ children }) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2 p-2", children: [
    /* @__PURE__ */ jsx("div", { className: "text-gray-600 dark:text-gray-400", children: children || /* @__PURE__ */ jsx("p", { children: "The page you are looking for does not exist." }) }),
    /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2 flex-wrap", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => window.history.back(),
          className: "bg-emerald-500 text-white px-2 py-1 rounded-sm uppercase font-black text-sm",
          children: "Go back"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: "bg-cyan-600 text-white px-2 py-1 rounded-sm uppercase font-black text-sm",
          children: "Start Over"
        }
      )
    ] })
  ] });
}
const appCss = "/assets/app-BIsVBNtM.css";
const seo = ({
  title,
  description,
  keywords,
  image
}) => {
  const tags = [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: keywords },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:creator", content: "@tannerlinsley" },
    { name: "twitter:site", content: "@tannerlinsley" },
    { name: "og:type", content: "website" },
    { name: "og:title", content: title },
    { name: "og:description", content: description },
    ...image ? [
      { name: "twitter:image", content: image },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "og:image", content: image }
    ] : []
  ];
  return tags;
};
const fetchUser_createServerFn_handler = createSsrRpc("4dd14be03b6a3bc889697fce696b6760308355fb014129c843bc0126b915798a");
const fetchUser = createServerFn({
  method: "GET"
}).handler(fetchUser_createServerFn_handler, async () => {
  const session = await useAppSession();
  if (!session.data.userEmail) {
    return null;
  }
  return {
    email: session.data.userEmail
  };
});
const Route$a = createRootRoute({
  beforeLoad: async () => {
    const user = await fetchUser();
    return {
      user
    };
  },
  head: () => ({
    meta: [
      {
        charSet: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      ...seo({
        title: "Clinica",
        description: `Simple lab tests management system.`
      })
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png"
      },
      { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      { rel: "icon", href: "/favicon.ico" }
    ]
  }),
  errorComponent: (props) => {
    return /* @__PURE__ */ jsx(RootDocument, { children: /* @__PURE__ */ jsx(DefaultCatchBoundary, { ...props }) });
  },
  notFoundComponent: () => /* @__PURE__ */ jsx(NotFound, {}),
  component: RootComponent
});
function RootComponent() {
  return /* @__PURE__ */ jsx(RootDocument, { children: /* @__PURE__ */ jsx(Outlet, {}) });
}
function RootDocument({ children }) {
  const { user } = Route$a.useRouteContext();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  return /* @__PURE__ */ jsxs("html", { children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsxs("div", { className: `transition-all duration-300 ${sidebarOpen ? "ml-80" : "ml-0"}`, children: [
        /* @__PURE__ */ jsx(Header, { user, isOpen: sidebarOpen, setIsOpen: setSidebarOpen }),
        /* @__PURE__ */ jsx("main", { className: "relative py-20 px-6 text-center overflow-hidden", children })
      ] }),
      /* @__PURE__ */ jsx(Toaster, { position: "top-right" }),
      /* @__PURE__ */ jsx(TanStackRouterDevtools, { position: "bottom-right" }),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter$8 = () => import("./signup-BmzVxdl_.js");
const Route$9 = createFileRoute("/signup")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./login-KLgzCMts.js");
const Route$8 = createFileRoute("/login")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const Route$7 = createFileRoute("/_authed")({
  beforeLoad: ({ context, location }) => {
    if (!context.user) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href
        }
      });
    }
    return {
      user: context.user
    };
  }
});
const $$splitComponentImporter$6 = () => import("./index-BwMT9QHg.js");
const Route$6 = createFileRoute("/_authed/")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const getPatients_createServerFn_handler = createSsrRpc("940ecf381cf00c6ec826d513d4b1f59c2acebeaaa13d44039385992f416cdabe");
const getPatients = createServerFn({
  method: "GET"
}).middleware([authMiddleware]).inputValidator((params) => params).handler(getPatients_createServerFn_handler, async ({
  data
}) => {
  try {
    const limit = Math.min(data.limit || 50, 100);
    const offset = data.offset || 0;
    const where = data.name ? {
      name: {
        contains: data.name,
        mode: "insensitive"
      }
    } : {};
    const [patients, total] = await Promise.all([prismaClient.patient.findMany({
      where,
      take: limit,
      skip: offset,
      orderBy: {
        name: "asc"
      },
      include: {
        _count: {
          select: {
            orders: true
          }
        }
      }
    }), prismaClient.patient.count({
      where
    })]);
    return {
      patients,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    };
  } catch (error) {
    throw new Error("Failed to fetch patients");
  }
});
const $$splitComponentImporter$5 = () => import("./index-CXmqFf4s.js");
const Route$5 = createFileRoute("/_authed/patients/")({
  loader: () => getPatients({
    data: {
      limit: 5,
      offset: 0
    }
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const getOrders_createServerFn_handler = createSsrRpc("66e4aa56b5ca900a69c32e51241283820c0b97e11da5c2bd58401096921d465b");
const getOrders = createServerFn({
  method: "GET"
}).middleware([authMiddleware]).inputValidator((params) => params).handler(getOrders_createServerFn_handler, async ({
  data
}) => {
  try {
    const limit = Math.min(data.limit || 50, 100);
    const offset = data.offset || 0;
    const where = {};
    if (data.orderNumber) {
      where.orderNumber = {
        contains: data.orderNumber,
        mode: "insensitive"
      };
    }
    if (data.patientName) {
      where.patient = {
        name: {
          contains: data.patientName,
          mode: "insensitive"
        }
      };
    }
    if (data.status) {
      where.status = data.status;
    }
    const [orders, total] = await Promise.all([prismaClient.order.findMany({
      where,
      take: limit,
      skip: offset,
      orderBy: {
        createdAt: "desc"
      },
      include: {
        patient: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true
          }
        },
        orderItems: {
          include: {
            labTest: {
              select: {
                id: true,
                code: true,
                name: true
              }
            }
          }
        },
        _count: {
          select: {
            orderItems: true
          }
        }
      }
    }), prismaClient.order.count({
      where
    })]);
    return {
      orders,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch orders");
  }
});
const $$splitComponentImporter$4 = () => import("./index-CrKOfjx_.js");
const Route$4 = createFileRoute("/_authed/orders/")({
  loader: () => getOrders({
    data: {
      limit: 25,
      offset: 0
    }
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./new-CbxgiC6z.js");
const Route$3 = createFileRoute("/_authed/patients/new")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const getPatient_createServerFn_handler = createSsrRpc("04bb5248c9b0d87d1a94364c317de5f8a2b77fabff80364eb6cf167f1032d41c");
const getPatient = createServerFn({
  method: "GET"
}).middleware([authMiddleware]).inputValidator((params) => params).handler(getPatient_createServerFn_handler, async ({
  data
}) => {
  try {
    const patient = await prismaClient.patient.findUnique({
      where: {
        id: data.id
      },
      include: {
        orders: {
          orderBy: {
            createdAt: "desc"
          },
          take: 10,
          include: {
            orderItems: {
              include: {
                labTest: true
              }
            }
          }
        },
        _count: {
          select: {
            orders: true
          }
        }
      }
    });
    if (!patient) {
      throw new Error("Patient not found");
    }
    return patient;
  } catch (error) {
    throw new Error("Failed to fetch patient");
  }
});
const $$splitComponentImporter$2 = () => import("./index-BiCW4VuX.js");
const Route$2 = createFileRoute("/_authed/patients/$patientId/")({
  loader: ({
    params
  }) => getPatient({
    data: {
      id: params.patientId
    }
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const getOrder_createServerFn_handler = createSsrRpc("c88486d987bc781979795812a800e00a629ba1bda12b61cd59fb5fad1b1c1b16");
const getOrder = createServerFn({
  method: "GET"
}).middleware([authMiddleware]).inputValidator((params) => params).handler(getOrder_createServerFn_handler, async ({
  data
}) => {
  try {
    const order = await prismaClient.order.findUnique({
      where: {
        id: data.id
      },
      include: {
        patient: true,
        orderItems: {
          include: {
            labTest: true
          }
        }
      }
    });
    if (!order) {
      throw new Error("Order not found");
    }
    return order;
  } catch (error) {
    throw new Error("Failed to fetch order");
  }
});
const $$splitComponentImporter$1 = () => import("./index-CkLjIf83.js");
const Route$1 = createFileRoute("/_authed/orders/$orderId/")({
  loader: ({
    params
  }) => getOrder({
    data: {
      id: params.orderId
    }
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./edit-RBQ28qxY.js");
const Route = createFileRoute("/_authed/patients/$patientId/edit")({
  loader: ({
    params
  }) => getPatient({
    data: {
      id: params.patientId
    }
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const SignupRoute = Route$9.update({
  id: "/signup",
  path: "/signup",
  getParentRoute: () => Route$a
});
const LoginRoute = Route$8.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$a
});
const AuthedRouteRoute = Route$7.update({
  id: "/_authed",
  getParentRoute: () => Route$a
});
const AuthedIndexRoute = Route$6.update({
  id: "/",
  path: "/",
  getParentRoute: () => AuthedRouteRoute
});
const AuthedPatientsIndexRoute = Route$5.update({
  id: "/patients/",
  path: "/patients/",
  getParentRoute: () => AuthedRouteRoute
});
const AuthedOrdersIndexRoute = Route$4.update({
  id: "/orders/",
  path: "/orders/",
  getParentRoute: () => AuthedRouteRoute
});
const AuthedPatientsNewRoute = Route$3.update({
  id: "/patients/new",
  path: "/patients/new",
  getParentRoute: () => AuthedRouteRoute
});
const AuthedPatientsPatientIdIndexRoute = Route$2.update({
  id: "/patients/$patientId/",
  path: "/patients/$patientId/",
  getParentRoute: () => AuthedRouteRoute
});
const AuthedOrdersOrderIdIndexRoute = Route$1.update({
  id: "/orders/$orderId/",
  path: "/orders/$orderId/",
  getParentRoute: () => AuthedRouteRoute
});
const AuthedPatientsPatientIdEditRoute = Route.update({
  id: "/patients/$patientId/edit",
  path: "/patients/$patientId/edit",
  getParentRoute: () => AuthedRouteRoute
});
const AuthedRouteRouteChildren = {
  AuthedIndexRoute,
  AuthedPatientsNewRoute,
  AuthedOrdersIndexRoute,
  AuthedPatientsIndexRoute,
  AuthedPatientsPatientIdEditRoute,
  AuthedOrdersOrderIdIndexRoute,
  AuthedPatientsPatientIdIndexRoute
};
const AuthedRouteRouteWithChildren = AuthedRouteRoute._addFileChildren(
  AuthedRouteRouteChildren
);
const rootRouteChildren = {
  AuthedRouteRoute: AuthedRouteRouteWithChildren,
  LoginRoute,
  SignupRoute
};
const routeTree = Route$a._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    defaultPreload: "intent",
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: () => /* @__PURE__ */ jsx(NotFound, {}),
    scrollRestoration: true
  });
  setupRouterSsrQueryIntegration({
    router: router2,
    queryClient
  });
  return router2;
}
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$9 as R,
  Route$8 as a,
  getOrders as b,
  createSsrRpc as c,
  Route$2 as d,
  Route$1 as e,
  Route as f,
  getPatients as g,
  router as r,
  useServerFn as u
};
