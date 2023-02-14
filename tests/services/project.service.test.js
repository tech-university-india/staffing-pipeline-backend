const { engagements } = require('../../src/models');
const projectService = require('../../src/services/project.service');

describe('Engagement Services', () => {
  it('should return the engagement details of the provided id from the database', async () => {
    jest.spyOn(engagements, 'findByPk').mockResolvedValue([
      {
        engagementId: 1223,
        userIds: ['1', '2', '3'],
        caseStudyIds: ['23', '34', '56'],
      },
    ]);
    const project = await projectService.getProject();
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
    const projectData = await projectService.listProjects();
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
    jest.spyOn(engagements, 'destroy').mockResolvedValue(mockEngagement);
    const project = await projectService.deleteProject(2);
    expect(project).toEqual(undefined);
  });
});
