
const projectServices = require('../services/projectServices');

const listProjects = async (req, res) => {
  try {
    const allProjects = await projectServices.listProjects();
    res.status(200).json(allProjects);
  } catch (error) {
    {
      res.status(500).json({
        error: error.message

      });
    }
  }
};



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

const updateProject = async (req, res) => {
  try {

    res.status(200).json();
  } catch (error) {
    {
      res.status(500).json({
        error: error.message

      });
    }
  }
};

const createProject = async (req, res) => {
  try {

    res.status(200).json();
  } catch (error) {
    {
      res.status(500).json({
        error: error.message

      });
    }
  }
};

const deleteProject = async (req, res) => {
  try {

    res.status(200).json();
  } catch (error) {
    {
      res.status(500).json({
        error: error.message

      });
    }
  }
};


module.exports = { listProjects, getProject, deleteProject, updateProject, createProject };