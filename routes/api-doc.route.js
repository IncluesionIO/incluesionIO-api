const express = require('express')

const router = express.Router()

const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const swaggerOpts = {
  swaggerDefinition: {
    info: {
      title: 'incluesionio-api',
      description: '',
      contact: {
        name: 'Daniel Tejeda'
      },
      servers: [`http://localhost:${process.env.PORT}`]
    }
  },
  apis: ["*.routes.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOpts)

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs))


module.exports = router