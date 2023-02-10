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
      engagement_id: DataTypes.STRING,
      name: DataTypes.STRING,
      tags: DataTypes.ARRAY(DataTypes.STRING),
      skills: DataTypes.ARRAY(DataTypes.STRING),
      guild: DataTypes.ENUM('Swe', 'Product', 'Data'),
      user_ids: DataTypes.ARRAY(DataTypes.STRING),
      case_study_ids: DataTypes.ARRAY(DataTypes.STRING),
      status: DataTypes.ENUM('upcoming', 'ongoing', 'completed'),
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
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
