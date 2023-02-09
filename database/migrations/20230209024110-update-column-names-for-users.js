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
    queryInterface.renameColumn('users', 'userId', 'user_id');
    queryInterface.renameColumn('users', 'currentEngagementIds', 'current_engagement_ids');
    queryInterface.renameColumn('users', 'caseStudies', 'case_studies');
    queryInterface.renameColumn('users', 'pastEngagementId', 'past_engagement_ids');
    queryInterface.renameColumn('users', 'createdAt', 'created_at');
    queryInterface.renameColumn('users', 'updatedAt', 'updated_at');
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     * 
     */
    queryInterface.renameColumn('users', 'user_id', 'userId');
    queryInterface.renameColumn('users', 'current_engagement_ids', 'currentEngagementIds');
    queryInterface.renameColumn('users', 'case_studies', 'caseStudies');
    queryInterface.renameColumn('users', 'past_engagement_ids', 'pastEngagementId');
    queryInterface.renameColumn('users', 'created_at', 'createdAt');
    queryInterface.renameColumn('users', 'updated_at', 'updatedAt');


  }
};
