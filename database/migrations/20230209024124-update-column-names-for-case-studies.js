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
    queryInterface.renameColumn('case_studies', 'caseStudyId', 'case_study_id');
    queryInterface.renameColumn('case_studies', 'collaboratorsIds', 'collaborators_ids');
    queryInterface.renameColumn('case_studies', 'boxLink', 'box_link');
    queryInterface.renameColumn('case_studies', 'engagementId', 'engagement_id');
    queryInterface.renameColumn('case_studies', 'createdAt', 'created_at');
    queryInterface.renameColumn('case_studies', 'updatedAt', 'updated_at');
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    queryInterface.renameColumn('case_studies', 'case_study_id', 'caseStudyId');
    queryInterface.renameColumn('case_studies', 'collaborators_ids', 'collaboratorsIds');
    queryInterface.renameColumn('case_studies', 'box_link', 'boxLink');
    queryInterface.renameColumn('case_studies', 'engagement_id', 'engagementId');
    queryInterface.renameColumn('case_studies', 'created_at', 'createdAt');
    queryInterface.renameColumn('case_studies', 'updated_at', 'updatedAt');
  },
};
