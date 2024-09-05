import * as jose from "jose";
import { JWT } from "@auth/core/jwt";

const FRONTEND_PRIVATE_KEY = process.env.FRONTEND_PRIVATE_KEY as string;
const BACKEND_PUBLIC_KEY = process.env.BACKEND_PUBLIC_KEY as string;


export const signJWT = async (payload: JWT) => {
  const privateKey = await jose.importPKCS8(FRONTEND_PRIVATE_KEY, "RS512");

  return new jose.SignJWT({ ...payload })
    .setProtectedHeader({ alg: "RS512" })
    .setIssuedAt()
    .setIssuer("nextjs-auth-service")
    .setAudience("rails-api-service")
    .setExpirationTime("5m")
    .sign(privateKey);
};

export const encrypt = async (token: string) => {
  const publicKey = await jose.importSPKI(BACKEND_PUBLIC_KEY, "RSA-OAEP-512");

  return new jose.EncryptJWT({ token })
    .setProtectedHeader({ alg: "RSA-OAEP-512", enc: "A256GCM" })
    .setIssuedAt()
    .setIssuer("nextjs-auth-service")
    .setAudience("rails-api-service")
    .setExpirationTime("5m")
    .encrypt(publicKey);
};
export const decrypt = async (encryptedToken: string) => {
  const privateKey = await jose.importPKCS8(FRONTEND_PRIVATE_KEY, "RSA-OAEP-512");
  const decrypted = await jose.jwtDecrypt(encryptedToken, privateKey, {
    issuer: "nextjs-auth-service",
    audience: "rails-api-service",
  });

  const publicKey = await jose.importSPKI(BACKEND_PUBLIC_KEY, "RS512");
  const { payload } = await jose.jwtVerify(decrypted.payload.toString(), publicKey, {
    issuer: "nextjs-auth-service",
    audience: "rails-api-service",
  });

  return payload;
};
