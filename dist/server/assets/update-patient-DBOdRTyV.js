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
const updatePatient_createServerFn_handler = createServerRpc("b92d5239e21e866e19602ce1d1cdfe2b2dbad6d15ac052893a67171db78fb906", (opts, signal) => {
  return updatePatient.__executeServer(opts, signal);
});
const updatePatient = createServerFn({
  method: "POST"
}).middleware([authMiddleware]).inputValidator((data) => data).handler(updatePatient_createServerFn_handler, async ({
  data
}) => {
  try {
    const {
      id,
      ...updateData
    } = data;
    const patient = await prismaClient.patient.update({
      where: {
        id
      },
      data: {
        ...updateData.name && {
          name: updateData.name
        },
        ...updateData.dateOfBirth && {
          dateOfBirth: new Date(updateData.dateOfBirth)
        },
        ...updateData.email !== void 0 && {
          email: updateData.email || null
        },
        ...updateData.phone !== void 0 && {
          phone: updateData.phone || null
        },
        ...updateData.address !== void 0 && {
          address: updateData.address || null
        }
      }
    });
    return patient;
  } catch (error) {
    throw new Error("Failed to update patient");
  }
});
export {
  updatePatient_createServerFn_handler
};
