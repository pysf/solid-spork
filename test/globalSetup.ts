import { MongoMemoryServer } from 'mongodb-memory-server'

export default async function (globalConfig: any, projectConfig: any) {
    const instance = await MongoMemoryServer.create()
    const uri = instance.getUri()
    process.env.MONGODB_URI = uri.slice(0, uri.lastIndexOf('/'))
    ;(global as any).__MONGOINSTANCE = instance
}
