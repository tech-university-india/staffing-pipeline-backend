const express = require('express');
const { getProject } = require('../controllers/project.controller');

const projectRouter = express.Router();

projectRouter.route('/:id').get(getProject);

module.exports = projectRouter;
