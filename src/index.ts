import app from './app'
import config from 'config'
import { db } from './mongodb'
import { replySeeder } from './seeder'

db.connect()
    .then(async () => {
        await replySeeder()

        app.listen(config.get('API_PORT'), () => {
            console.log(`Server started on port: ${config.get('API_PORT')}`)
        })
    })
    .catch((err) => {
        console.log('Faild to connect to the DB ', err)
        process.exit(1)
    })

process.on('unhandledRejection', (error) => {
    throw error
})

process.on('uncaughtException', (error) => {
    console.log(error)
    // integrate Sentry to get notified
})
