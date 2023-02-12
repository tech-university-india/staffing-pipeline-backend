'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('auths', [
      {
        email: 'promit.revar2211@gmail.com',
        password: '$2b$08$ap2OSCeWEBVlDY.xui2bPuoblmWTDQwetDvMHZF1B7k.NI3Ae5Tyq',
        updated_at: new Date(),
        created_at: new Date(),
      },
      {
        email: 'param@gmail.com',
        password: '$2b$08$zmfjCVc5HbYlemPNDQwMPuiTZEGHY79hYQuCz/TtjUTWXcJ1TJs8m',
        updated_at: new Date(),
        created_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('auths', null, {});
  },
};
