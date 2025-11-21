import { u as useAppSession } from "./session-CRRQK3Ha.js";
const createMiddleware = (options, __opts) => {
  const resolvedOptions = {
    type: "request",
    ...__opts || options
  };
  return {
    options: resolvedOptions,
    middleware: (middleware) => {
      return createMiddleware(
        {},
        Object.assign(resolvedOptions, { middleware })
      );
    },
    inputValidator: (inputValidator) => {
      return createMiddleware(
        {},
        Object.assign(resolvedOptions, { inputValidator })
      );
    },
    client: (client) => {
      return createMiddleware(
        {},
        Object.assign(resolvedOptions, { client })
      );
    },
    server: (server) => {
      return createMiddleware(
        {},
        Object.assign(resolvedOptions, { server })
      );
    }
  };
};
const authMiddleware = createMiddleware().server(async ({
  next
}) => {
  const session = await useAppSession();
  if (!session.data.userEmail) {
    throw new Error("Unauthorized: Please log in to access this resource");
  }
  return next({
    context: {
      userEmail: session.data.userEmail,
      session
    }
  });
});
export {
  authMiddleware as a
};
