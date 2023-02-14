const updateCaseStudy = require('../../src/controllers/case-study.controller');
const updateCaseStudyServices = require('../../src/services/case-study.service');

describe('CaseStudyController', () => {
  describe('updateCaseStudyController', () => {
    it('should update caseStudy details', async () => {
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
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const resolvedValue = {
        case_study_id: '1',
        name: 'test',
        description: 'test',
        collaborators_ids: ['1', '2'],
        image: 'test',
        box_link: 'test',
        engagement_id: '1',
        createdAt: '2022-01-17T04:33:12.000Z',
        updatedAt: '2022-01-17T04:33:12.000Z',
      };
      jest.spyOn(updateCaseStudyServices, 'updateCaseStudy').mockResolvedValue(resolvedValue);
      await updateCaseStudy.updateCaseStudy(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(resolvedValue);
    });
    it('Should return 404 if caseStudy not found', async () => {
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
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const resolvedValue = null;
      jest.spyOn(updateCaseStudyServices, 'updateCaseStudy').mockResolvedValue(resolvedValue);
      await updateCaseStudy.updateCaseStudy(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Case study not found' });
    });
    it('Should return 500 if something went wrong', async () => {
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
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest.spyOn(updateCaseStudyServices, 'updateCaseStudy').mockRejectedValue(new Error('Something went wrong'));
      await updateCaseStudy.updateCaseStudy(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Something went wrong' });
    });
  });
  describe('deleteCaseStudyController', () => {
    it('should delete caseStudy', async () => {
      const mockReq = {
        params: {
          id: '1',
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const resolvedValue = {
        case_study_id: '1',
        name: 'test',
        description: 'test',
        collaborators_ids: ['1', '2'],
        image: 'test',
        box_link: 'test',
        engagement_id: '1',
        createdAt: '2022-01-17T04:33:12.000Z',
        updatedAt: '2022-01-17T04:33:12.000Z',
      };
      jest.spyOn(updateCaseStudyServices, 'deleteCaseStudy').mockResolvedValue(resolvedValue);
      await updateCaseStudy.deleteCaseStudy(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(resolvedValue);
    });
    it('Should return 404 if caseStudy not found', async () => {
      const mockReq = {
        params: {
          id: '1',
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const resolvedValue = null;
      jest.spyOn(updateCaseStudyServices, 'deleteCaseStudy').mockResolvedValue(resolvedValue);
      await updateCaseStudy.deleteCaseStudy(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Case study not found' });
    });
    it('Should return 500 if something went wrong', async () => {
      const mockReq = {
        params: {
          id: '1',
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest.spyOn(updateCaseStudyServices, 'deleteCaseStudy').mockRejectedValue(new Error('Something went wrong'));
      await updateCaseStudy.deleteCaseStudy(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Something went wrong' });
    });
  });
});
