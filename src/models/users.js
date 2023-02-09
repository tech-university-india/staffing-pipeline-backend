'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init({
    password: DataTypes.TEXT,
    user_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    fmno: DataTypes.STRING,
    current_engagement_ids: DataTypes.ARRAY(DataTypes.STRING),
    case_study_ids: DataTypes.ARRAY(DataTypes.STRING),
    skills: DataTypes.ARRAY(DataTypes.STRING),
    role: DataTypes.ENUM('unspecified'),
    guild: DataTypes.ENUM('unspecified'),
    past_engagement_ids: DataTypes.ARRAY(DataTypes.STRING),
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
    underscored: true,
  });
  return Users;
};