const logger = require('../logger');
const projectServices = require('../services/project.service');
const userService = require('../services/user.service');
const caseStudyService = require('../services/case-study.service');

const getProject = async (req, res) => {
  try {
    const { id } = req.params;
    logger.info('fetching project by id: ' + id);
    const project = await projectServices.getProject(id);
    res.status(200).json(project);
  } catch (error) {
    {
      logger.error(error);
      res.status(500).json({
        error: error.message,
      });
    }
  }
};

const listProjects = async (req, res) => {
  try {
    logger.info('fetching all the projects');
    const allProjects = await projectServices.listProjects();
    res.status(200).json(allProjects);
  } catch (error) {
    logger.error(error);
    {
      res.status(500).json({
        error: error.message,
      });
    }
  }
};

const deleteProject = async (req, res) => {
  try {
    logger.info('deleting project with id: ' + req.params.id);
    const { id } = req.params;
    const { userIds } = await projectServices.getProject(id);
    await userService.deleteProjectFromUsers(userIds, id);
    await caseStudyService.removeProjectFromCaseStudy(id);
    await projectServices.deleteProject(id);
    res.status(200).json({ message: 'engagement has been deleted' });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = { getProject, listProjects, deleteProject };
