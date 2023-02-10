'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('auth', [
      {
        id: 1,
        email: 'promit.revar2211@gmail.com',
        password: '$2b$08$ap2OSCeWEBVlDY.xui2bPuoblmWTDQwetDvMHZF1B7k.NI3Ae5Tyq',
        createdAt: '2023-02-09T14:45:57.071Z',
        updatedAt: '2023-02-09T14:45:57.071Z',
      },
      {
        id: 3,
        email: 'param@gmail.com',
        password: '$2b$08$zmfjCVc5HbYlemPNDQwMPuiTZEGHY79hYQuCz/TtjUTWXcJ1TJs8m',
        createdAt: '2023-02-10T07:35:31.909Z',
        updatedAt: '2023-02-10T07:35:31.909Z',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('auth', null, {});
  },
};
