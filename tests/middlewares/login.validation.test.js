const loginValidation = require('../../src/middlewares/login.validator');
const Joi = require('joi');
const mockData = require('../__mocks__/utils');
describe('Check request.validator middleware', () => {
  it('check if the function validateLoginReq() calls the next() when request is correct', async () => {
    jest.spyOn(Joi.object(), 'validate').mockResolvedValue({ error: false });
    const next = jest.fn();
    loginValidation.validateLoginReq(mockData.route.mockReq.body, mockData.route.mockRes, next);
    expect(next).toHaveBeenCalled();
  });
  it('check if the function validateLoginReq() sends response with status 400 whe schema validation fails', async () => {
    jest.spyOn(Joi.object(), 'validate').mockResolvedValue({ error: true });
    const next = jest.fn();
    loginValidation.validateLoginReq(mockData.route.invalidMockReq, mockData.route.mockRes, next);
    expect(mockData.route.mockRes.status).toBeCalledWith(400);
    expect(mockData.route.mockRes.json).toBeCalledWith({ message: '"email" is not allowed to be empty' });
  });
});
