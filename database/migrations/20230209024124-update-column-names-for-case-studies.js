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
    await queryInterface.renameColumn('case_studies', 'caseStudyId', 'case_study_id');
    await queryInterface.renameColumn('case_studies', 'collaboratorsIds', 'collaborators_ids');
    await queryInterface.renameColumn('case_studies', 'boxLink', 'box_link');
    await queryInterface.renameColumn('case_studies', 'engagementId', 'engagement_id');
    await queryInterface.renameColumn('case_studies', 'createdAt', 'created_at');
    await queryInterface.renameColumn('case_studies', 'updatedAt', 'updated_at');

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.renameColumn('case_studies', 'case_study_id', 'caseStudyId');
    await queryInterface.renameColumn('case_studies', 'collaborators_ids', 'collaboratorsIds');
    await queryInterface.renameColumn('case_studies', 'box_link', 'boxLink');
    await queryInterface.renameColumn('case_studies', 'engagement_id', 'engagementId');
    await queryInterface.renameColumn('case_studies', 'created_at', 'createdAt');
    await queryInterface.renameColumn('case_studies', 'updated_at', 'updatedAt');

  }
};
