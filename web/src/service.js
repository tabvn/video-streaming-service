import axios from 'axios'
import {api} from './config'


export default class Service{

    constructor(store){

        this.store = store;
    }


    get(apiPath, options = {}){


        return axios.get(`${api}${apiPath}`)
    }
    post(apiPath, data, options = null){
        return axios.post(`${api}${apiPath}`, data, options);
    }
}