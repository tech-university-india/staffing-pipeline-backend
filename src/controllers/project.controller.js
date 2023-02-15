const projectService = require('../services/project.service');
const userService = require('../services/user.service');
const { HttpError } = require('../utils/httpError');

const getProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await projectService.getProject(id);
    res.status(200).json(project);
  } catch (error) {
    {
      res.status(500).json({
        error: error.message,
      });
    }
  }
};

const listProjects = async (req, res) => {
  try {
    const allProjects = await projectService.listProjects();
    res.status(200).json(allProjects);
  } catch (error) {
    {
      res.status(500).json({
        error: error.message,
      });
    }
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updatedProject = await projectService.updateProject(id, body);
    res.status(200).json(updatedProject);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({
        error: error.message,
      });
    } else {
      res.status(500).json({
        message: error.message,
      });
    }
  }
};
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { userIds } = await projectService.getProject(id);
    await userService.deleteProjectFromUsers(userIds, id);
    await projectService.deleteProject(id);
    res.status(200).json({ message: 'engagement has been deleted' });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = { getProject, listProjects, deleteProject, updateProject };
