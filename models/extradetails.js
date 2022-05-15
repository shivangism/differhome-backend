'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExtraDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ExtraDetails.init({
    carpetArea: DataTypes.INTEGER,
    priceSqft: DataTypes.INTEGER,
    reraRegistered: DataTypes.BOOLEAN,
    parking: DataTypes.BOOLEAN,
    balcony: DataTypes.BOOLEAN,
    security: DataTypes.BOOLEAN,
    about: DataTypes.STRING,
    projectID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ExtraDetails',
  });
  return ExtraDetails;
};