const _ = require('lodash');
const bcrypt = require('bcrypt');
const salt = 10;
const {OrderedMap} = require('immutable');
const {ObjectID} = require('mongodb')

class User {

    constructor(app) {


        this.app = app;
        // users in cache.
        this.users = new OrderedMap();


    }


    load(id, cb = () => {
    }) {



        // first load user in cache

        const userInCache = this.users.get(id);

        if (userInCache) {
            return cb(null, userInCache);
        }

        // not found in cache let find in db
        const userObjectId = new ObjectID(id);
        this.app.db.collection('user').find({_id: userObjectId}).limit(1).toArray((err, results) => {

            if (err || !_.get(results, '[0]')) {

                return cb("User not found", null);
            }

            return cb(null, _.get(results, '[0]'));
        });
    }

    validateEmail(email = "") {

        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return emailRegex.test(email);
    }

    addUserToCache(id, user) {

        id = _.toString(id);
        this.users = this.users.set(id, user);
    }


    beforeSave(user, cb = () => {
    }) {

        const collection = this.app.db.collection('user');

        let err = null;


        const validations = {
            name: {
                errorMessage: "Name is required",
                doValid: () => {


                    const name = _.get(user, 'name', '');
                    if (name && name.length) {
                        return true;
                    }
                    return false;
                }
            },
            email: {
                errorMessage: "Email is not valid",
                doValid: () => {
                    const email = _.get(user, 'email', '');
                    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


                    return emailRegex.test(email);

                }
            },
            password: {
                errorMessage: "Password is required and more than 3 characters",
                doValid: () => {

                    const password = _.get(user, 'password', '');
                    if (password && password.length >= 3) {

                        return true;
                    }

                    return false;
                }
            }

        };


        let errors = [];

        _.each(validations, (validation, field) => {

            // console.log("Debug:!!!!", field, validation);

            const isValid = validation.doValid();

            if (!isValid) {

                const errorMessage = validation.errorMessage;

                errors.push(errorMessage);

            }

        });

        if (errors.length) {

            const err = _.join(errors, ',');
            console.log("Validation finally is:", err);
            return cb(err, user);
        } else {


            // let find in our database make sure this email address is not exist.
            const email = _.get(user, 'email');
            collection.findOne({email: {$eq: email}}, (err, result) => {

                console.log("Find email in db with result ", err, result)


                if (err || result) {

                    // this mean user exist. or some error.

                    return cb("Email already exist, please try other email.");
                }


                return cb(null, user);

            });

        }

        //return cb(err, user);


    }

    /**
     * Create new user account with object
     * @param user
     * @param callback with err, result
     */
    create(user = {}, cb = () => {
    }) {

        const collection = this.app.db.collection('user');

        let obj = {
            name: _.toString(_.get(user, 'name', '')),
            email: _.trim(_.toLower(_.get(user, 'email', ''))),
            password: _.get(user, 'password'),
            created: new Date(),
        };


        // we do need validate this user object before saving to our mongodb.

        this.beforeSave(obj, (err, user) => {

            if (err) {

                return cb(err, null);
            }


            // save user to our db
            const userPlaintextPassword = user.password;

            user.password = bcrypt.hashSync(userPlaintextPassword, salt);

            collection.insertOne(user, (err, info) => {

                if (err) {
                    return cb(err, null);
                }

                const id = _.toString(user._id);

                // set this user to cache and we get later fasty.
                this.addUserToCache(id, user);

                return cb(null, user);
            });

        });


    }


    login(email, password = "", cb = () => {
    }) {

        if (!this.validateEmail(email)) {
            return cb("Email is not valid", null);
        }

        // if email is valid let find this email in db if exist.

        const query = {
            email: `${email}`
        };

        const options = {
            _id: true,
            password: true,
            name: true,
            created: true,
            email: true,
        };

        const collection = this.app.db.collection('user');


        collection.find(query, options).limit(1).toArray((err, results) => {

            if (err || !_.get(results, '[0]')) {

                return cb("User Not found", null);
            }

            // user is found. let verify the password
            const user = _.get(results, '[0]');
            const encodedPassword = _.get(user, 'password');
            const passwordIsMatch = bcrypt.compareSync(password, encodedPassword);
            _.unset(user, 'password');
            if (passwordIsMatch) {

                // let create token object

                this.app.models.token.create(user._id, (err, token) => {

                    if (err) {
                        return cb(err, null);
                    }

                    token.user = user;

                    return cb(null, token);

                });


            } else {
                return cb("Password does not match", null)

            }


        });

    }

}

module.exports = User;