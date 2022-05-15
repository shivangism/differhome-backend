'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectsDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProjectsDetails.init({
    area: DataTypes.INTEGER,
    budget: DataTypes.INTEGER,
    type2: DataTypes.INTEGER,
    bhk: DataTypes.INTEGER,
    age: DataTypes.INTEGER,
    status: DataTypes.STRING,
    furnished: DataTypes.BOOLEAN,
    projectID: DataTypes.INTEGER,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProjectsDetails',
  });
  return ProjectsDetails;
};