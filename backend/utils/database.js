const sequelize=require('sequelize');

module.exports=new sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD,{
    dialect: 'mysql',
    host:process.env.DB_HOST
});