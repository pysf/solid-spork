import * as mongoDB from "mongodb";
import { IntentReply } from "../models/Intent-reply";

export function buildSeedIntentReply(options: {
  getIntentReplyCollection: () => mongoDB.Collection<IntentReply>;
  intentReplyData: IntentReply[];
}) {
  const { getIntentReplyCollection, intentReplyData } = options;

  return async function seedIntentReply() {
    for (const intent of intentReplyData) {
      delete intent.id;

      await getIntentReplyCollection().findOneAndReplace(
        { name: intent.name },
        intent,
        { upsert: true }
      );
    }
    console.log("Sample intent replies are saved into the DB!");
  };
}
