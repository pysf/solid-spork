import { Router } from "express";
import { botMessageHandler } from "../handlers";
import { requestValidator } from "../middlewares";
import { botMessageSchema } from "../request-schema";

const router = Router();

router.post(
  "/bot/message",
  botMessageSchema,
  requestValidator,
  botMessageHandler
);

export default router;
