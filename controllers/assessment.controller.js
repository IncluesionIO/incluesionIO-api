//Controller file for the assessment routes
const { validationResult } = require("express-validator");

const Assessment = require("../models/assessment.model");

exports.submitAssessment = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.httpStatus = 422;
    error.data = errors.array();
    throw error;
  }

  const timestamp = req.body.timestamp;
  const data = req.body.data;
  const companyID = req.body.company_id;

  const assessment = new Assessment({
    companyID,
    timestamp,
    data,
  });

  assessment
    .save()
    .then((result) => {
      res.status(200).json({ message: "Submitted successfully" });
    })
    .catch((err) => {
      const error = new Error("Assessment submission error");
      error.message = err.message;
      error.data = err.errors;
      next(error);
    });
};

//Assessment Filtering
exports.getAssessmentByCompanyId = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.httpStatus = 422;
    error.data = errors.array();
    throw error;
  }
  Assessment.find({ companyID: req.params.companyId })
    .then((assessments) => {
      if (assessments.length < 1) {
        const error = new Error("No assessments found!");
        error.httpStatus = 404;
        throw error;
      }
      const returnList = assessments.map((assessment) => {
        return {
          companyID: assessment.companyID,
          timestamp: assessment.timestamp,
          data: assessment.data,
        };
      });
      return res.status(200).json(returnList);
    })
    .catch((err) => {
      const error = new Error("Assessments Retrieval error!");
      error.message = err.message;
      error.httpStatus = err.httpStatus || 500;
      error.data = err.errors;
      next(error);
    });
};

exports.getAssessments = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.httpStatus = 422;
    error.data = errors.array();
    throw error;
  }

  Assessment.find({companyID: req.user.companyID})
    .then((assessments) => {
      if (!assessments) {
        const error = new Error("No assessments found!");
        error.httpStatus = 404;
        throw error;
      }
      const returnList = assessments.map((assessment) => {
        return {
          companyID: assessment.companyID,
          timestamp: assessment.timestamp,
          data: assessment.data,
        };
      });
      return res.status(200).json(returnList);
    })
    .catch((err) => {
      const error = new Error("Assessments Retrieval error!");
      error.message = err.message;
      error.httpStatus = err.httpStatus || 500;
      error.data = err.errors;
      next(error);
    });
};

//assessment link https://docs.google.com/forms/d/e/1FAIpQLSeOlhoiEprxE07v1oOCbniEi2mxp874GN2jObi2aqgPvdGW9g/viewform?usp=pp_url&entry.873971165=somerandomcompany-donotchange
