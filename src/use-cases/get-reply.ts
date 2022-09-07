import { Reply } from '../models/reply'
import { IntentRecognitionResponse } from '../services/find-intention'

export function buildGetReply(options: {
    findIntention: (
        botId: string,
        message: string
    ) => Promise<IntentRecognitionResponse | null>
    findReply: (message: string) => Promise<Reply | null>
    getDefaultReply: () => Promise<string>
}) {
    const { findIntention, findReply, getDefaultReply } = options

    return async function getReply(
        botId: string,
        message: string
    ): Promise<string | null> {
        const intentResponse = await findIntention(botId, message)
        if (!intentResponse) {
            return getDefaultReply()
        }

        const highestConfidence = intentResponse.intents.reduce(
            (prev, curr) => {
                return prev.confidence > curr.confidence ? prev : curr
            }
        )

        const reply = await findReply(highestConfidence.name)
        if (!reply) {
            //todo: invistigate if this should be reported as inconsistency or lack of reply
            return getDefaultReply()
        }

        return reply.reply.text
    }
}
