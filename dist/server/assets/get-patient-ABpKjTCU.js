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
const getPatient_createServerFn_handler = createServerRpc("04bb5248c9b0d87d1a94364c317de5f8a2b77fabff80364eb6cf167f1032d41c", (opts, signal) => {
  return getPatient.__executeServer(opts, signal);
});
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
export {
  getPatient_createServerFn_handler
};
