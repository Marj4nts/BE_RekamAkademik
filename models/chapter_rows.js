'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chapter_rows extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  chapter_rows.init({
    chapter_header_id: DataTypes.INTEGER,
    desc: DataTypes.TEXT,
    input_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'chapter_rows',
  });
  return chapter_rows;
};