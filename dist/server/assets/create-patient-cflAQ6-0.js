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
const createPatient_createServerFn_handler = createServerRpc("ef99fa68986f704a3b4faad8aa951c748224e97076d74f49ac79a6870214a0ef", (opts, signal) => {
  return createPatient.__executeServer(opts, signal);
});
const createPatient = createServerFn({
  method: "POST"
}).middleware([authMiddleware]).inputValidator((data) => data).handler(createPatient_createServerFn_handler, async ({
  data
}) => {
  try {
    const patient = await prismaClient.patient.create({
      data: {
        name: data.name,
        dateOfBirth: new Date(data.dateOfBirth),
        email: data.email || null,
        phone: data.phone || null,
        address: data.address || null
      }
    });
    return patient;
  } catch (error) {
    throw new Error("Failed to create patient");
  }
});
export {
  createPatient_createServerFn_handler
};
