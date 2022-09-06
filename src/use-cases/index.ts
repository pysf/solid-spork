import config from 'config'
import { findIntention, findIntentReply } from '../services'

import { buildGetReply } from './get-reply'

const getReply = buildGetReply({
    findIntentReply,
    findIntention,
    getDefaultReply: function getDefaultMessage() {
        return config.get('DEFAULT_REPLY_MESSAGE')
    },
})

export { getReply }
