const { engagements, users } = require('../../src/models');
const projectService = require('../../src/services/project.service');
const mockData = require('../__mocks__/project');
const mockDataUser = require('../__mocks__/user');
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
    jest.spyOn(engagements, 'findByPk').mockResolvedValue(mockData.project.resolvedValue);
    jest.spyOn(users, 'findByPk').mockResolvedValue(mockDataUser.getUser.resolvedValue);
    const updatedProject = await projectService.updateProject(
      mockData.project.resolvedValue.engagementId,
      mockData.project.editedProject
    );
    expect(updatedProject).toEqual(mockData.project.editedProject);
  });
  it('should create the project and return the created project', async () => {
    jest.spyOn(engagements, 'create').mockResolvedValue(mockData.project.resolvedValue);
    const createdProject = await projectService.updateProject(mockData.project.editedProject);
    expect(createdProject).toEqual(mockData.project.editedProject);
  });
});
