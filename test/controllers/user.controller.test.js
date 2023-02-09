const userController = require('../../src/controllers/userController');
const userServices = require('../../src/services/userServices');
const tokenVerification = require('../../src/utils/tokenVerification');
const HttpError = require('../../src/utils/httpError');
describe('Check User Controller', () => {
  it('check createUserLogin function which should create the user and status returned is 201', async () => {
    jest.spyOn(userServices, 'setUserCredentials').mockResolvedValue(
      {
        id: 1,
        email: 'promit.revar2211@gmail.com',
        password: '$2b$08$ap2OSCeWEBVlDY.xui2bPuoblmWTDQwetDvMHZF1B7k.NI3Ae5Tyq',
        createdAt: '2023-02-09T14:45:57.071Z',
        updatedAt: '2023-02-09T14:45:57.071Z'
      }
    );
    
    const mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
  
    await userController.createUserLogin({
      body:{
        email:'promit.revar2211@gmail.com',
        password:'test'
      }}, mockRes);
    expect(mockRes.status).toBeCalledWith(201);
    expect(mockRes.json).toBeCalledWith({
      'success': true
    });
  });
  it('check createUserLogin function which should throw error with message user already exists and status 400', async () => {
    jest.spyOn(userServices, 'setUserCredentials').mockImplementation(() => {
      throw new HttpError('User already exists',400);
    });
      
    const mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
    
    await userController.createUserLogin({
      body:{
        email:'promit.revar2211@gmail.com',
        password:'test'
      }}, mockRes);
    expect(mockRes.status).toBeCalledWith(400);
    expect(mockRes.json).toBeCalledWith({
      'error': 'User already exists',
      'success': false
    });
  });
  it('check createUserLogin function which should throw http error with message cannot create the user and status 500 if there is error in database insert', async () => {
    jest.spyOn(userServices, 'setUserCredentials').mockImplementation(() => {
      throw new HttpError('cannot create the user',500);
    });
      
    const mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
    
    await userController.createUserLogin({
      body:{
        email:'promit.revar2211@gmail.com',
        password:'test'
      }}, mockRes);
    expect(mockRes.status).toBeCalledWith(500);
    expect(mockRes.json).toBeCalledWith({
      'error': 'cannot create the user',
      'success': false
    });
  });
  it('check createUser function which should create the user and status returned is 201', async () => {
    jest.spyOn(userServices, 'createUser').mockResolvedValue(
      {
        'user_id': '9a492c13-85e8-4b26-9339-a5d037664d1a',
        'email': 'promit.revar2211@gmail.com',
        'name': 'Promit Revar',
        'updatedAt': '2023-02-09T15:02:53.658Z',
        'createdAt': '2023-02-09T15:02:53.658Z',
        'fmno': null,
        'current_engagement_ids': null,
        'case_study_ids': null,
        'skills': null,
        'role': null,
        'guild': null,
        'past_engagement_ids': null,
        'image': null
      }
    );
      
    const mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
    
    await userController.createUser({
      body:{
        'email':'promit.revar2211@gmail.com',
        'name':'Promit Revar'
      }}, mockRes);
    expect(mockRes.status).toBeCalledWith(201);
    expect(mockRes.json).toBeCalledWith({
      'data': {
        'user_id': '9a492c13-85e8-4b26-9339-a5d037664d1a',
        'email': 'promit.revar2211@gmail.com',
        'name': 'Promit Revar',
        'updatedAt': '2023-02-09T15:02:53.658Z',
        'createdAt': '2023-02-09T15:02:53.658Z',
        'fmno': null,
        'current_engagement_ids': null,
        'case_study_ids': null,
        'skills': null,
        'role': null,
        'guild': null,
        'past_engagement_ids': null,
        'image': null
      },
      'success': true
    });
  });
  it('check createUser function which should throw error with status 400', async () => {
    jest.spyOn(userServices, 'createUser').mockImplementation(() => {
      throw new HttpError('notNull Violation: users.email cannot be null',400);
    });
        
    const mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
      
    await userController.createUser({
      body:{
        name:'Promit Revar'
      }}, mockRes);
    expect(mockRes.status).toBeCalledWith(400);
    expect(mockRes.json).toBeCalledWith({
      error: 'notNull Violation: users.email cannot be null'
    });
  });
        
});