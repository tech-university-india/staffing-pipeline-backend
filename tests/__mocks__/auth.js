let testEmail = 'johndoe@mckinsey.com';
const testdata = [
  {
    id: 1,
    email: testEmail,
    password: '$2b$08$ap2OSCeWEBVlDY.xui2bPuoblmWTDQwetDvMHZF1B7k.NI3Ae5Tyq',
    createdAt: '2023-02-09T14:45:57.071Z',
    updatedAt: '2023-02-09T14:45:57.071Z',
  },
];
const login = {
  mockRes: {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
  },
  mockReq: {
    body: {
      email: testEmail,
      password: 'test',
    },
  },
  resolvedValue: testdata[0],
};
const accessToken = {
  mockRes: {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
  },
  mockReq: {
    body: {
      email: testEmail,
      password: 'test',
    },
  },
  resolvedValue: {
    data: testdata[0],
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByb21pdC5yZXZhcjIyMTFAZ21haWwuY29tIiwiaWF0IjoxNjc1OTYyOTI3LCJleHAiOjE2NzU5NjY1Mjd9.Ve6AIDZWdbq4ptj-fceQHXns4g_PLeD2KYwtgSpfhu4',
    success: true,
    message: 'Login successful',
  },
};
const wrongPassword = {
  mockRes: {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
  },
  mockReq: {
    body: {
      email: testEmail,
      password: 't',
    },
  },
};
const wrongEmail = {
  mockRes: {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
  },
  mockReq: {
    body: {
      email: testEmail,
      password: 't',
    },
  },
};
module.exports = {
  login,
  accessToken,
  wrongPassword,
  wrongEmail,
};
