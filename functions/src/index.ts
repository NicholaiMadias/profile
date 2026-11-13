// Minimal Firebase Functions scaffold using V2 HTTP onRequest
import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

export const helloWorld = onRequest((req, res) => {
  logger.info("helloWorld invoked", { method: req.method, url: req.url });
  res.send("Hello from Firebase Functions!");
});
