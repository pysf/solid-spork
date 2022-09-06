import axios from "axios";
import config from "config";
import { getIntentReplyCollection } from "../mongodb/connection";
import { buildFindIntentReply } from "./find-intent-reply";
import { buildFindIntention } from "./find-intention";

const httpClient = axios.create({
  baseURL: config.get("INTENT_API_BASE_URL"),
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    authorization: config.get("INTENT_API_TOKEN"),
  },
});

const findIntention = buildFindIntention({ httpClient });

const findIntentReply = buildFindIntentReply({
  getIntentReplyCollection,
});

export { findIntention, findIntentReply };
