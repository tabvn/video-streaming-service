const User = require('./user');
const Token = require('./token')
class Model{


    constructor(app){
        this.app = app;



        this.user = new User(app);
        this.token = new Token(app);

    }
}

module.exports = Model;