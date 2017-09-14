import 'rxjs';
import { Observable} from 'rxjs/Observable';
import accountApi from '../api/accountApi';
import {AsyncStorage} from 'react-native';

var u = new Observable();

export default class User {
    idPhong = '';
    idGap = '';

    constructor (){
        if(!User.instance){
            User.instance = this;   
            u =  Observable.fromPromise(
                AsyncStorage.getItem('access_token').then((value) => {
                    return accountApi.getUserInfo(value).then((res) => {
                        return res;
                    })
                })
             );
        }
        return User.instance;
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