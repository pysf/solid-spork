import { buildDBConnector, client, collections } from './connection'
import config from 'config'

const connect = buildDBConnector({
    DB_NAME: config.get('DB_NAME'),
    INTENT_REPLY_COLLECTION: config.get('INTENT_REPLY_COLLECTION'),
    MONGODB_URI: config.get('MONGODB_URI'),
})

const db = {
    connect,
    getClient: () => {
        if (!client) {
            throw new Error('db client can not be null')
        }
        return client
    },
    getReplyCollection: () => {
        if (!collections.reply) {
            throw new Error('reply collection can not be null')
        }
        return collections.reply
    },
}

export { db }
