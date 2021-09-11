const express = require("express");
const fs = require("fs");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const competitionFolder = path.join(
      __dirname,
      "../../public/images",
      req.body.competitionTitle
    );
    fs.mkdirSync(competitionFolder, { recursive: true });
    cb(null, competitionFolder);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
const competitionController = require("../controllers/competitionController");
const path = require("path");

const competitionRouter = express.Router();

competitionRouter.get("/", competitionController.getCompetitions);

competitionRouter.get(
  "/:competitionTitle",
  competitionController.getCompetitionByTitle
);

competitionRouter.post(
  "/create",
  upload.array("images"),
  competitionController.createCompetition
);

module.exports = competitionRouter;
