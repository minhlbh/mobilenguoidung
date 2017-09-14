import 'rxjs';
import { Observable} from 'rxjs/Observable';
import accountApi from '../api/accountApi';
import {AsyncStorage} from 'react-native';

var u = new Observable();

export default class User {
    idPhong = '';
    idGap = '';
    token = null;

    constructor (){
        if(!User.instance){
            User.instance = this;   
            u =  Observable.fromPromise(
                AsyncStorage.getItem('access_token').then((value) => {
                    if(value){
                        return accountApi.getUserInfo(value).then((res) => {
                            return res;
                        })
                        this.token = value;
                    }
                })
             );
        }
        return User.instance;
    }

    setToken(token){
        this.token = token;
    }
    
    getToken(){
        return this.token;
    }

    getUser(){
        return u;
    }

    setIdPhong(id){
        this.idPhong = id;
    }

    getIdPhong(){
        return this.idPhong;
    }

    
    setIdGap(id){
        this.idGap = id;
    }

    getIdGap(){
        return this.idGap;
    }
}