const express = require('express')

const router = express.Router()

const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const swaggerOpts = {
  swaggerDefinition: {
    info: {
      title: 'incluesionio-api',
      description: 'API documentation for incluesionIO server',
      version: '1.0.0',
      contact: {
        name: 'Daniel Tejeda'
      },
      servers: [`http://localhost:${process.env.PORT}`]
    }
  },
  apis: ["./routes/*.route.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOpts)

console.log(swaggerDocs)

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs))


module.exports = router