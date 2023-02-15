'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert(
      'users',
      [
        {
          user_id: 'a90c610c-1bd5-40c4-8b01-fdd7708f3730',
          email: 'param@gmail.com',
          name: 'Param Mehta',
          fmno: '328060',
          current_engagement_ids: ['d87ffb9b-06f2-4adb-8b6b-140995d97b04'],
          case_study_ids: ['9225cf89-97f7-4ec8-8c36-54c68842a2e6'],
          skills: ['React', 'Node', 'GoLang'],
          role: null,
          guild: null,
          past_engagement_ids: null,
          image: null,
          updated_at: new Date(),
          created_at: new Date(),
        },
        {
          user_id: '8efb2eef-b1fe-4124-bef1-6a1dcab02f85',
          name: 'Promit Revar',
          email: 'promit.revar2211@gmail.com',
          fmno: '328560',
          current_engagement_ids: ['be753dd4-7a33-449a-956a-a359b13282f3'],
          case_study_ids: ['7de2e0b9-a1f4-465f-b2bd-b94316cd24bc'],
          skills: ['React', 'Node', 'Java', 'Python', 'C++'],
          role: null,
          guild: null,
          past_engagement_ids: null,
          image: null,
          updated_at: new Date(),
          created_at: new Date(),
          
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('users', null, {});
  },
};