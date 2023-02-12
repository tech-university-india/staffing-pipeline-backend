'use strict';
<<<<<<< HEAD
const { Model } = require('sequelize');
=======
const {Model} = require('sequelize');
>>>>>>> 19bf866 (chore: formatting with prettier)
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
  Users.init(
    {
      userId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fmno: DataTypes.STRING,
      currentEngagementIds: DataTypes.ARRAY(DataTypes.STRING),
      caseStudyIds: DataTypes.ARRAY(DataTypes.STRING),
      skills: DataTypes.ARRAY(DataTypes.STRING),
      role: DataTypes.ENUM('unspecified'),
      guild: DataTypes.ENUM('unspecified'),
      pastEngagementIds: DataTypes.ARRAY(DataTypes.STRING),
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'users',
      underscored: true,
    }
  );
  return Users;
};
