const express = require('express')

const router = express.Router()

const authController = require('../controllers/auth.controller')

router.post('/login', authController.login)

//Set up to test
router.post('/testEmail', authController.emailTest)

module.exports = router