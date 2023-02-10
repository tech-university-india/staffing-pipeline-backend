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
    await queryInterface.renameColumn('users', 'userId', 'user_id');
    await queryInterface.renameColumn('users', 'currentEngagementIds', 'current_engagement_ids');
    await queryInterface.renameColumn('users', 'caseStudies', 'case_studies');
    await queryInterface.renameColumn('users', 'pastEngagementId', 'past_engagement_ids');
    await queryInterface.renameColumn('users', 'createdAt', 'created_at');
    await queryInterface.renameColumn('users', 'updatedAt', 'updated_at');
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     * 
     */
    await queryInterface.renameColumn('users', 'user_id', 'userId');
    await queryInterface.renameColumn('users', 'current_engagement_ids', 'currentEngagementIds');
    await queryInterface.renameColumn('users', 'case_studies', 'caseStudies');
    await queryInterface.renameColumn('users', 'past_engagement_ids', 'pastEngagementId');
    await queryInterface.renameColumn('users', 'created_at', 'createdAt');
    await queryInterface.renameColumn('users', 'updated_at', 'updatedAt');


  }
};
