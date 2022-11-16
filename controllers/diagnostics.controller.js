const { getValidationResults } = require("../util/getValidationResult");

//Import the diagnostics model
const Diagnostics = require("../models/diagnostics.model");
const { errorResponseHandler } = require("../util/errorHandler");

exports.createDiagnostic = (req, res, next) => {
  getValidationResults(req);

  const diagnostics = new Diagnostics({
    companyID: req.body.companyID,
    userID: req.body.userID,
    timestamp: req.body.timestamp,
    data: req.body.data,
  });

  diagnostics
    .save()
    .then((doc) => {
      res.status(200).json({ message: "Diagnostic Report submitted!" });
    })
    .catch((err) => {
      errorResponseHandler(err, req, res, next);
    });
};

exports.getDiagnostics = (req, res, next) => {
  getValidationResults(req);
  
  if (req.user.companyID.toString() !== req.params.companyID) {
    return res.status(401).json({ message: "Not authorized!" });
  }
  Diagnostics.find({ companyID: req.params.companyID })
    .then((docList) => {
      if (!docList) {
        return res.status(404).json({ message: "No diagnostics found!" });
      }
      return res.status(200).json(docList);
    })
    .catch((err) => {
      errorResponseHandler(err, req, res, next);
    });
};

exports.getDiagnostic = (req, res, next) => {
  getValidationResults(req);

  Diagnostics.findById(req.params.diagnosticId)
    .then((doc) => {
      if (!doc) {
        return res.status(404).json({ message: "No diagnostic found!" });
      }
      if (req.user.companyID.toString() !== doc.companyID.toString()) {
        return res.status(401).json({ message: "Not authorized!" });
      }
      return res.status(200).json(doc);
    })
    .catch((err) => {
      errorResponseHandler(err, req, res, next);
    });
};

exports.deleteDiagnostic = (req, res, next) => {
  getValidationResults(req);

  Diagnostics.deleteOne({_id: req.params.diagnosticId, companyID: req.user.companyID})
    .then((doc) => {
      if (!doc) {
        return res.status(404).json({ message: "File not found" });
      }

      return res.status(200).json({ message: "Diagnostic Deleted" });
    })
    .catch((err) => {
      errorResponseHandler(err, req, res, next);
    });
};
