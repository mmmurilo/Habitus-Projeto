module.exports = {
    dialect: 'postgres',
    host: 'localhost', //elephant cria na web
    username: 'postgres',
    password: 'admin',
    database: 'sqlhabitus',
    define:{
        timestamp: true, //created_at, update_at registra automático criação e atualização do banco
        underscored: true, // user_groupe (Snake Case) no lugar de UserGroupe (Pascal Case)
    },
};