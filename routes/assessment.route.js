const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const assessmentController = require('../controllers/assessment.controller')
/**
 * @swagger
 * /assessment/submitAssessment:
 *   post:
 *     tags: 
 *       - Assessment
 *     summary: Submit assessment answers
 *     description: Endpoint to record assessment answers
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: assessment
 *         schema:  
 *           type: object
 *           required:
 *             - timestamp
 *             - data
 *           properties:
 *              timestamp:
 *                type: string
 *              data:
 *                type: object
 *     responses:
 *       '200':
 *          description: A successful request, assessment recorded
 *       '422':
 *          description: There was an error in the parameters
 *       '500': 
 *          description: Internal server error
 */
router.post('/submitAssessment', 
[
  body('timestamp')
  .notEmpty()
  .withMessage('Timestamp cannot be empty!')
  .isISO8601().toDate()
  .withMessage('Invalid timestamp!'),
  body('data')
  .notEmpty()
  .withMessage('Data cannot be empty!')
  .isObject()
  .withMessage('Data must be an object!')
], assessmentController.submitAssessment)

module.exports = router