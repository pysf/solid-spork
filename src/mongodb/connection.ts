import * as mongoDB from 'mongodb'
import { Reply } from '../models/reply'

export const collections: { reply?: mongoDB.Collection<Reply> } = {}

export let client: mongoDB.MongoClient

export function buildDBConnector(options: {
    MONGODB_URI: string
    DB_NAME: string
    INTENT_REPLY_COLLECTION: string
}) {
    const { DB_NAME, MONGODB_URI, INTENT_REPLY_COLLECTION } = options

    return async function connectToDB() {
        client = new mongoDB.MongoClient(MONGODB_URI)

        await client.connect()
        const db = client.db(DB_NAME)

        collections.reply = db.collection(INTENT_REPLY_COLLECTION)

        await collections.reply.createIndex(
            { name: 1 },
            { name: INTENT_REPLY_BY_NAME_INDEX, unique: true }
        )

        // console.log(`Successfully connected to database: ${db.databaseName}`)
    }
}

const INTENT_REPLY_BY_NAME_INDEX = 'intent_reply_by_name'
