import { a as createServerRpc, c as createServerFn } from "../server.js";
import { p as prismaClient } from "./prisma-DiAJCEci.js";
import { a as authMiddleware } from "./middleware-leKOZ4bV.js";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core";
import "node:async_hooks";
import "@tanstack/router-core/ssr/server";
import "h3-v2";
import "tiny-invariant";
import "seroval";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
import "@tanstack/react-router";
import "@prisma/client";
import "./session-CRRQK3Ha.js";
const getOrder_createServerFn_handler = createServerRpc("c88486d987bc781979795812a800e00a629ba1bda12b61cd59fb5fad1b1c1b16", (opts, signal) => {
  return getOrder.__executeServer(opts, signal);
});
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
export {
  getOrder_createServerFn_handler
};
