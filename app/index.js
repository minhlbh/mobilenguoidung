import React, { Component } from 'react';
import MainStackRouter from './routers/MainStackRouter';
import signalr from 'react-native-signalr';
import EventEmitter from 'EventEmitter';
import SignalService from './Share/SignalService';

class App extends Component {
    constructor(props){
        super(props);
        SignalService.getInstance();
    }
    render(){
        return <MainStackRouter />;
    }
}
export default App;