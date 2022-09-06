import { IntentReply } from '../models/Intent-reply'
import { IntentRecognitionResponse } from '../services/find-intention'

export function buildGetReply(options: {
    findIntention: (
        botId: string,
        message: string
    ) => Promise<IntentRecognitionResponse | null>
    findReply: (message: string) => Promise<IntentReply | null>
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

        const intentReply = await findReply(highestConfidence.name)
        if (!intentReply) {
            //todo: invistigate if this should be reported as inconsistency or lack of IntentReply
            return getDefaultReply()
        }

        return intentReply.reply.text
    }
}
