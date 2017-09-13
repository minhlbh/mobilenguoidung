import React, { Component } from 'react';
import MainStackRouter from './routers/MainStackRouter';
import SignalService from './Share/SignalService';
import accountApi from './api/accountApi';

class App extends Component {
    constructor(props){
        super(props);
        // u.setHoVaTen("sssssfff");
        SignalService.getInstance();  
    }
    render(){
        return <MainStackRouter />;
    }
}
export default App;