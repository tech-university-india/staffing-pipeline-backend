'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('case_studies', [
      {
        case_study_id: '9225cf89-97f7-4ec8-8c36-54c68842a2e6',
        name: 'Staffing',
        description: 'Create a staffing pipeline',
        collaborators_ids: ['a90c610c-1bd5-40c4-8b01-fdd7708f3730'],
        image: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg',
        box_link: 'https://mckinsey.box.com/s/29gnws8p3wluztn6l7ag2kd2vbrjiweg',
        engagement_id: 'd87ffb9b-06f2-4adb-8b6b-140995d97b04',
        updated_at: new Date(),
        created_at: new Date(),
      },
      {
        case_study_id: '7de2e0b9-a1f4-465f-b2bd-b94316cd24bc',
        name: 'Recruiting Portal',
        description: 'Build a portal for recruiting',
        collaborators_ids: ['8efb2eef-b1fe-4124-bef1-6a1dcab02f85'],
        image: 'https://dwglogo.com/wp-content/uploads/2017/09/1460px-React_logo-1024x704.png',
        box_link: 'https://mckinsey.box.com/s/pe9vc4bj9hs1il7n9lbkp3nop2cpgqz7',
        engagement_id: 'be753dd4-7a33-449a-956a-a359b13282f3',
        updated_at: new Date(),
        created_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('case_studies', null, {});
  },
};
