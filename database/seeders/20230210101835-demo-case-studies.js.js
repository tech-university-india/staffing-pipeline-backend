'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('case_studies', [{
      "caseStudyId": "9225cf89-97f7-4ec8-8c36-54c68842a2e6",
      "name": "staffing",
      "description": "Create a staffing pipeline",
      "collaboratorsId": ["a90c610c-1bd5-40c4-8b01-fdd7708f3730"],
      "image": "imagee",
      "boxLink": "boxing",
      "engagementId": "d87ffb9b-06f2-4adb-8b6b-140995d97b04"
    },
    {
      "caseStudyId": "7de2e0b9-a1f4-465f-b2bd-b94316cd24bc",
      "name": "Recruiting Portal",
      "description": "Build a portal for recruiting",
      "collaboratorsId": ["8efb2eef-b1fe-4124-bef1-6a1dcab02f85"],
      "image": "imagee",
      "boxLink": "boxing",
      "engagementId": "be753dd4-7a33-449a-956a-a359b13282f3"
    }]);
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('case_studies', null, {});
  }
};
