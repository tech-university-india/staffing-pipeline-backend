const express = require('express');
<<<<<<< HEAD
const projectController = require('../controllers/project.controller');
const authMiddlewares = require('../middlewares/request.validator');
const projectRouter = express.Router();

projectRouter.get('/', authMiddlewares.reqAuthValidator, projectController.listProjects);
projectRouter.get('/:id', authMiddlewares.reqAuthValidator, projectController.getProject);
=======
const {
  getProject,
  listProjects,
  createProject,
  deleteProject,
  updateProject,
} = require('../controllers/project.controller');
const projectRouter = express.Router();

projectRouter.route('/').get(listProjects).post(createProject);
projectRouter.route('/:id').get(getProject).patch(updateProject).delete(deleteProject);
>>>>>>> 19bf866 (chore: formatting with prettier)

module.exports = projectRouter;
