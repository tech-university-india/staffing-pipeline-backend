'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Engagements extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Engagements.init(
    {
      engagementId: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      tags: DataTypes.ARRAY(DataTypes.STRING),
      skills: DataTypes.ARRAY(DataTypes.STRING),
      guild: DataTypes.ENUM('swe', 'product', 'data','unspecified'),
      userIds: DataTypes.ARRAY(DataTypes.STRING),
      caseStudyIds: DataTypes.ARRAY(DataTypes.STRING),
      status: DataTypes.ENUM('upcoming', 'ongoing', 'completed'),
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'engagements',
      underscored: true,
    }
  );
  return Engagements;
};
