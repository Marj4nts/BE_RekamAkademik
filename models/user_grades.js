'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_grades extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_grades.init({
    user_id: DataTypes.INTEGER,
    grade_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_grades',
  });
  return user_grades;
};