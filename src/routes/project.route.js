const express = require('express');
const projectController = require('../controllers/project.controller');
const authMiddlewares = require('../middlewares/request.validator');
const projectRouter = express.Router();

projectRouter.get('/', authMiddlewares.reqAuthValidator, projectController.listProjects);
projectRouter.get('/:id', authMiddlewares.reqAuthValidator, projectController.getProject);

module.exports = projectRouter;
