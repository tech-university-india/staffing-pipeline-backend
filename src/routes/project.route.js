const express=require('express');
const {getProject,listProjects,createProject,deleteProject,updateProject}=require('../controllers/project.controller');
const projectRouter=express.Router();

projectRouter.route('/')
  .get(listProjects)
  .post(createProject);
projectRouter.route('/:id')
  .get(getProject)
  .patch(updateProject)
  .delete(deleteProject);

module.exports=projectRouter;