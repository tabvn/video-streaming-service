const _ = require('lodash');
const {ObjectID} = require('mongodb');

exports.routers = (app) => {


    /**
     * Middleware for checking user with token access id
     *
     */

    const allowAuthenticatedUser = (req, res, next) => {


        let tokenId = req.get('authorization');
        if (!tokenId) {
            tokenId = req.query.auth;
        }


        if (!tokenId) {

            return errorHandle(res, "Access denied", 401);
        } else {

            // let veriy this token

            app.models.token.load(tokenId, (err, result) => {

                if (err) {

                    return errorHandle(res, "Access denied", 401);
                }

                req.ctx = {
                    token: result
                };

                return next();

            });

        }

    };

    /**
     * Error Handle in response
     * @param res
     * @param errorMessage
     * @param code
     * @returns {*|JSON|Promise<any>}
     */
    const errorHandle = (res, errorMessage, code = 500) => {

        return res.status(code).json({error: {message: errorMessage}});
    };

    /**
     * Success response handler
     * @param res
     * @param data
     * @param code
     * @returns {*|JSON|Promise<any>}
     */

    const responseHandle = (res, data, code = 200) => {

        return res.status(code).json(data);
    };


    /**
     * @method GET
     * @endpoint /
     * @description Root api
     *
     */

    app.get('/', (req, res) => {

        return res.json({version: '1.0'});
    });


    /**
     * @method POST
     * @endpoint /api/on-live-auth
     * @description authentication for live stream user
     *
     */

    app.post('/api/on-live-auth', (req, res, next) => {


        const streamInfo = req.body;
        const streamSecretKey = _.get(streamInfo, 'name');
        // we can check stream_key to verify it in backend.
        console.log(`User begin streaming and we are veryfing ${streamSecretKey}`);
        // After veryfing secret streaming key and we allow user stream their video.  return http status 200.
        return res.status(200).json({
            verified: true,
        });

        //return res.status(401).json({access: false});

    });

    /**
     * @method POST
     * @endpoint /api/on-live-done
     * @description Event after user finishing streaming.
     *
     */
    app.post('/api/on-live-done', (req, res, next) => {

        const streamingKey = _.get(req, 'body.name');
        console.log(`User finishing streaming camera.`, streamingKey);

        // return http code anything does not effect to our live server.

        return res.json({
            done: true
        });

    });


    /**
     * @method POST
     * @endpoint /api/camera/:id/stream
     * @description send command to server with camera ID and stream or stop stream.
     *
     */

    app.post('/api/camera/:id/stream', (req, res, next) => {


        const body = req.body;

        console.log("Got body command", body);

        const payload = _.get(body, 'stream', false);

        // after receiving action from User owner of camera we need to send to RaspberryPi with stream not not stream.

        const connections = app.connections.getClients();

        // loop every raspberry pi socket client and send this command to Pi.
        connections.forEach((con) => {

            const ws = con.ws;
            if (ws) {
                const message = {
                    action: 'stream',
                    payload: payload
                };
                ws.send(JSON.stringify(message));
            }

        });

        return res.status(200).json({
            received: true
        });

    });
    /**
     * @method POST
     * @endpoint /api/users
     * @description create new user
     *
     */

    app.post('/api/users', (req, res, next) => {


        const body = req.body;

        app.models.user.create(body, (err, result) => {

            if (err === null && result) {
                _.unset(result, 'password');
            }
            return err ? errorHandle(res, err, 503) : responseHandle(res, result);

        });
    });


    /**
     * @method GET
     * @endpoint /api/users/me
     * @description Get owner info.
     *
     */

    app.get('/api/users/me', (req, res, next) => {

        let tokenId = req.get('authorization');
        if (!tokenId) {

            tokenId = req.query.auth;
        }

        if (!tokenId) {

            return errorHandle(res, "Access denied", 401);
        }


        app.models.token.verify(tokenId, (err, result) => {

            if (err) {
                return errorHandle(res, "Access denied", 401);
            }

            return responseHandle(res, result);
        });
    });


    /**
     * @method GET
     * @endpoint /api/me/cameras
     * @description Get owner cameras.
     *
     */

    app.get('/api/me/cameras', allowAuthenticatedUser, (req, res, next) => {


        let userId = _.get(req, 'ctx.token.userId');

        if(typeof userId === 'string'){
            userId = new ObjectID(userId);
        }
        const query = {
            userId: userId
        };
        const options = {
            _id: true,
            name: true,
            created: true,
            live: true,
            lastConnected:true,
            isConnected: true,
            created: true
        }

        app.models.camera.find(query, options, (err, results) => {

            if(err){
                return errorHandle(res, err, 404);
            }

            return responseHandle(res, results);
        })



    });


    /**
     * @method POST
     * @endpoint /api/me/cameras
     * @description add new user camera
     *
     */

    app.post('/api/me/cameras', allowAuthenticatedUser, (req, res, next) => {



        let camera = req.body;
        if(!camera){
            return errorHandle(res, "Camera is required", 500);
        }
        const userId = _.get(req, 'ctx.token.userId');

        camera = _.setWith(camera, 'userId', userId);

        app.models.camera.create(camera, (err, result) => {

            if(err){

                return errorHandle(res, err);
            }

            return responseHandle(res, result, 200);

        });



    });


    /**
     * @method POST
     * @endpoint /api/users/login
     * @description Login a user and return token object
     *
     */

    app.post('/api/users/login', (req, res, next) => {
        const userData = req.body;

        if (!_.get(userData, 'email') || !_.get(userData, 'password')) {

            return errorHandle(res, "Email & Password is required", 500);
        }

        app.models.user.login(_.get(userData, 'email', ''), _.get(userData, 'password'), (err, result) => {

            if (err) {

                return errorHandle(res, err, 401);
            }

            return responseHandle(res, result);

        });


    });


};