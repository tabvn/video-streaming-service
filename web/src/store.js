import Service from "./service";

export default  class Store{

    constructor(app){

        this.app = app;
        this.service = new Service(this);

    }

    createUserAccount(user, cb = () => {}){

        this.service.post('/api/users', user).then((response) => {

            return cb(null, response.data);
        }).catch((err) => {

            console.log("Create new account with error:", err);

            return cb(err, null);

        });
    }
    login(user, cb = () => {}){

        this.service.post('/api/users/login', user).then((response) => {

            return cb(null, response.data);

        }).catch(err => {


            return cb(err, null);
        })
    }
    update(){

        this.app.forceUpdate();
    }
}