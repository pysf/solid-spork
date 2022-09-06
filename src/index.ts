import express from 'express'
import config from 'config'
import { connectToDB } from './mongodb/connection'
import router from './routes'
import { seedRepliesIntoDB } from './seeder'

const app = express()

connectToDB()
    .then(async () => {
        await seedRepliesIntoDB()

        app.use(express.json())
        app.use(express.urlencoded({ extended: true }))
        app.use(router)

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
