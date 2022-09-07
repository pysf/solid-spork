import * as mongoDB from 'mongodb'
import { Reply } from '../models/reply'

export function buildFindReply(options: {
    getReplyCollection: () => mongoDB.Collection<Reply>
}) {
    const { getReplyCollection } = options

    return async function findReply(intent: string): Promise<Reply | null> {
        const reply = await getReplyCollection().findOne({
            name: intent,
        })
        return reply
    }
}
