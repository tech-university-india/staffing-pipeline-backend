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
  update,
  toDelete,
};
