const { case_studies } = require('../../src/models');
const updateCaseStudyServices = require('../../src/services/case-study.service');

describe('Case Study Services', () => {
  describe('function updateCaseStudy', () => {
    it('Should update case study details', async () => {
      const mockReq = {
        params: {
          id: '1',
        },
        body: {
          name: 'test',
          description: 'test',
          collaborators_ids: ['1', '2'],
        },
      };
      const resolvedValue = {
        case_study_id: '1',
        name: 'test-test',
        description: 'test hello',
        collaborators_ids: ['1', '2'],
        image: 'test',
        box_link: 'test',
        engagement_id: '1',
        createdAt: '2022-01-17T04:33:12.000Z',
        updatedAt: '2022-01-17T04:33:12.000Z',
        save: jest.fn(),
      };
      jest.spyOn(case_studies, 'findOne').mockResolvedValue(resolvedValue);
      const result = await updateCaseStudyServices.updateCaseStudy(mockReq.params.id, mockReq.body);
      expect(result).toEqual(resolvedValue);
    });
  });

  describe('function deleteCaseStudy', () => {
    it('Should delete case study', async () => {
      const mockReq = {
        params: {
          id: '1',
        },
      };
      const resolvedValue = {
        case_study_id: '1',
        name: 'test-test',
        description: 'test hello',
        collaborators_ids: ['1', '2'],
        image: 'test',
        box_link: 'test',
        engagement_id: '1',
        createdAt: '2022-01-17T04:33:12.000Z',
        updatedAt: '2022-01-17T04:33:12.000Z',
        destroy: jest.fn(),
      };
      jest.spyOn(case_studies, 'findOne').mockResolvedValue(resolvedValue);
      const result = await updateCaseStudyServices.deleteCaseStudy(mockReq.params.id);
      expect(result).toEqual(resolvedValue);
    });
  });
});
