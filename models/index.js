'use strict';

const fs = require('fs');
const path = require('path');
const {Sequelize,DataTypes} = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(
  "differhome","root","",
  {
      host:'localhost',
      dialect:'mysql',
      logging:false,
      pool:{max:5,min:0,idle:10000}
  } 
)
sequelize.authenticate().then(()=>{
  console.log('connected');
})

.catch((err)=>{
  console.log(err);
})
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.projects = require('./projects')(sequelize,DataTypes);
db.projectDetails = require('./projectsdetails')(sequelize,DataTypes);
db.extraDetails = require('./extradetails')(sequelize,DataTypes);
db.images = require('./images')(sequelize,DataTypes);
db.users = require('./users')(sequelize,DataTypes);

db.projects.hasOne(db.projectDetails,{foreignKey:'projectID'});
db.projectDetails.belongsTo(db.projects);

db.projects.hasOne(db.extraDetails,{foreignKey:'projectID'});
db.extraDetails.belongsTo(db.projects);

db.projects.hasMany(db.images,{foreignKey:'projectID'});
db.images.belongsTo(db.projects);
// db.sequelize.sync().then(()=>{console.log('yes re-sync')})

module.exports = db;