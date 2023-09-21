'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rombels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  rombels.init({
    major_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'rombels',
  });
  return rombels;
};