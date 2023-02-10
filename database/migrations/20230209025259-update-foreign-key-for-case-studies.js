'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint('case_studies', {
      type: 'foreign key',
      name: 'engagement_id_fk',
      fields: ['engagement_id'],
      references: {
        table: 'engagements',
        field: 'engagement_id',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('case_studies', 'engagement_id_fk');
  },
};
