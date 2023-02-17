const updateCaseStudy = require('../../src/controllers/case-study.controller');
const updateCaseStudyServices = require('../../src/services/case-study.service');
const mockData = require('../__mocks__/case-study');
describe('CaseStudyController', () => {
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
