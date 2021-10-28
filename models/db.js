const Sequelize = require('sequelize')

//conexão com o banco de dados mysql
const sequelize = new Sequelize('postagens', 'root', '123456', {
    host: "localhost",
    dialect: 'mysql'
})   

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize,
}