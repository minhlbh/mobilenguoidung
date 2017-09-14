import React, { Component } from 'react';
import MainStackRouter from './routers/MainStackRouter';
import SignalService from './Share/SignalService';
import accountApi from './api/accountApi';
import User from './Share/User';

class App extends Component {
    constructor(props){
        super(props);
        // u.setHoVaTen("sssssfff");
        SignalService.getInstance(); 
        new User(); 
    }
    render(){
        return <MainStackRouter />;
    }
}
export default App;