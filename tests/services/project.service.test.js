const { engagements, users } = require('../../src/models');
const getProjectServices = require('../../src/services/project.service');

describe('Engagement Services', () => {
  it('should return the engagement details of the provided id from the database', async () => {
    jest.spyOn(engagements, 'findByPk').mockResolvedValue([
      {
        engagement_id: 1223,
        user_ids: ['1', '2', '3'],
        case_study_ids: ['23', '34', '56'],
      },
    ]);
    const project = await getProjectServices.getProject();
    expect(project).toEqual([
      {
        engagement_id: 1223,
        user_ids: ['1', '2', '3'],
        case_study_ids: ['23', '34', '56'],
      },
    ]);
  });

  it('should return list of all engagements from the database', async () => {
    jest.spyOn(engagements, 'findAll').mockResolvedValue([
      {
        engagement_id: 1223,
        user_ids: ['1', '2', '3'],
        case_study_ids: ['23', '34', '56'],
      },
      {
        engagement_id: 1223,
        user_ids: ['1', '2', '3'],
        case_study_ids: ['23', '34', '56'],
      },
      {
        engagement_id: 1223,
        user_ids: ['1', '2', '3'],
        case_study_ids: ['23', '34', '56'],
      },
    ]);
    const projectData = await getProjectServices.listProjects();
    expect(projectData).toEqual([
      {
        engagement_id: 1223,
        user_ids: ['1', '2', '3'],
        case_study_ids: ['23', '34', '56'],
      },
      {
        engagement_id: 1223,
        user_ids: ['1', '2', '3'],
        case_study_ids: ['23', '34', '56'],
      },
      {
        engagement_id: 1223,
        user_ids: ['1', '2', '3'],
        case_study_ids: ['23', '34', '56'],
      },
    ]);
  });
  it('should delete engagement of the given id from the database', async () => {
    const mockEngagement = {
      user_ids: [1, 2, 3],
    };
    const mockUser = {
      dataValues: {
        current_engagement_ids: [12, 13],
      },
      map: jest.fn(),
    };
    const mockUsers = {
      dataValues: {
        user_id: 22,
        current_engagement_ids: [122, 154],
      },
    };
    jest.spyOn(users, 'findOne').mockResolvedValue(mockUser);
    jest.spyOn(engagements, 'findOne').mockResolvedValue(mockEngagement);
    jest.spyOn(users, 'update').mockResolvedValue(mockUsers);
    jest.spyOn(engagements, 'destroy').mockResolvedValue(null);

    const project = await getProjectServices.deleteProject(2);
    expect(project).toEqual(undefined);
  });
});
