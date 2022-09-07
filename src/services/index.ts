import axios from 'axios'
import config from 'config'
import { db } from '../mongodb'
import { buildFindReply } from './find-reply'
import { buildFindIntention } from './find-intention'

const httpClient = axios.create({
    baseURL: config.get('INTENT_API_BASE_URL'),
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        authorization: config.get('INTENT_API_TOKEN'),
    },
})

const findIntention = buildFindIntention({ httpClient })

const findReply = buildFindReply({
    getReplyCollection: db.getReplyCollection,
})

export { findIntention, findReply }
