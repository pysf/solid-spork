import { ObjectId } from 'mongodb'

export interface IntentReply {
    id?: ObjectId
    name: string
    description: string
    reply: {
        id: string
        text: string
    }
}
