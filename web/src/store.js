import Service from "./service";
import _ from 'lodash'
import {OrderedMap} from 'immutable'

export default class Store {

    constructor(app) {

        this.app = app;
        this.service = new Service(this);
        this.token = this.loadTokenFromLocalStorage();
        this.cameras = new OrderedMap();

        this.isFetched = {
            userCamera: false,
        }

    }

    addCameraToCache(id, cam, reload = false) {
        this.cameras = this.cameras.set(id, cam);

        if (reload) {
            this.update();
        }
    }

    getUserCameras() {

        if (!this.isFetched.userCamera) {
            this.isFetched.userCamera = true;

            // now fetch all camera from server

            this.service.get('/api/me/cameras').then((response) => {


                const cameras = response.data;

                if (cameras.length) {

                    _.each(cameras, (cam) => {

                        const id = _.get(cam, '_id');
                        this.addCameraToCache(id, cam, false);


                    });

                    this.update();
                }

            }).catch((err) => {

                console.log("An able loading camera with error", err);
            })
        }
        return this.cameras.valueSeq();

    }

    getCurrentUserTokenId() {

        return _.get(this.token, '_id');
    }

    getCurrentUser() {

        return _.get(this.token, 'user');
    }

    addCamera(camera, cb = () => {
    }) {


        // request a post with camera object to our backend.

        this.service.post('/api/me/cameras', camera).then((response) => {


            const camera = response.data;

            const id = _.get(camera, '_id');
            this.addCameraToCache(id, camera, true);

            return cb(null, response.data);
        }).catch((err) => {

            return cb(err, null);
        })
    }

    loadTokenFromLocalStorage() {

        const data = localStorage.getItem('token');

        let token = null;

        try {

            token = JSON.parse(data);
        } catch (err) {
            console.log("Unable decode token from local store with error:", err);
        }


        return token;
    }

    saveUserTokenToLocalStorage(tokenObject) {

        this.token = tokenObject;

        const stringData = JSON.stringify(tokenObject);

        localStorage.setItem('token', stringData);

        // let update our component

        this.update();

    }

    createUserAccount(user, cb = () => {
    }) {

        this.service.post('/api/users', user).then((response) => {


            return cb(null, response.data);
        }).catch((err) => {

            console.log("Create new account with error:", err);

            return cb(err, null);

        });
    }

    login(user, cb = () => {
    }) {

        this.service.post('/api/users/login', user).then((response) => {


            const token = _.get(response, 'data', null);

            this.saveUserTokenToLocalStorage(token);


            return cb(null, token);

        }).catch(err => {


            return cb(err, null);
        })
    }

    update() {

        this.app.forceUpdate();
    }
}