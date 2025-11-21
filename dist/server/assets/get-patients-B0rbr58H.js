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
const getPatients_createServerFn_handler = createServerRpc("940ecf381cf00c6ec826d513d4b1f59c2acebeaaa13d44039385992f416cdabe", (opts, signal) => {
  return getPatients.__executeServer(opts, signal);
});
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
export {
  getPatients_createServerFn_handler
};
