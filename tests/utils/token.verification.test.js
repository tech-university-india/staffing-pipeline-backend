const db = require('../../src/models');
const LoginError = require('../../src/utils/loginError');
const tokenVerification = require('../../src/utils/token.verification');
const jwt = require('jsonwebtoken');
describe('Check tokenVerification Util', () => {
  it('check if the token is getting verified or not', async () => {
    jest.spyOn(jwt, 'verify').mockResolvedValue({
      email: 'promit.revar2211@gmail.com',
      iat: 1675968809,
      exp: 1675972409,
    });
    jest.spyOn(db.users, 'findOne').mockResolvedValue({
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
    });

    const result = await tokenVerification.verifyToken('token');
    expect(result).toEqual({
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
    });
  });
  it('check if the token is failed then error should be thrown with 401 statusCode', async () => {
    jest.spyOn(jwt, 'verify').mockReturnValue(false);

    await expect(tokenVerification.verifyToken()).rejects.toThrow(LoginError);
  });
});
