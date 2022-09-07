import axios from '../mocks/axios'

import { buildFindIntention } from '../../src/services/find-intention'

describe('service: call external AI API to find message intention', () => {
    describe('receives botId and message and returns list of intentions', () => {
        describe('given a valid botId and a known message ', () => {
            it('it must return intention list', async () => {
                // @ts-ignore
                axios.post.mockResolvedValue(getSampleAPIResponse())

                // @ts-ignore
                const httpClient = axios.create()

                const findIntention = buildFindIntention({
                    httpClient,
                })

                const botId = '2789344892374'
                const message = 'hello'
                const intentions = await findIntention(botId, message)

                expect(intentions).toBeTruthy()
                // @ts-ignore
                expect(intentions.intents).toBeTruthy()
                // @ts-ignore
                expect(intentions.intents.length).not.toBe(0)

                expect(httpClient.post).toHaveBeenCalled()
                expect(httpClient.post).toHaveBeenCalledWith('/api/intents', {
                    botId,
                    message,
                })
            })
        })
    })
})

function getSampleAPIResponse() {
    return {
        status: 200,
        data: {
            intents: [
                {
                    confidence: 0.7473582625389099,
                    name: 'Goodbye',
                },
                {
                    confidence: 0.2405167520046234,
                    name: 'Greeting',
                },
                {
                    confidence: 0.005191146396100521,
                    name: 'Affirmative',
                },
                {
                    confidence: 0.0030139682348817587,
                    name: 'Thank you',
                },
                {
                    confidence: 0.001901986775919795,
                    name: 'Returning order',
                },
            ],
        },
    }
}
