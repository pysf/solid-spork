import { buildFindReply } from '../../src/services/find-reply'
import { db } from '../../src/mongodb'
import seeder from '../utils/seeder'
import { buildDBConnector, client } from '../../src/mongodb/connection'
import config from 'config'

beforeAll(async () => {
    const connectToDB = buildDBConnector({
        DB_NAME: config.get('DB_NAME'),
        INTENT_REPLY_COLLECTION: config.get('INTENT_REPLY_COLLECTION'),
        // @ts-ignore
        MONGODB_URI: process.env.MONGODB_URI,
    })
    return connectToDB()
})

afterAll(async () => {
    return client.close()
})

beforeEach(() => {
    return seeder.seed()
})

afterEach(() => {
    return seeder.cleanup()
})

describe('service: search and find reply by name', () => {
    describe('receives an intention text and find appripriate reply ', () => {
        describe('given a valid name', () => {
            it('must return corresponding reply message', async () => {
                const findReply = buildFindReply({
                    getReplyCollection: db.getReplyCollection,
                })

                const result = await findReply('Affirmative')
                expect(result).toBeTruthy()
                // @ts-ignore
                expect(result.name).toEqual('Affirmative')
            })
        })
    })
})
