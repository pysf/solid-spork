import config from 'config'
import { findIntention, findReply } from '../services'

import { buildGetReply } from './get-reply'

const getReply = buildGetReply({
    findReply,
    findIntention,
    getDefaultReply: function getDefaultMessage() {
        return config.get('DEFAULT_REPLY_MESSAGE')
    },
})

export { getReply }
