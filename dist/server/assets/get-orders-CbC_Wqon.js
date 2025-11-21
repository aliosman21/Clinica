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
const getOrders_createServerFn_handler = createServerRpc("66e4aa56b5ca900a69c32e51241283820c0b97e11da5c2bd58401096921d465b", (opts, signal) => {
  return getOrders.__executeServer(opts, signal);
});
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
export {
  getOrders_createServerFn_handler
};
