import replyData from './intent_reply_examples.json'
import { Reply } from '../models/reply'
import { db } from '../mongodb'
import { buildReplySeeder } from './reply-seeder'

const data: Reply[] = JSON.parse(JSON.stringify(replyData))
const replySeeder = buildReplySeeder({
    getReplyCollection: db.getReplyCollection,
    replyData: data,
})

export { replySeeder }
