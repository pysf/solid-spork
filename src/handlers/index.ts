import { buildBotMessageHandler } from './bot-message-handler'

import { getReply } from '../use-cases'

const botMessageHandler = buildBotMessageHandler({
    getReply,
})

export { botMessageHandler }
