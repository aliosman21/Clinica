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
const deletePatient_createServerFn_handler = createServerRpc("9fb36a3bc07db7f995bfaf430ef6864612da15a3b35e379d7deb968238d76812", (opts, signal) => {
  return deletePatient.__executeServer(opts, signal);
});
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
export {
  deletePatient_createServerFn_handler
};
