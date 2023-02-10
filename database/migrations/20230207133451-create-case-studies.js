'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('case_studies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      caseStudyId: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      collaboratorsIds: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      image: {
        type: Sequelize.STRING,
      },
      boxLink: {
        type: Sequelize.STRING,
      },
      engagementId: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('case_studies');
  },
};
