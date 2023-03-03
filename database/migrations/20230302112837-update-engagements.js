'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.changeColumn('engagements', 'engagement_id', {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
