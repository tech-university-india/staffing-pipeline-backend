const caseStudiesService = require('../../src/services/case-study.service');
const models = require('../../src/models');

describe('Case Studies Service', () => {
  describe('createCaseStudy', () => {
    it('should create a new case study', async () => {
      const mockCaseStudy = {
        title: 'Test Case Study',
        description: 'Test Description',
        collaboratorsId: ['1', '2', '3'],
        image: 'testImage',
        boxLink: 'testBoxLink',
        engagementId: '1'
      };
      jest.spyOn(models.case_studies, 'create').mockResolvedValue(mockCaseStudy);

      const caseStudy = await caseStudiesService.createCaseStudy(mockCaseStudy);
      expect(caseStudy).toEqual(mockCaseStudy);
    });
  });
});