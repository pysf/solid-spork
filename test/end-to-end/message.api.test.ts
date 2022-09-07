import supertest from 'supertest'
import app from '../../src/app'

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

describe('api: send message', () => {
    describe('receives a message and send a reply', () => {
        describe('given a valid botId and a known message', () => {
            it('must return a meaningful message', async () => {
                const { body } = await supertest(app)
                    .post('/bot/message')
                    .send({
                        botId: config.get('VALID_BOT_ID'),
                        message: 'hello',
                    })
                    .expect(200)

                expect(body).toBeTruthy()
                expect(body.message).toBeTruthy()
            })
        })

        describe('given a valid botId and a unclear message', () => {
            it('must return a default message', async () => {
                const { body } = await supertest(app)
                    .post('/bot/message')
                    .send({
                        botId: config.get('VALID_BOT_ID'),
                        message: 'very unclear message',
                    })
                    .expect(200)

                expect(body).toBeTruthy()
                expect(body.message).toBeTruthy()
                expect(body.message).toEqual(
                    config.get('DEFAULT_REPLY_MESSAGE')
                )
            })
        })

        describe('given only botId', () => {
            it('must return a 400 error', async () => {
                await supertest(app)
                    .post('/bot/message')
                    .send({
                        botId: config.get('VALID_BOT_ID'),
                    })
                    .expect(400)
            })
        })
    })
})
