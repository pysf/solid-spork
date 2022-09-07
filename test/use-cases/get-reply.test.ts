import { Reply } from '../../src/models/reply'
import { buildGetReply } from '../../src/use-cases/get-reply'
import { IntentRecognitionResponse } from '../../src/services/find-intention'

describe('use-case: get-reply', () => {
    describe("receives user's message and send smart reply message ", () => {
        describe('given a valid message and botId ', () => {
            it('it must return a valid reply', async () => {
                const findReplyMock = jest.fn(
                    async (message: string): Promise<Reply> => {
                        return getSampleReply()
                    }
                )

                const findIntentionMock = jest.fn(
                    async (
                        botId: string,
                        message: string
                    ): Promise<IntentRecognitionResponse> => {
                        return getSampleIntentRecognitionResponse()
                    }
                )

                const getDefaultReplyMock = jest.fn(
                    async (): Promise<string> => {
                        return 'default-message'
                    }
                )

                const getReply = buildGetReply({
                    findReply: findReplyMock,
                    findIntention: findIntentionMock,
                    getDefaultReply: getDefaultReplyMock,
                })

                const chatMessage = {
                    botId: '123',
                    message: 'bye',
                }
                await getReply(chatMessage.botId, chatMessage.message)

                expect(findReplyMock.mock.calls.length).toBe(1)
                expect(findIntentionMock.mock.calls.length).toBe(1)
                expect(getDefaultReplyMock.mock.calls.length).toBe(0)

                expect(findIntentionMock.mock.calls[0][0]).toBe(
                    chatMessage.botId
                )
                expect(findIntentionMock.mock.calls[0][1]).toBe(
                    chatMessage.message
                )
            })
        })

        describe('given an unknow message and a valid botId ', () => {
            it('it must return the default reply', async () => {
                const findReplyMock = jest.fn(
                    async (message: string): Promise<Reply | null> => {
                        return null
                    }
                )

                const findIntentionMock = jest.fn(
                    async (
                        botId: string,
                        message: string
                    ): Promise<IntentRecognitionResponse | null> => {
                        return null
                    }
                )

                const defaultMessage = 'default-message'
                const getDefaultReplyMock = jest.fn(
                    async (): Promise<string> => {
                        return defaultMessage
                    }
                )

                const getReply = buildGetReply({
                    findReply: findReplyMock,
                    findIntention: findIntentionMock,
                    getDefaultReply: getDefaultReplyMock,
                })

                const chatMessage = {
                    botId: '123',
                    message: 'bye',
                }

                const got = await getReply(
                    chatMessage.botId,
                    chatMessage.message
                )

                expect(findReplyMock.mock.calls.length).toBe(0)
                expect(findIntentionMock.mock.calls.length).toBe(1)
                expect(getDefaultReplyMock.mock.calls.length).toBe(1)

                expect(got).toBe(defaultMessage)
            })
        })
    })
})

function getSampleReply(): Reply {
    return {
        name: 'Goodbye',
        description: 'The visitor says goodbye.',
        reply: {
            id: '9ba88034a89e4fdbb532bdb092717fa1',
            text: 'Goodbye, have a nice day!',
        },
    }
}

function getSampleIntentRecognitionResponse(): IntentRecognitionResponse {
    return {
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
    }
}
