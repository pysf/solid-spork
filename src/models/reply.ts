import { ObjectId } from 'mongodb'

export interface Reply {
    _id?: ObjectId
    name: string
    description: string
    reply: {
        id: string
        text: string
    }
}
