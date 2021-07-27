const express = require('express');
const competitionController = require('../controllers/competitionController');
const competitionRouter = express.Router();

competitionRouter.get('/', competitionController.getCompetitions);

competitionRouter.get(
  '/:competitionTitle',
  competitionController.getCompetitionByTitle
);

competitionRouter.post('/', competitionController.createCompetition);

module.exports = competitionRouter;
