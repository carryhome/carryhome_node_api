const path = require('path')

const endFileName = `.env${process.env.NODE_ENV && `.${process.env.NODE_ENV}`}`
const pathToEnvFile = path.resolve(__dirname, endFileName)
require('dotenv').config({ path: pathToEnvFile })

