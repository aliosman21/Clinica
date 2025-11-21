import { u as useSession } from "../server.js";
function useAppSession() {
  return useSession({
    password: "ChangeThisBeforeShippingToProdOrYouWillBeFired"
  });
}
export {
  useAppSession as u
};
