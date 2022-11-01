//Controller for company routes
const { validationResult } = require("express-validator");

//Import the company Model
const Company = require("../models/company.model");

exports.createCompany = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.httpStatus = 422;
    error.data = errors.array();
    throw error;
  }
  const name = req.body.name;
  const organizationType = req.body.organizationType;
  const industry = req.body.industry;
  const contactEmail = req.body.contactEmail;
  const supportEmail = req.body.supportEmail;
  const departments = req.body.departments;

  const company = new Company({
    name,
    organizationType,
    industry,
    contactEmail,
    supportEmail,
    departments,
  });

  company
    .save()
    .then((result) => {
      res.status(200).json({
        message: "Company created successfully!",
        companyId: result._id,
      });
    })
    .catch((err) => {
      const error = new Error("Company creation error!");
      error.message = err.message;
      error.data = err.errors;
      next(error);
    });
};

//Return List of Companies
exports.getCompanies = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.httpStatus = 422;
    error.data = errors.array();
    throw error;
  }

  Company.find()
    .then((companies) => {
      if (!companies) {
        const error = new Error("No companies found!");
        error.httpStatus = 404;
        throw error;
      }
      const returnList = companies.map((company) => {
        return {
          id: company._id,
          companyName: company.companyName,
          organizationType: company.organizationType,
          industry: company.industry,
          contactEmail: company.contactEmail,
          supportEmail: company.supportEmail,
          departments: company.departments,
        };
      });
      return res.status(200).json(returnList);
    })
    .catch((err) => {
      const error = new Error("Companies Retrieval error!");
      error.message = err.message;
      error.httpStatus = err.httpStatus || 500;
      error.data = err.errors;
      next(error);
    });
};
