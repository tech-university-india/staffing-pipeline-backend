const { engagements, users } = require('../../src/models');
const projectServices = require('../../src/services/project.service');

describe('Engagement Services', () => {
  it('should return the engagement details of the provided id from the database', async () => {
    jest.spyOn(engagements, 'findByPk').mockResolvedValue([
      {
        engagementId: 1223,
        userIds: ['1', '2', '3'],
        caseStudyIds: ['23', '34', '56'],
      },
    ]);
    const project = await projectServices.getProject();
    expect(project).toEqual([
      {
        engagementId: 1223,
        userIds: ['1', '2', '3'],
        caseStudyIds: ['23', '34', '56'],
      },
    ]);
  });

  it('should return list of all engagements from the database', async () => {
    jest.spyOn(engagements, 'findAll').mockResolvedValue([
      {
        engagementId: 1223,
        userIds: ['1', '2', '3'],
        caseStudyIds: ['23', '34', '56'],
      },
      {
        engagementId: 1223,
        userIds: ['1', '2', '3'],
        caseStudyIds: ['23', '34', '56'],
      },
      {
        engagementId: 1223,
        userIds: ['1', '2', '3'],
        caseStudyIds: ['23', '34', '56'],
      },
    ]);
    const projectData = await projectServices.listProjects();
    expect(projectData).toEqual([
      {
        engagementId: 1223,
        userIds: ['1', '2', '3'],
        caseStudyIds: ['23', '34', '56'],
      },
      {
        engagementId: 1223,
        userIds: ['1', '2', '3'],
        caseStudyIds: ['23', '34', '56'],
      },
      {
        engagementId: 1223,
        userIds: ['1', '2', '3'],
        caseStudyIds: ['23', '34', '56'],
      },
    ]);
  });
  it('should delete engagement of the given id from the database', async () => {
    const mockEngagement = {
      userIds: [1, 2, 3],
    };
    const mockUser = {
      dataValues: {
        currentEngagementIds: [12, 13],
      },
      map: jest.fn(),
    };
    const mockUsers = {
      dataValues: {
        userId: 22,
        currentEngagementIds: [122, 154],
      },
    };
    jest.spyOn(users, 'findOne').mockResolvedValue(mockUser);
    jest.spyOn(engagements, 'findOne').mockResolvedValue(mockEngagement);
    jest.spyOn(users, 'update').mockResolvedValue(mockUsers);
    jest.spyOn(engagements, 'destroy').mockResolvedValue(null);

    const project = await projectServices.deleteProject(2);
    expect(project).toEqual(undefined);
  });
});
