const projectController = require('../../src/controllers/project.controller');
const projectService = require('../../src/services/project.service');
const userService = require('../../src/services/user.service');
const caseStudyService = require('../../src/services/case-study.service');
const mockData = require('../__mocks__/project');
const mockDataUser = require('../__mocks__/user');

describe('Engagements Controllers', () => {
  it('should return the engagement details of the provided id', async () => {
    jest.spyOn(projectService, 'getProject').mockResolvedValue([mockData.project.resolvedValue]);
    await projectController.getProject(mockData.project.mockReq, mockData.project.mockRes);
    expect(mockData.project.mockRes.status).toBeCalledWith(200);
    expect(mockData.project.mockRes.json).toBeCalledWith([mockData.project.resolvedValue]);
  });
  it('should return error', async () => {
    jest.spyOn(projectService, 'getProject').mockRejectedValue(new Error(mockData.project.errorMessage));
    await projectController.getProject(mockData.project.mockReq, mockData.project.mockRes);
    expect(mockData.project.mockRes.status).toBeCalledWith(500);
    expect(mockData.project.mockRes.json).toBeCalledWith({ error: mockData.project.errorMessage });
  });

  it('should return list of all projects', async () => {
    jest.spyOn(projectService, 'listProjects').mockResolvedValue(mockData.allProjects.data);
    await projectController.listProjects(mockData.allProjects.mockReq, mockData.allProjects.mockRes);
    expect(mockData.allProjects.mockRes.status).toBeCalledWith(200);
    expect(mockData.allProjects.mockRes.json).toBeCalledWith(mockData.allProjects.data);
  });
  it('should return error', async () => {
    jest.spyOn(projectService, 'listProjects').mockRejectedValue(new Error(mockData.allProjects.errorMessage));
    await projectController.listProjects(mockData.allProjects.mockReq, mockData.allProjects.mockRes);
    expect(mockData.allProjects.mockRes.status).toBeCalledWith(500);
    expect(mockData.allProjects.mockRes.json).toBeCalledWith({ error: mockData.allProjects.errorMessage });
  });

  it('should delete engagement of the provided id', async () => {
    jest.spyOn(projectService, 'getProject').mockResolvedValue('engagement has been deleted');
    jest.spyOn(userService, 'deleteProjectFromUsers').mockResolvedValue('engagement has been deleted');
    jest.spyOn(caseStudyService, 'removeProjectFromCaseStudy').mockResolvedValue('engagement has been deleted');
    jest.spyOn(projectService, 'deleteProject').mockResolvedValue('engagement has been deleted');
    await projectController.deleteProject(mockData.todelete.mockReq, mockData.todelete.mockRes);
    expect(mockData.todelete.mockRes.status).toBeCalledWith(200);
    expect(mockData.todelete.mockRes.json).toBeCalledWith({ message: 'engagement has been deleted' });
  });
  it('should return error', async () => {
    jest.spyOn(projectService, 'getProject').mockRejectedValue(new Error(mockData.todelete.errorMessage));
    await projectController.deleteProject(mockData.todelete.mockReq, mockData.todelete.mockRes);
    expect(mockData.todelete.mockRes.status).toBeCalledWith(500);
    expect(mockData.todelete.mockRes.json).toBeCalledWith({ error: mockData.todelete.errorMessage });
  });
  it('Should update the project', async () => {
    jest.spyOn(projectService, 'updateProject').mockResolvedValue(mockData.project.resolvedValue);
    jest.spyOn(userService, 'getUser').mockResolvedValue(mockDataUser.getUser.resolvedValue);
    jest.spyOn(userService, 'addCurrentEngagement').mockResolvedValue(mockDataUser.getUser.resolvedValue);
    jest.spyOn(userService, 'removeCurrentEngagement').mockResolvedValue(mockDataUser.getUser.resolvedValue);
    await projectController.updateProject(mockData.toUpdate.mockReq, mockData.project.mockRes);
    expect(mockData.project.mockRes.status).toBeCalledWith(200);
    expect(mockData.project.mockRes.json).toBeCalledWith(mockData.project.resolvedValue);
  });
});
