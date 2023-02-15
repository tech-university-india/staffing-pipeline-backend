const { engagements, users } = require('../../src/models');
const projectService = require('../../src/services/project.service');
const mockData = require('../__mocks__/project');
describe('Engagement Services', () => {
  it('should return the engagement details of the provided id from the database', async () => {
    jest.spyOn(engagements, 'findByPk').mockResolvedValue([mockData.project.resolvedValue]);
    const project = await projectService.getProject();
    expect(project).toEqual([mockData.project.resolvedValue]);
  });

  it('should return list of all engagements from the database', async () => {
    jest.spyOn(engagements, 'findAll').mockResolvedValue([mockData.allProjects.data]);
    const projectData = await projectService.listProjects();
    expect(projectData).toEqual([mockData.allProjects.data]);
  });

  it('should delete engagement of the given id from the database', async () => {
    jest.spyOn(engagements, 'destroy').mockResolvedValue([mockData.todelete.mockEnagement]);
    const project = await projectService.deleteProject(2);
    expect(project).toEqual(undefined);
  });
  it('should update the project and return the updated project', async () => {
    const mockId = 1223;
    const mockEngagement = {
      engagementId: 1223,
      name: 'Test Project',
      tags: ['tag1', 'tag2', 'tag3'],
      skills: ['skill1', 'skill2', 'skill3'],
      guild: 'Swe',
      userIds: ['1', '2', '3'],
      caseStudyIds: ['23', '34', '56'],
      status: 'active',
      startDate: '2020-01-01',
      endDate: '2020-01-01',
      image: 'https://www.google.com',
      save: jest.fn(),
    };
    const mockBody = {
      engagementId: 1223,
      name: 'Test Project',
      tags: ['tag1', 'tag2', 'tag3'],
      skills: ['skill1', 'skill2', 'skill3'],
      guild: 'Swe',
      userIds: ['1', '2', '3'],
      caseStudyIds: ['23', '34', '56'],
      status: 'active',
      startDate: '2020-01-01',
      endDate: '2020-01-01',
      image: 'https://www.google.com',
    };
    const mockUser = {
      user_id: '1',
      name: 'john doe',
      email: 'johndoe@mckinsey.com',
      fmno: '123456',
      currentEngagementIds: ['1', '2'],
      caseStudyIds: ['1', '2'],
      skills: ['node, react'],
      role: 'intern',
      guild: 'swe',
      pastEngagementIds: ['1', '2'],
      createdAt: '2022-01-17T04:33:12.000Z',
      updatedAt: '2022-01-17T04:33:12.000Z',
      save: jest.fn(),
    };
    jest.spyOn(engagements, 'findByPk').mockResolvedValue(mockEngagement);
    jest.spyOn(users, 'findByPk').mockResolvedValue(mockUser);
    const updatedProject = await projectService.updateProject(mockId, mockBody);
    expect(updatedProject).toEqual(mockEngagement);
  });
});
