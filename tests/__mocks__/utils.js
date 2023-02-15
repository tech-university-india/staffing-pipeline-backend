let testEmail = 'johndoe@mckinsey.com';
let testName = 'John Doe';
const route = {
  mockRes: {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
  },
  mockReq: {
    headers: {
      authorization: undefined,
    },
    body: {
      email: testEmail,
      password: 'test',
    },
  },
  invalidMockReq: {
    body: {
      email: '',
      password: 'test',
    },
  },
  resolvedValue: {
    data: {
      user_id: '9a492c13-85e8-4b26-9339-a5d037664d1a',
      name: testName,
      email: testEmail,
      fmno: null,
      current_engagement_ids: null,
      case_study_ids: null,
      skills: null,
      role: null,
      guild: null,
      past_engagement_ids: null,
      image: null,
      createdAt: '2023-02-09T15:02:53.658Z',
      updatedAt: '2023-02-09T15:02:53.658Z',
    },
    success: true,
  },
  jwtResolvedValue: {
    email: testEmail,
    iat: 1675968809,
    exp: 1675972409,
  },
};

module.exports = {
  route,
};
