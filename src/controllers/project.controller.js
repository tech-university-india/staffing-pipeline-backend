const projectServices = require('../services/project.service');

const getProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await projectServices.getProject(id);
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
    const allProjects = await projectServices.listProjects();
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
    const updatedProject = await projectServices.updateProject(id, body);
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

module.exports = { getProject, listProjects, updateProject };
