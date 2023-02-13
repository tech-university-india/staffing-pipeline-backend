'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('engagements', [
      {
        engagement_id: 'd87ffb9b-06f2-4adb-8b6b-140995d97b04',
        name: 'staffing',
        tags: null,
        skills: null,
        guild: null,
        user_ids: ['a90c610c-1bd5-40c4-8b01-fdd7708f3730'],
        case_study_ids: ['9225cf89-97f7-4ec8-8c36-54c68842a2e6'],
        status: null,
        start_date: null,
        end_date: null,
        image: null,
        updated_at: new Date(),
        created_at: new Date(),
      },
      {
        engagement_id: 'be753dd4-7a33-449a-956a-a359b13282f3',
        name: 'Recruiting Portal',
        tags: null,
        skills: ['Node', 'React', 'Java'],
        guild: null,
        user_ids: ['8efb2eef-b1fe-4124-bef1-6a1dcab02f85'],
        case_study_ids: ['7de2e0b9-a1f4-465f-b2bd-b94316cd24bc'],
        status: null,
        start_date: null,
        end_date: null,
        image: null,
        updated_at: new Date(),
        created_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('engagements', null, {});
  },
};
