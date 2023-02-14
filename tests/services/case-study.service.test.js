const caseStudyService = require('../../src/services/case-study.service');

describe('Case Studies Service', () => {
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
