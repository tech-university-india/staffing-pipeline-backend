const caseStudiesController = require('../../src/controllers/case-study.controller');
const caseStudiesServices = require('../../src/services/case-study.service');

describe('Case Studies Controller', () => {
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
      jest.spyOn(caseStudiesServices, 'createCaseStudy').mockResolvedValue(mockCaseStudy);

      const req = {
        body: mockCaseStudy
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await caseStudiesController.createCaseStudy(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ caseStudy: mockCaseStudy });

    });
  });
});