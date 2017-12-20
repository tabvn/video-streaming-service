const {ObjectID} = require('mongodb');
const {OrderedMap} = require('immutable');
const _ = require('lodash');

class Token {

    constructor(app) {

        this.app = app;
        this.tokens = new OrderedMap();

    }


    addTokenToCache(id, token) {

        this.tokens = this.tokens.set(id, token);
    }

    verify(tokenId, cb = () => {
    }) {

        // let find token with id in cache
        if (typeof tokenId !== 'string') {
            tokenId = _.toString(tokenId);
        }
        const tokenInCache = this.tokens.get(tokenId);

        if (tokenInCache) {

            // let find user and attached to data in response
            const userIdString = tokenInCache.userId.toString();

            this.app.models.user.load(userIdString, (err, user) => {

                if (err) {
                    return cb(err, null);
                }


                _.unset(user, 'password');
                return cb(null, user);
            });


        } else {

            let tokenObjectId = null;

            // let find token in db
            try{
                tokenObjectId =  new ObjectID(tokenId);
            }
            catch (err){

                console.log(err);

            }


            this.app.db.collection('token').find({_id: tokenObjectId}).limit(1).toArray((err, results) => {


                if(err || !_.get(results, '[0]')){

                    return cb("Token not found", null);
                }


                const token = _.get(results, '[0]');

                const userIdString = token.userId.toString();

                this.app.models.user.load(userIdString, (err, user) => {

                    if (err) {
                        return cb(err, null);
                    }



                    _.unset(user, 'password');

                    return cb(null, user);
                });



            });


        }

    }


    create(userId, cb = () => {
    }) {

        if (typeof userId === 'string') {

            userId = new ObjectID(userId)
        }

        const token = {
            userId: userId,
            created: new Date(),

        }

        this.app.db.collection('token').insertOne(token, (err, info) => {

            if (err == null) {
                // set this token to the cache and for fast query later.

                const tokenId = token._id.toString(); // _.toString(token._id)

                this.addTokenToCache(tokenId, token);
            }
            return err ? cb("Can not create token", null) : cb(null, token);

        });

    }
}

module.exports = Token;