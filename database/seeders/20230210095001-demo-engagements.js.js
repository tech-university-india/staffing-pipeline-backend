'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('engagements', [
      {
        engagement_id: 'd87ffb9b-06f2-4adb-8b6b-140995d97b04',
        name: 'Staffing',
        tags: ['urgent'],
        skills: ['Node', 'Angular', 'Python'],
        guild: 'swe',
        user_ids: ['a90c610c-1bd5-40c4-8b01-fdd7708f3730'],
        case_study_ids: ['9225cf89-97f7-4ec8-8c36-54c68842a2e6'],
        status: 'ongoing',
        start_date: new Date(Date.now() - 6.048e8),
        end_date: new Date(Date.now() + 6.048e8 * 2),
        image: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg',
        updated_at: new Date(),
        created_at: new Date(),
      },
      {
        engagement_id: 'be753dd4-7a33-449a-956a-a359b13282f3',
        name: 'Recruiting Portal',
        tags: ['important'],
        skills: ['Node', 'React', 'Java'],
        guild: 'product',
        user_ids: ['8efb2eef-b1fe-4124-bef1-6a1dcab02f85'],
        case_study_ids: ['7de2e0b9-a1f4-465f-b2bd-b94316cd24bc'],
        status: 'upcoming',
        start_date: new Date(Date.now() + 6.048e8),
        end_date: new Date(Date.now() + 6.048e8 * 3),
        image: 'https://dwglogo.com/wp-content/uploads/2017/09/1460px-React_logo-1024x704.png',
        updated_at: new Date(),
        created_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('engagements', null, {});
  },
};
