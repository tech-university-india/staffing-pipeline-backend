const projectServices = require('../services/project.service');
const logger = require('../logger');
const getProject = async (req, res) => {
  try {
    const { id } = req.params;
    logger.info('call the getProject service');
    const project = await projectServices.getProject(id);
    res.status(200).json(project);
  } catch (error) {
    {
      logger.info('error while calling getProject service');
      res.status(500).json({
        error: error.message,
      });
    }
  }
};

const listProjects = async (req, res) => {
  try {
    logger.info('call the listProjects service');
    const allProjects = await projectServices.listProjects();
    res.status(200).json(allProjects);
  } catch (error) {
    logger.info('error while calling listProjects service');
    {
      res.status(500).json({
        error: error.message,
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

module.exports = { getProject, listProjects, deleteProject };
