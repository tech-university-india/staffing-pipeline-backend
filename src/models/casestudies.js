'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CaseStudies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CaseStudies.init(
    {
      case_study_id: DataTypes.STRING,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      collaborators_ids: DataTypes.ARRAY(DataTypes.STRING),
      image: DataTypes.STRING,
      box_link: DataTypes.STRING,
      engagement_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'case_studies',
    }
  );
  return CaseStudies;
};
