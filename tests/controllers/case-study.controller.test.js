const updateCaseStudy = require('../../src/controllers/case-study.controller');
const updateCaseStudyServices = require('../../src/services/case-study.service');
const mockData = require('../__mocks__/case-study');
const caseStudiesController = require('../../src/controllers/case-study.controller');
const caseStudiesServices = require('../../src/services/case-study.service');
const userServices = require('../../src/services/user.service');
const { engagements } = require('../../src/models/');
const projectServices = require('../../src/services/project.service');

describe('CaseStudyController', () => {
  jest.spyOn(userServices, 'updateCaseStudyInUser').mockResolvedValue(true);
  jest.spyOn(projectServices, 'updateCaseStudyInProject').mockResolvedValue(true);
  describe('updateCaseStudyController', () => {
    it('should update caseStudy details', async () => {
      jest.spyOn(updateCaseStudyServices, 'updateCaseStudy').mockResolvedValue(mockData.update.resolvedValue);
      await updateCaseStudy.updateCaseStudy(mockData.update.mockReq, mockData.update.mockRes);
      expect(mockData.update.mockRes.status).toHaveBeenCalledWith(200);
      expect(mockData.update.mockRes.json).toHaveBeenCalledWith(mockData.update.resolvedValue);
    });
    it('Should return 404 if caseStudy not found', async () => {
      const resolvedValue = null;
      jest.spyOn(updateCaseStudyServices, 'updateCaseStudy').mockResolvedValue(resolvedValue);
      await updateCaseStudy.updateCaseStudy(mockData.update.mockReq, mockData.update.mockRes);
      expect(mockData.update.mockRes.status).toHaveBeenCalledWith(404);
      expect(mockData.update.mockRes.json).toHaveBeenCalledWith({ message: 'Case study not found' });
    });
    it('Should return 500 if something went wrong', async () => {
      jest.spyOn(updateCaseStudyServices, 'updateCaseStudy').mockRejectedValue(new Error('Something went wrong'));
      await updateCaseStudy.updateCaseStudy(mockData.update.mockReq, mockData.update.mockRes);
      expect(mockData.update.mockRes.status).toHaveBeenCalledWith(500);
      expect(mockData.update.mockRes.json).toHaveBeenCalledWith({ message: 'Something went wrong' });
    });
  });
  describe('deleteCaseStudyController', () => {
    it('should delete caseStudy', async () => {
      jest.spyOn(userServices, 'removeCaseStudyFromUser').mockResolvedValue(true);
      jest.spyOn(projectServices, 'removeCaseStudyFromProject').mockResolvedValue(true);
      jest.spyOn(updateCaseStudyServices, 'deleteCaseStudy').mockResolvedValue(mockData.toDelete.resolvedValue);
      await updateCaseStudy.deleteCaseStudy(mockData.toDelete.mockReq, mockData.toDelete.mockRes);
      expect(mockData.toDelete.mockRes.status).toHaveBeenCalledWith(200);
      expect(mockData.toDelete.mockRes.json).toHaveBeenCalledWith(mockData.toDelete.resolvedValue);
    });
    it('Should return 404 if caseStudy not found', async () => {
      const resolvedValue = null;
      jest.spyOn(updateCaseStudyServices, 'deleteCaseStudy').mockResolvedValue(resolvedValue);
      await updateCaseStudy.deleteCaseStudy(mockData.toDelete.mockReq, mockData.toDelete.mockRes);
      expect(mockData.toDelete.mockRes.status).toHaveBeenCalledWith(404);
      expect(mockData.toDelete.mockRes.json).toHaveBeenCalledWith({ message: 'Case study not found' });
    });
    it('Should return 500 if something went wrong', async () => {
      jest.spyOn(updateCaseStudyServices, 'deleteCaseStudy').mockRejectedValue(new Error('Something went wrong'));
      await updateCaseStudy.deleteCaseStudy(mockData.toDelete.mockReq, mockData.toDelete.mockRes);
      expect(mockData.toDelete.mockRes.status).toHaveBeenCalledWith(500);
      expect(mockData.toDelete.mockRes.json).toHaveBeenCalledWith({ message: 'Something went wrong' });
    });
  });

  describe('createCaseStudy', () => {
    it('should create a new case study', async () => {
      const { mockReq, mockRes, resolvedValue, mockUser, mockEngagement } = mockData.create;

      jest.spyOn(caseStudiesServices, 'createCaseStudy').mockResolvedValue(resolvedValue);
      jest.spyOn(userServices, 'getUser').mockResolvedValueOnce(mockUser);
      jest.spyOn(userServices, 'updateUser').mockResolvedValue();
      jest.spyOn(engagements, 'findByPk').mockResolvedValue(mockEngagement);

      await caseStudiesController.createCaseStudy(mockReq, mockRes);
      //expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(resolvedValue);
    });

    it('should throw an internal server error', async () => {
      const { mockReq, mockRes } = mockData.create;

      jest.spyOn(caseStudiesServices, 'createCaseStudy').mockRejectedValue(new Error());

      await caseStudiesController.createCaseStudy(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Something went wrong', success: false });
    });
  });
  describe('getCaseStudyController', () => {
    it('should get case study by id ', async () => {
      jest.spyOn(updateCaseStudyServices, 'getCaseStudy').mockResolvedValue(mockData.toGet.resolvedValue);
      await updateCaseStudy.getCaseStudy(mockData.toGet.mockReq, mockData.toGet.mockRes);
      expect(mockData.toGet.mockRes.status).toHaveBeenCalledWith(200);
      expect(mockData.toGet.mockRes.json).toHaveBeenCalledWith(mockData.toGet.resolvedValue);
    });
    it('Should return 404 if caseStudy not found', async () => {
      const resolvedValue = null;
      jest.spyOn(updateCaseStudyServices, 'getCaseStudy').mockResolvedValue(resolvedValue);
      await updateCaseStudy.getCaseStudy(mockData.toGet.mockReq, mockData.toGet.mockRes);
      expect(mockData.toGet.mockRes.status).toHaveBeenCalledWith(404);
      expect(mockData.toGet.mockRes.json).toHaveBeenCalledWith({ message: 'Case study not found' });
    });
  });
  describe('listCaseStudycontroller', () => {
    it('should return list of case studies ', async () => {
      jest.spyOn(updateCaseStudyServices, 'listCaseStudies').mockResolvedValue(mockData.toList.resolvedValue);
      await updateCaseStudy.listCaseStudies(mockData.toList.mockReq, mockData.toList.mockRes);
      expect(mockData.toList.mockRes.status).toHaveBeenCalledWith(200);
      expect(mockData.toList.mockRes.json).toHaveBeenCalledWith(mockData.toList.resolvedValue);
    });
    it('Should return 500 if something went wrong', async () => {
      jest.spyOn(updateCaseStudyServices, 'listCaseStudies').mockRejectedValue(new Error('Something went wrong'));
      await updateCaseStudy.listCaseStudies(mockData.toList.mockReq, mockData.toList.mockRes);
      expect(mockData.toList.mockRes.status).toHaveBeenCalledWith(500);
      expect(mockData.toList.mockRes.json).toHaveBeenCalledWith({ message: 'Something went wrong' });
    });
  });
});
