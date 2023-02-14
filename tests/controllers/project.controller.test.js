const projectController = require('../../src/controllers/project.controller');
const projectService = require('../../src/services/project.service');
const userService = require('../../src/services/user.service');

describe('Engagements Controllers', () => {
  it('should return the engagement details of the provided id', async () => {
    jest.spyOn(projectService, 'getProject').mockResolvedValue([
      {
        engagementId: 1223,
        userIds: ['1', '2', '3'],
        caseStudyIds: ['23', '34', '56'],
      },
    ]);
    const mockReq = {
      params: jest.fn(),
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await projectController.getProject(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.json).toBeCalledWith([
      {
        engagementId: 1223,
        userIds: ['1', '2', '3'],
        caseStudyIds: ['23', '34', '56'],
      },
    ]);
  });
  it('should return error', async () => {
    jest.spyOn(projectService, 'getProject').mockRejectedValue(new Error('Internal Server error!!'));
    const mockReq = {
      params: jest.fn(),
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await projectController.getProject(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(500);
    expect(mockRes.json).toBeCalledWith({
      error: 'Internal Server error!!',
    });
  });

  it('should return list of all projects', async () => {
    jest.spyOn(projectService, 'listProjects').mockResolvedValue([
      {
        engagementId: 1223,
        userIds: ['771', '882', '93'],
        caseStudyIds: ['263', '364', '586'],
      },
      {
        engagementId: 1223,
        userIds: ['41', '62', '38'],
        caseStudyIds: ['23', '34', '56'],
      },
      {
        engagementId: 1223,
        userIds: ['41', '72', '96'],
        caseStudyIds: ['235', '364', '576'],
      },
    ]);
    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await projectController.listProjects(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.json).toBeCalledWith([
      {
        engagementId: 1223,
        userIds: ['771', '882', '93'],
        caseStudyIds: ['263', '364', '586'],
      },
      {
        engagementId: 1223,
        userIds: ['41', '62', '38'],
        caseStudyIds: ['23', '34', '56'],
      },
      {
        engagementId: 1223,
        userIds: ['41', '72', '96'],
        caseStudyIds: ['235', '364', '576'],
      },
    ]);
  });
  it('should return error', async () => {
    jest.spyOn(projectService, 'listProjects').mockRejectedValue(new Error('Internal Server error!!'));
    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await projectController.listProjects(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(500);
    expect(mockRes.json).toBeCalledWith({
      error: 'Internal Server error!!',
    });
  });

  it('should delete engagement of the provided id', async () => {
    jest.spyOn(projectService, 'getProject').mockResolvedValue('engagement has been deleted');
    jest.spyOn(userService, 'deleteProjectFromUsers').mockResolvedValue('engagement has been deleted');
    jest.spyOn(projectService, 'deleteProject').mockResolvedValue('engagement has been deleted');
    const mockReq = {
      params: jest.fn(),
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await projectController.deleteProject(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.json).toBeCalledWith({ message: 'engagement has been deleted' });
  });
  it('should return error', async () => {
    jest.spyOn(projectService, 'getProject').mockRejectedValue(new Error('Internal Server error!!'));
    const mockReq = {
      params: jest.fn(),
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await projectController.deleteProject(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(500);
    expect(mockRes.json).toBeCalledWith({
      error: 'Internal Server error!!',
    });
  });
});
