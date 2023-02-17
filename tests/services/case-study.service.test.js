const { case_studies } = require('../../src/models');
const updateCaseStudyServices = require('../../src/services/case-study.service');
const caseStudyService = require('../../src/services/case-study.service');

const mockData = require('../__mocks__/case-study');
describe('Case Study Services', () => {
  describe('function updateCaseStudy', () => {
    it('Should update case study details', async () => {
      const resolvedValue = { ...mockData.update.resolvedValue, save: jest.fn() };
      jest.spyOn(case_studies, 'findOne').mockResolvedValue(resolvedValue);
      const result = await updateCaseStudyServices.updateCaseStudy(
        mockData.update.mockReq.params.id,
        mockData.update.mockReq.body
      );
      expect(result).toEqual(resolvedValue);
    });
  });

  describe('function deleteCaseStudy', () => {
    it('Should delete case study', async () => {
      const resolvedValue = { ...mockData.toDelete.resolvedValue, destroy: jest.fn() };
      jest.spyOn(case_studies, 'findOne').mockResolvedValue(resolvedValue);
      const result = await updateCaseStudyServices.deleteCaseStudy(mockData.toDelete.mockReq.params.id);
      expect(result).toEqual(resolvedValue);
    });
  });
  describe('createCaseStudy', () => {
    it('should create a new case study', async () => {
      const mockCaseStudy = {
        caseStudyId: '1',
        title: 'Test Case Study',
        description: 'Test Description',
        collaboratorsId: ['1', '2', '3'],
        image: 'testImage',
        boxLink: 'testBoxLink',
        engagementId: '1',
      };

      jest.spyOn(caseStudyService, 'createCaseStudy').mockResolvedValue(mockCaseStudy);

      const caseStudy = await caseStudyService.createCaseStudy(mockCaseStudy);

      expect(caseStudy).toEqual(mockCaseStudy);
    });
  });
});
