import React, { Component } from 'react';
import MainStackRouter from './routers/MainStackRouter';
import SignalService from './Share/SignalService';
import {AsyncStorage} from 'react-native';
import User from './Share/User';
import accountApi from './api/accountApi';
var u = new User();

class App extends Component {
    constructor(props){
        super(props);
        // u.setHoVaTen("sssssfff");
        SignalService.getInstance();  
        AsyncStorage.getItem('access_token').then((value) => {
            accountApi.getUserInfo(value).then((res) => {
                u.setHoVaTen(res.HoVaTen)
                console.log(u.getHoVaTen())
            })
        });
    }
    render(){
        return <MainStackRouter />;
    }
}
export default App;