require('dotenv').config()
import './env'
import { initClientDbConnection } from './src/db/dbConnection'
import express from 'express'
import cors from 'cors'
import {swaggerSpec,swaggerOptions} from './swagger_config/swagger'
import swaggerUi from 'swagger-ui-express'
import path from 'path'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import { logger } from './src/utils/logger'
import {pagination} from './src/helpers/pagination'
import {authenticate} from './src/security/auth'
import {filterTenantRecord} from './src/security/roles'
import userSecureRoute from './src/routes/secure/user'
import teamUnSecureRoute from './src/routes/unsecure/team'
import userUnSecureRoute from './src/routes/unsecure/user'

mongoose.set('useCreateIndex', true)
const app = express()
const PORT = process.env.PORT || 8080

// general config
app.set('views', path.join(__dirname, './src/views'))
app.set('view engine', 'ejs')

const corsOptions = {
  credentials: true, origin:(origin, callback)=> {
    callback(null, true)
  },
}
app.use(cors(corsOptions))
app.enable('trust proxy')
app.set('trust proxy', 1)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json({ limit: '10kb' }))
app.use(pagination)

/*API swagger documentation*/
app.use(`${process.env.BASE_PATH}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec,swaggerOptions))

/* GET home page. */
app.get('/', function(req, res){
  res.render('index.ejs')
})

/* Initialising the database connection */
global.clientConnection =  initClientDbConnection()
 
teamUnSecureRoute(app)
userUnSecureRoute(app)

/* route require authentication */
app.use(authenticate)
app.use(filterTenantRecord)
userSecureRoute(app)

/* Error handler at global level */
app.use(function (error, req, res, next) {
  if (res.headersSent) { return next(error) }
  res.status(error.status ? error.status : 500).send({ status: error.status, message: error.message })
})


app.listen(PORT, () => {
  logger.info(`Node_ENV : ${process.env.NODE_ENV}`)
  logger.info(`Server is running on port ${PORT}`)
})

