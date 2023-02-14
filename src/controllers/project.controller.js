const projectService = require('../services/project.service');
const userService = require('../services/user.service');

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

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const userIds = await projectService.getUsersFromEngagement(id);
    await userService.deleteProjectFromUser(userIds, id);
    await projectService.deleteProjectFromEngagement(id);
    res.status(200).json({ message: 'engagement has been deleted' });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = { getProject, listProjects, deleteProject };
