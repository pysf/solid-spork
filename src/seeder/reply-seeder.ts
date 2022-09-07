import * as mongoDB from 'mongodb'
import { Reply } from '../models/reply'

export function buildReplySeeder(options: {
    getReplyCollection: () => mongoDB.Collection<Reply>
    replyData: Reply[]
}) {
    const { getReplyCollection, replyData: replyData } = options

    return async function replySeeder() {
        for (const reply of replyData) {
            delete reply._id

            await getReplyCollection().findOneAndReplace(
                { name: reply.name },
                reply,
                { upsert: true }
            )
        }
        // console.log('Suplied replies are saved into the DB')
    }
}
