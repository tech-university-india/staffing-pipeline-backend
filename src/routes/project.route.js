const express = require('express');
const projectController = require('../controllers/project.controller');
const authMiddlewares = require('../middlewares/request.validator');
const projectMiddlewares = require('../middlewares/project.validator');
const projectRouter = express.Router();

projectRouter.route('/').get(authMiddlewares.reqAuthValidator, projectController.listProjects);
projectRouter
  .route('/:id')
  .get(authMiddlewares.reqAuthValidator, projectController.getProject)
  .put(authMiddlewares.reqAuthValidator, projectMiddlewares.validateProject, projectController.updateProject);

module.exports = projectRouter;
