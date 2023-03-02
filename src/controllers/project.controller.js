const logger = require('../logger');
const projectServices = require('../services/project.service');
const userService = require('../services/user.service');
const { HttpError } = require('../utils/httpError');
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

const updateProject = async (req, res) => {
  try {
    logger.info('updating project:' + req.params.id);
    const { id } = req.params;
    const { body } = req;
    const updatedProject = await projectServices.updateProject(id, body);
    if (body['userIds']) {
      const usersAlreadyInEngagement = await Promise.all(
        updatedProject.userIds.map(async userId => userService.getUser(userId))
      );
      usersAlreadyInEngagement.forEach(async user => {
        if (!body['userIds'].includes(user.userId)) {
          logger.info(`removing engagementId: ${updatedProject.engagementId} from user: ${user.userId}`);
          await userService.removeCurrentEngagement(user.userId, updatedProject.engagementId);
        }
      });
      await Promise.all(
        body['userIds'].map(userId => userService.addCurrentEngagement(userId, updatedProject.engagementId))
      );
      updatedProject['userIds'] = body['userIds'];
    }
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

const createProject = async (req, res) => {
  try {
    logger.info('creating a new project');
    const { body } = req;
    const createdProject = await projectServices.createProject(body);
    await Promise.all(
      createdProject.userIds.map(userId => userService.addCurrentEngagement(userId, createdProject.engagementId))
    );
    await Promise.all(
      createdProject.caseStudyIds.map(caseStudyId =>
        caseStudyService.addCurrentEngagement(caseStudyId, createdProject.engagementId)
      )
    );
    res.status(201).json({
      data: createdProject,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = { getProject, listProjects, deleteProject, updateProject, createProject };
