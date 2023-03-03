const create = {
  mockReq: {
    body: {
      name: 'test',
      description: 'test',
      collaborators_ids: ['1', '2'],
    },
  },
  mockRes: {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  },
  resolvedValue: {
    caseStudyId: '1',
    name: 'test',
    description: 'test',
    collaboratorsIds: ['1'],
    image: 'test',
    boxLink: 'test',
    engagementId: '1',
    createdAt: '2022-01-17T04:33:12.000Z',
    updatedAt: '2022-01-17T04:33:12.000Z',
  },
  mockUser: {
    id: '1',
    name: 'abc',
    email: 'a@b.com',
    skills: ['a', 'b'],
    image: 'def',
    caseStudyIds: ['2', '3'],
  },
  mockEngagement: {
    name: 'abc',
    tags: ['a', 'b', 'c'],
    skills: ['a', 'b', 'c'],
    guild: 'abc',
    userIds: ['a', 'b', 'c'],
    caseStudyIds: ['2', '3'],
    status: 'ongoing',
    startDate: 'a',
    endDate: 'b',
    image: 'abc',
    save: jest.fn(),
  },
};

const update = {
  mockReq: {
    params: {
      id: '1',
    },
    body: {
      name: 'test',
      description: 'test',
      collaborators_ids: ['1', '2'],
    },
  },
  mockRes: {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  },
  resolvedValue: {
    case_study_id: '1',
    name: 'test',
    description: 'test',
    collaborators_ids: ['1', '2'],
    image: 'test',
    box_link: 'test',
    engagement_id: '1',
    createdAt: '2022-01-17T04:33:12.000Z',
    updatedAt: '2022-01-17T04:33:12.000Z',
  },
};

const toDelete = {
  mockReq: {
    params: {
      id: '1',
    },
  },
  mockRes: {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  },
  resolvedValue: {
    case_study_id: '1',
    name: 'test',
    description: 'test',
    collaborators_ids: ['1', '2'],
    image: 'test',
    box_link: 'test',
    engagement_id: '1',
    createdAt: '2022-01-17T04:33:12.000Z',
    updatedAt: '2022-01-17T04:33:12.000Z',
  },
};
module.exports = {
  create,
  update,
  toDelete,
};
