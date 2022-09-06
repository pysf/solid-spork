import * as mongoDB from "mongodb";
import config from "config";
import { IntentReply } from "../models/Intent-reply";

const collections: { intentReply?: mongoDB.Collection<IntentReply> } = {};

export function getIntentReplyCollection() {
  if (!collections.intentReply) {
    throw new Error("intentReply collection can not be null");
  }
  return collections.intentReply;
}

export async function connectToDB() {
  console.log(config.get("MONGODB_URI"));
  const client = new mongoDB.MongoClient(config.get("MONGODB_URI"));

  await client.connect();
  const db = client.db(config.get("DB_NAME"));

  collections.intentReply = db.collection(
    config.get("INTENT_REPLY_COLLECTION")
  );

  setupIndexes();
  console.log(`Successfully connected to database: ${db.databaseName}...!`);
}

const INTENT_REPLY_BY_NAME_INDEX = "intent_reply_by_name";

async function setupIndexes() {
  await getIntentReplyCollection().createIndex(
    { name: 1 },
    { name: INTENT_REPLY_BY_NAME_INDEX, unique: true }
  );
}
