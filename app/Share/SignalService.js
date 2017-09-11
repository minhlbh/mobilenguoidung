import signalr from 'react-native-signalr';
import EventEmitter from 'EventEmitter';


export default class SignalService {
    static instance = null;
     connection = null;
     proxy = null;

    static getInstance (){
        if(this.instance == null){
            this.instance = new SignalService();
            this.connection = signalr.hubConnection('http://admincloud.truongkhoa.com/SignalR');
            this.proxy = this.connection.createHubProxy('truongKhoaHub');
            // connection.logging = true;
            this.proxy.on('timBacSi_KetQua', () => {});
            this.proxy.on('moiBacSi_BacSiTraLoi', () => {});
            this.connection.start().done(() => {
                console.log(this.connection.id);
             }).fail(() => {
                 console.log('Failed');
             });
        }

       
        //receives broadcast messages from a hub function, called "helloApp"
       
        // atempt connection, and handle errors
        
    
     

        return this.instance;
    }

}