const User = require('./user');

class Model{


    constructor(app){
        this.app = app;



        this.user = new User(app);

    }
}

module.exports = Model;