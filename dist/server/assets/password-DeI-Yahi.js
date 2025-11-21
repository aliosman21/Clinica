import crypto from "node:crypto";
function hashPassword(password) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, "salt", 1e5, 64, "sha256", (err, derivedKey) => {
      if (err) {
        reject(err);
      } else {
        resolve(derivedKey.toString("hex"));
      }
    });
  });
}
export {
  hashPassword as h
};
