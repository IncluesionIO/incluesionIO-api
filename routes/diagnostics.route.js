const express = require("express");
const { body, param } = require("express-validator");

const diagnosticController = require("../controllers/diagnostics.controller");
const isAuth = require("../middleware/isAuth");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();
/**
 * @swagger
 * /diagnostic/submitDiagnostic:
 *   post:
 *     tags:
 *       - Diagnostic
 *     summary: Create a diagnostic report
 *     description: Creates a diagnostic report on the database
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: diagnostic
 *         schema:
 *           type: object
 *           required:
 *             - companyID
 *             - timestamp
 *             - data
 *         properties:
 *           companyID:
 *             type: string
 *           userID:
 *             type: string
 *           timestamp:
 *             type: Date
 *           data:
 *             type: Object
 *     responses:
 *         '200':
 *           description: A successful request, diagnostic recorded.
 *         '422':
 *           description: There was an error in the parameters for the api call.
 *         '500':
 *           description: Internal server error
 */
router.post(
  "/submitDiagnostic",
  [
    body("companyID").trim().notEmpty().withMessage("Compnay ID is required!"),
    body("timestamp")
      .notEmpty()
      .withMessage("Timestamp cannot be empty!")
      .isISO8601()
      .toDate()
      .withMessage("Invalid timestamp!"),
    body("data")
      .notEmpty()
      .withMessage("Data is required!")
      .isObject()
      .withMessage("Data must be an object!"),
  ],
  diagnosticController.createDiagnostic
);

/**
 * @swagger
 * /diagnostic/all/{companyID}:
 *   get:
 *     tags:
 *       - Diagnostic
 *     summary: Get a list of diagnostics from company
 *     description: Get a list of diagnostics from company
 *     responses:
 *         '200':
 *           description: A successful request, diagnostic list retrieved.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 properties:
 *                   data:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       companyID:
 *                         type: string
 *                       timestamp:
 *                         type: string
 *                       data:
 *                         type: object
 *         '404':
 *           description: No diagnostics reports were found
 *         '422':
 *           description: There was an error in the parameters for the api call.
 *         '500':
 *           description: Internal server error
 */
 router.get(
  "/all/:companyID",
  [
    param("companyID").trim().notEmpty().withMessage("Compnay ID is required!"),
  ],
  isAuth, isAdmin, diagnosticController.getDiagnostics
);

/**
 * @swagger
 * /diagnostic/{diagnosticId}:
 *   get:
 *     tags:
 *       - Diagnostic
 *     summary: Get a diagnostics from company
 *     description: Get a diagnostics from company
 *     responses:
 *         '200':
 *           description: A successful request, diagnostic retrieved.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   data:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       companyID:
 *                         type: string
 *                       timestamp:
 *                         type: string
 *                       data:
 *                         type: object
 *         '404':
 *           description: No diagnostic reports were found
 *         '422':
 *           description: There was an error in the parameters for the api call.
 *         '500':
 *           description: Internal server error
 */
 router.get(
  "/:diagnosticId",
  [
    param("diagnosticId").trim().notEmpty().withMessage("Diagnostic Id is required!"),
  ],
  isAuth, isAdmin, diagnosticController.getDiagnostic
);

/**
 * @swagger
 * /diagnostic/{diagnosticId}:
 *   delete:
 *     tags:
 *       - Diagnostic
 *     summary: Delete a diagnostics from company
 *     description: Delete a diagnostics from company
 *     responses:
 *         '200':
 *           description: A successful request, diagnostic deleted.
 *         '404':
 *           description: No diagnostic reports were found
 *         '422':
 *           description: There was an error in the parameters for the api call.
 *         '500':
 *           description: Internal server error
 */
 router.delete(
  "/:diagnosticId",
  [
    param("diagnosticId").trim().notEmpty().withMessage("Diagnostic Id is required!"),
  ],
  isAuth, isAdmin, diagnosticController.deleteDiagnostic
);

module.exports = router