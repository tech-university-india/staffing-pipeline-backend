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
    await queryInterface.renameColumn('engagements', 'engagementId', 'engagement_id');
    await queryInterface.renameColumn('engagements', 'userIds', 'user_ids');
    await queryInterface.renameColumn('engagements', 'caseStudyIds', 'case_study_ids');
    await queryInterface.renameColumn('engagements', 'startDate', 'start_date');
    await queryInterface.renameColumn('engagements', 'endDate', 'end_date');
    await queryInterface.renameColumn('engagements', 'createdAt', 'created_at');
    await queryInterface.renameColumn('engagements', 'updatedAt', 'updated_at');
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.renameColumn('engagements', 'engagement_id', 'engagementId');
    await queryInterface.renameColumn('engagements', 'user_ids', 'userIds');
    await queryInterface.renameColumn('engagements', 'case_study_ids', 'caseStudyIds');
    await queryInterface.renameColumn('engagements', 'start_date', 'startDate');
    await queryInterface.renameColumn('engagements', 'end_date', 'endDate');
    await queryInterface.renameColumn('engagements', 'created_at', 'createdAt');
    await queryInterface.renameColumn('engagements', 'updated_at', 'updatedAt');
  },
};
