import * as mongoDB from 'mongodb'
import { IntentReply } from '../models/Intent-reply'

export function buildFindReply(options: {
    getIntentReplyCollection: () => mongoDB.Collection<IntentReply>
}) {
    const { getIntentReplyCollection } = options

    return async function findReply(
        intent: string
    ): Promise<IntentReply | null> {
        const intentReply = await getIntentReplyCollection().findOne({
            name: intent,
        })
        return intentReply
    }
}
