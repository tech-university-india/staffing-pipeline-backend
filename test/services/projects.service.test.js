const { engagements } = require('../../src/models');
const getProjectServices = require('../../src/services/projectServices');

describe('Engagement Services', () => {
  it('should return the engagement details of the provided id from the database', async () => {
    jest.spyOn(engagements, 'findByPk').mockResolvedValue([
      {
        engagement_id: 1223,
        user_ids: ['1', '2', '3'],
        case_study_ids: ['23', '34', '56']

      }
    ]
    );
    const project = await getProjectServices.getProject();
    expect(project).toEqual(
      [
        {
          engagement_id: 1223,
          user_ids: ['1', '2', '3'],
          case_study_ids: ['23', '34', '56']

        }

      ]
    );
  });
});    
