'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_rombels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_rombels.init({
    user_id: DataTypes.INTEGER,
    rombel_id: DataTypes.INTEGER,
    is_alumni: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'user_rombels',
  });
  return user_rombels;
};