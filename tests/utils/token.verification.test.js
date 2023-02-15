const db = require('../../src/models');
const LoginError = require('../../src/utils/loginError');
const tokenVerification = require('../../src/utils/token.verification');
const jwt = require('jsonwebtoken');
const mockData = require('../__mocks__/utils');

describe('Check tokenVerification Util', () => {
  it('check if the token is getting verified or not', async () => {
    jest.spyOn(jwt, 'verify').mockResolvedValue(mockData.route.jwtResolvedValue);
    jest.spyOn(db.users, 'findOne').mockResolvedValue(mockData.route.resolvedValue.data);
    const result = await tokenVerification.verifyToken('token');
    expect(result).toEqual(mockData.route.resolvedValue);
  });
  it('check if the token is failed then error should be thrown with 401 statusCode', async () => {
    jest.spyOn(jwt, 'verify').mockReturnValue(false);
    await expect(tokenVerification.verifyToken()).rejects.toThrow(LoginError);
  });
});
