const loginValidation = require('../../src/middlewares/login.validator');
const Joi = require('joi');
describe('Check request.validator middleware', () => {
  it('check if the function validateLoginReq() calls the next() when request is correct', async () => {
    jest.spyOn(Joi.object(), 'validate').mockResolvedValue({
      error: false,
    });

    const mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    const next = jest.fn();
    loginValidation.validateLoginReq(
      {
        body: {
          email: 'promit.revar2211@gmail.com',
          password: 'test',
        },
      },
      mockRes,
      next
    );
    expect(next).toHaveBeenCalled();
  });
  it('check if the function validateLoginReq() sends response with status 400 whe schema validation fails', async () => {
    jest.spyOn(Joi.object(), 'validate').mockResolvedValue({
      error: true,
    });

    const mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    const next = jest.fn();
    loginValidation.validateLoginReq(
      {
        body: {
          email: '',
          password: 'test',
        },
      },
      mockRes,
      next
    );
    expect(mockRes.status).toBeCalledWith(400);
    expect(mockRes.json).toBeCalledWith({
      message: '"email" is not allowed to be empty',
    });
  });
});
