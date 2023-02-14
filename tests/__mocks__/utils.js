const route = {
  mockRes: {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
  },
  mockReq: {
    headers: {
      authorization: undefined,
    },
  },
  resolvedValue: {
    data: {
      user_id: '9a492c13-85e8-4b26-9339-a5d037664d1a',
      name: 'Promit Revar',
      email: 'promit.revar2211@gmail.com',
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
};

module.exports = {
  route,
};
