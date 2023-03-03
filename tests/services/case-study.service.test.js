const { case_studies } = require('../../src/models');
const updateCaseStudyServices = require('../../src/services/case-study.service');
const mockData = require('../__mocks__/case-study');
describe('Case Study Services', () => {
  describe('function updateCaseStudy', () => {
    it('Should update case study details', async () => {
      const resolvedValue = { ...mockData.update.resolvedValue, save: jest.fn() };
      jest.spyOn(case_studies, 'findOne').mockResolvedValue(resolvedValue);
      const caseStudy = await updateCaseStudyServices.updateCaseStudy(
        mockData.update.mockReq.params.id,
        mockData.update.mockReq.body
      );
      expect(caseStudy).toEqual(resolvedValue);
    });
  });

  describe('function deleteCaseStudy', () => {
    it('Should delete case study', async () => {
      const resolvedValue = { ...mockData.toDelete.resolvedValue, destroy: jest.fn() };
      jest.spyOn(case_studies, 'findOne').mockResolvedValue(resolvedValue);
      const deletedCaseStudy = await updateCaseStudyServices.deleteCaseStudy(mockData.toDelete.mockReq.params.id);
      expect(deletedCaseStudy).toEqual(resolvedValue);
    });
  });
});

describe('function removeProjectFromCaseStudy', () => {
  it('Should set engagement id as null in case study entity', async () => {
    const resolvedValue = { ...mockData.update.resolvedValue, update: jest.fn() };
    jest.spyOn(case_studies, 'update').mockResolvedValue(resolvedValue);
    const result = await updateCaseStudyServices.removeProjectFromCaseStudy(mockData.update.mockReq.params.id);
    expect(result).toEqual(resolvedValue);
  });
});
describe('function addCurrentEngagement', () => {
  it('Should add engagementId to caseStudy', async () => {
    const resolvedValue = { ...mockData.update.resolvedValue, save: jest.fn() };
    jest.spyOn(case_studies, 'findOne').mockResolvedValue(resolvedValue);
    const result = await updateCaseStudyServices.addCurrentEngagement(
      mockData.update.mockReq.params.id,
      mockData.update.mockReq.params.id
    );
    expect(result).toEqual(undefined);
  });
});
