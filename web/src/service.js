import axios from 'axios'
import {api} from './config'
import _ from 'lodash'


export default class Service{

    constructor(store){

        this.store = store;
    }


    get(apiPath, options = {}){

        const currentUserTokenId = this.store.getCurrentUserTokenId();

        if(currentUserTokenId){
            // add a token id to headers.

            options = _.setWith(options, 'headers.authorization', currentUserTokenId);

        }

        return axios.get(`${api}${apiPath}`, options)
    }
    post(apiPath, data, options = {}){

        const currentUserTokenId = this.store.getCurrentUserTokenId();

        if(currentUserTokenId){
            // add a token id to headers.

            options = _.setWith(options, 'headers.authorization', currentUserTokenId);

        }



        return axios.post(`${api}${apiPath}`, data, options);
    }
}