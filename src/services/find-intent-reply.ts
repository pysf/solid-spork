import * as mongoDB from "mongodb";
import { IntentReply } from "../models/Intent-reply";

export function buildFindIntentReply(options: {
  getIntentReplyCollection: () => mongoDB.Collection<IntentReply>;
}) {
  const { getIntentReplyCollection } = options;

  return async function findIntentReply(
    intent: string
  ): Promise<IntentReply | null> {
    const intentReply = await getIntentReplyCollection().findOne({
      name: intent,
    });
    return intentReply;
  };
}
