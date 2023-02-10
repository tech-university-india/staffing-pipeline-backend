const express = require('express');
const { getProject, listProjects, deleteProject } = require('../controllers/project.controller');
const projectRouter = express.Router();

projectRouter.route('/').get(listProjects);

projectRouter.route('/:id').get(getProject).delete(deleteProject);

module.exports = projectRouter;
