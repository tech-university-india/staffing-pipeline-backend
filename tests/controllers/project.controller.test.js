const getProjectControllers = require('../../src/controllers/project.controller');
const getProjectServices = require('../../src/services/project.service');

describe('Engagements Controllers', () => {
  it('should return the engagement details of the provided id', async () => {
    jest.spyOn(getProjectServices, 'getProject').mockResolvedValue([
      {
        engagement_id: 1223,
        user_ids: ['1', '2', '3'],
        case_study_ids: ['23', '34', '56']
      }
    ]
    );
    const mockReq = {
      params: jest.fn()
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    await getProjectControllers.getProject(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.json).toBeCalledWith(
      [
        {
          engagement_id: 1223,
          user_ids: ['1', '2', '3'],
          case_study_ids: ['23', '34', '56']
        }
      ]
    );
  });
  it('should return error', async () => {
    jest.spyOn(getProjectServices, 'getProject').mockRejectedValue(new Error('Internal Server error!!'));
    const mockReq = {
      params: jest.fn()
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    await getProjectControllers.getProject(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(500);
    expect(mockRes.json).toBeCalledWith({
      error: 'Internal Server error!!'
    });
  });

  it('should return list of all projects', async () => {
    jest.spyOn(getProjectServices, 'listProjects').mockResolvedValue([
      {
        engagement_id: 1223,
        user_ids: ['1', '2', '3'],
        case_study_ids: ['23', '34', '56']
      },
      {
        engagement_id: 1223,
        user_ids: ['1', '2', '3'],
        case_study_ids: ['23', '34', '56']
      },
      {
        engagement_id: 1223,
        user_ids: ['1', '2', '3'],
        case_study_ids: ['23', '34', '56']
      }
    ]
    );
    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    await getProjectControllers.listProjects(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.json).toBeCalledWith(
      [
        {
          engagement_id: 1223,
          user_ids: ['1', '2', '3'],
          case_study_ids: ['23', '34', '56']
        },
        {
          engagement_id: 1223,
          user_ids: ['1', '2', '3'],
          case_study_ids: ['23', '34', '56']
        },
        {
          engagement_id: 1223,
          user_ids: ['1', '2', '3'],
          case_study_ids: ['23', '34', '56']
        }
      ]
    );
  });
  it('should return error', async () => {
    jest.spyOn(getProjectServices, 'listProjects').mockRejectedValue(new Error('Internal Server error!!'));
    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    await getProjectControllers.listProjects(mockReq, mockRes);
    expect(mockRes.status).toBeCalledWith(500);
    expect(mockRes.json).toBeCalledWith({
      error: 'Internal Server error!!'
    });
  });
});    