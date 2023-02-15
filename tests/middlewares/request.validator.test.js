const requestValidator = require('../../src/middlewares/request.validator');
const tokenVerification = require('../../src/utils/token.verification');
const mockData = require('../__mocks__/utils');
describe('Check request.validator middleware', () => {
  it('check if the function reqAuthValidator() calls the next() when token is verified', async () => {
    jest.spyOn(tokenVerification, 'verifyToken').mockResolvedValue(mockData.route.resolvedValue);
    const next = jest.fn();
    requestValidator.reqAuthValidator(mockData.route.mockReq.headers, mockData.route.mockRes, next);
    expect(next).not.toHaveBeenCalled();
  });
});
