import { a as createServerRpc, c as createServerFn } from "../server.js";
import { p as prismaClient } from "./prisma-DiAJCEci.js";
import { a as authMiddleware } from "./middleware-leKOZ4bV.js";
import { OrderStatus } from "@prisma/client";
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
import "./session-CRRQK3Ha.js";
const deleteOrder_createServerFn_handler = createServerRpc("86f303f442bd6a6cd2200a3b53b5498707cf3134f40c6dc657d3f51d7acd4433", (opts, signal) => {
  return deleteOrder.__executeServer(opts, signal);
});
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
export {
  deleteOrder_createServerFn_handler
};
