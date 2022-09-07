import { client } from '../../src/mongodb/connection'
import config from 'config'

import replyData from '../data/intent_reply_examples.json'

import { buildReplySeeder } from '../../src/seeder/reply-seeder'
import { Reply } from '../../src/models/reply'

async function seedDb() {
    const data: Reply[] = JSON.parse(JSON.stringify(replyData))
    const seeder = buildReplySeeder({
        getReplyCollection: () =>
            client
                .db(config.get('DB_NAME'))
                .collection(config.get('INTENT_REPLY_COLLECTION')),
        replyData: data,
    })
    await seeder()
}

async function cleanUpDb() {
    await client.db(config.get('DB_NAME')).dropDatabase()
}

export default {
    seed: seedDb,
    cleanup: cleanUpDb,
}
