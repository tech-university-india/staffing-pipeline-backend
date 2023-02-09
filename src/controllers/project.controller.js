const projectServices = require('../services/project.services');

const getProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await projectServices.getProject(id);
    res.status(200).json(project);
  } catch (error) {
    {
      res.status(500).json({
        error: error.message

      });
    }
  }
};

module.exports = { getProject };