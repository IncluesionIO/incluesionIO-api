const express = require("express");
const { body } = require("express-validator/check");

const Company = require("../models/company.model");
const companyController = require("../controllers/company.controller");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

/**
 * @swagger
 * /company/create:
 *   post:
 *     tags:
 *       - Company
 *     summary: Create a company account
 *     description: Used to create a company record
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: company
 *         schema:
 *           type: object
 *           required:
 *             - name
 *             - organizationType
 *             - industry
 *             - contactEmail
 *             - supportEmail
 *           properties:
 *              name: String
 *              organizationType: String
 *              industry: String
 *              contactEmail: String
 *              supportEmail: String
 *     responses:
 *       '200':
 *          description: A successful request, company is created
 *       '422':
 *          description: There was an error in the parameters
 *       '500':
 *          description: Internal server error
 */
router.post(
  "/create",
  [
    body("name").not().isEmpty().withMessage("Company Name is required!"),
    body("organizationType")
      .not()
      .isEmpty()
      .withMessage("Organization Type cannot be empty!"),
    body("industry").not().isEmpty().withMessage("Industry cannot be empty!"),
    body("contactEmail")
      .not()
      .isEmpty()
      .isEmail()
      .withMessage("Contact Email cannot be empty!"),
    body("supportEmail")
      .not()
      .isEmpty()
      .isEmail()
      .withMessage("Support Email cannot be empty!"),
  ],
  isAuth,
  companyController.createCompany
);

/**
 * @swagger
 * /company/get/:id:
 *   get:
 *     summary: Retrieve a single specified Company
 *     description: Used to get a Company and their Information
 *     responses:
 *       '200':
 *          description: A successful request, existing company returned
 *       '404':
 *          description: A failed request, company not found
 *       '500':
 *          description: Internal server error
 */
router.get("/get/:id", isAuth, companyController.getCompany);

module.exports = router;
