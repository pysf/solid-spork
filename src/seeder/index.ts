import intentReplyData from "./intent_reply_examples.json";
import { IntentReply } from "../models/Intent-reply";
import { getIntentReplyCollection } from "../mongodb/connection";
import { buildSeedIntentReply } from "./intent-reply-seeder";

const data: IntentReply[] = JSON.parse(JSON.stringify(intentReplyData));
const intentReplySeeder = buildSeedIntentReply({
  getIntentReplyCollection,
  intentReplyData: data,
});

export { intentReplySeeder };
