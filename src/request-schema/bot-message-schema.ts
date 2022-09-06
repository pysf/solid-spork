import { body } from "express-validator";

export const botMessageSchema = [
  body("botId").isString(),
  body("message").isString(),
];
