import { MongoMemoryServer } from 'mongodb-memory-server'

export default async function (globalConfig: any, projectConfig: any) {
    const instance: MongoMemoryServer = (global as any).__MONGOINSTANCE
    await instance.stop()
}
