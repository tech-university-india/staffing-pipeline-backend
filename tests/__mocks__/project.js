const project = {
  mockReq: {
    params: jest.fn(),
  },
  mockRes: {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  },
  resolvedValue: {
    engagementId: 1223,
    userIds: ['1', '2', '3'],
    caseStudyIds: ['23', '34', '56'],
    save: jest.fn(),
  },
  editedProject: {
    engagementId: 1223,
    userIds: ['1', '2'],
    caseStudyIds: ['23', '34', '56'],
    save: jest.fn(),
  },
  errorMessage: 'Internal Server error!!',
};
const allProjects = {
  data: [
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
  ],
  mockReq: {},
  mockRes: {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  },
  errorMessage: 'Internal Server error!!',
};
const todelete = {
  mockReq: {
    params: jest.fn(),
  },
  mockRes: {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  },
  errorMessage: 'Internal Server error!!',
  mockEnagement: {
    userIds: [1, 2, 3],
  },
};

const toUpdate = {
  mockReq: {
    params: jest.fn(),
    body: project.resolvedValue,
  },
  mockRes: {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  },
  errorMessage: 'Internal Server error!!',
};
module.exports = {
  project,
  allProjects,
  todelete,
  toUpdate,
};
