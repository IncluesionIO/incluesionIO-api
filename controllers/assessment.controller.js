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

//assessment link https://docs.google.com/forms/d/e/1FAIpQLSeOlhoiEprxE07v1oOCbniEi2mxp874GN2jObi2aqgPvdGW9g/viewform?usp=pp_url&entry.873971165=somerandomcompany-donotchange