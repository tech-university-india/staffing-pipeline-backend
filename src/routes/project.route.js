const express = require('express');
const { getProject, listProjects } = require('../controllers/project.controller');
const projectRouter = express.Router();

projectRouter.route('/').get(listProjects);
projectRouter.route('/:id').get(getProject);

module.exports = projectRouter;
