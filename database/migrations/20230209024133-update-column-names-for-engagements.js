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
    queryInterface.renameColumn('engagements', 'engagementId', 'engagement_id');
    queryInterface.renameColumn('engagements', 'userIds', 'user_ids');
    queryInterface.renameColumn('engagements', 'caseStudyIds', 'case_study_ids');
    queryInterface.renameColumn('engagements', 'startDate', 'start_date');
    queryInterface.renameColumn('engagements', 'endDate', 'end_date');
    queryInterface.renameColumn('engagements', 'createdAt', 'created_at');
    queryInterface.renameColumn('engagements', 'updatedAt', 'updated_at');

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    queryInterface.renameColumn('engagements', 'engagement_id', 'engagementId');
    queryInterface.renameColumn('engagements', 'user_ids', 'userIds');
    queryInterface.renameColumn('engagements', 'case_study_ids', 'caseStudyIds');
    queryInterface.renameColumn('engagements', 'start_date', 'startDate');
    queryInterface.renameColumn('engagements', 'end_date', 'endDate');
    queryInterface.renameColumn('engagements', 'created_at', 'createdAt');
    queryInterface.renameColumn('engagements', 'updated_at', 'updatedAt');
  }
};
