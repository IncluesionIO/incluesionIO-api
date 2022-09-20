const express = require('express')
const { body } = require('express-validator')

const router = express.Router()

const authController = require('../controllers/auth.controller')

router.post('/login', authController.login)

router.post('/reset', body('input').not().isEmpty().withMessage('Input required, email or username!') ,authController.postPasswordReset)

//Set up to test
// router.post('/testEmail', authController.emailTest)

module.exports = router