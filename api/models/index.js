const User = require('./user');
const Token = require('./token');
const Camera = require('./camera');
class Model{


    constructor(app){
        this.app = app;



        this.user = new User(app);
        this.token = new Token(app);
        this.camera = new Camera(app);

    }
}

module.exports = Model;