import React, { Component } from "react";
import {
    Container, Header, Left, Body, Right, Content,
    Button,
    Icon,
    Title,
    Form,
    Picker,
    Item,
    Input,
    Label,
    Text
} from 'native-base';
import {AsyncStorage} from 'react-native';
import styles from './styles';
import serviceApi from '../../api/serviceApi';
import signalr from 'react-native-signalr';
import EventEmitter from 'EventEmitter';
import SignalService from '../../Share/SignalService';


class Service extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          selectedHoso: undefined,
          isAnonymous : true,
          DsHoSo: [],
          picture: '',
          vanDe: '',
        };
        AsyncStorage.getItem('access_token').then((value) => {
            console.log(value);
            serviceApi.getProfiles(value).then((res) => this.setState(
                 { DsHoSo: res.accountSoYBa.DsHoSoSucKhoe}
            ))
        });

        const {state} = this.props.navigation;
        SignalService.proxy.on('timBacSi_KetQua', (KetQua, UserId) => {
            console.log('message-from-server', KetQua, UserId);
            if(!UserId){
                alert(KetQua)
            }else{
                this.props.navigation.navigate('DoctorInfo', {
                    idDichVu: state.params.id,
                    doctorId: UserId
                });
            }
            //Here I could response by calling something else on the server...
        });
    }

    findDoctor(){
        var id = this.props.navigation.state.params.id;
        var idHoSo = this.state.selectedHoso;
        var isAnonymous = this.state.isAnonymous;
        var vanDe = this.state.vanDe;
        var linkAnh = this.state.picture;
        
      
        SignalService.proxy.invoke('timBacSi', id,idHoSo,isAnonymous,vanDe,linkAnh)
        .done((directResponse) => {
            console.log('direct-response-from-server', directResponse);
           
        }).fail(() => {
            console.warn('Something went wrong when calling server, it might not be up and running?')
        });
       

        // const connection = signalr.hubConnection('http://admincloud.truongkhoa.com/SignalR');
        // connection.logging = true;
    
        // const proxy = connection.createHubProxy('truongKhoaHub');
        // //receives broadcast messages from a hub function, called "helloApp"
        // proxy.on('timBacSi_KetQua', (KetQua, UserId) => {
        //   console.log('message-from-server', KetQua, UserId);
        //   //Here I could response by calling something else on the server...
        // });
    
        // // atempt connection, and handle errors
        // connection.start().done(() => {
        //     var notify = new EventEmitter();
        //     notify.emit('daKetNoi','Đã kết nối thành công');

        //   console.log('Now connected, connection ID=' + connection.id);
    
        //   proxy.invoke('timBacSi', id,idHoSo,isAnonymous,vanDe,linkAnh)
        //     .done((directResponse) => {
        //       console.log('direct-response-from-server', directResponse);
        //     }).fail(() => {
        //       console.warn('Something went wrong when calling server, it might not be up and running?')
        //     });
    
        // }).fail(() => {
        //     console.log('Failed');
        // });
    
        // //connection-handling
        // connection.connectionSlow(() => {
        //      console.log('We are currently experiencing difficulties with the connection.')
        // });
    
        // connection.error((error) => {
        //     const errorMessage = error.message;
        //     let detailedError = '';
        //     if (error.source && error.source._response) {
        //         detailedError = error.source._response;
        //     }
        //     if (detailedError === 'An SSL error has occurred and a secure connection to the server cannot be made.') {
        //         console.log('When using react-native-signalr on ios with http remember to enable http in App Transport Security https://github.com/olofd/react-native-signalr/issues/14')
        //     }
        //     console.debug('SignalR error: ' + errorMessage, detailedError)
        // });
    }

    onValueChange(value) {
        const {state} = this.props.navigation;
        if(value == 'taohoso'){
            this.props.navigation.navigate('TaoNhanhHoSo',{
                id: state.params.id,
                name: state.params.name
            });
        }
        this.setState({
            selectedHoso: value
        });
    }

    onValueChange2(value) {
        this.setState({
            isAnonymous: value
        });
    }
    render(){
        const {state} = this.props.navigation;
        return(
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('Tabs')}>
                            <Icon name="ios-arrow-back" />
                        </Button >
                    </Left>
                    <Body>
                        <Title>{state.params.name}</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content>
                <Form style= {styles.form}>
                    <Picker
                        mode="dropdown"
                        placeholder="Select One"
                        selectedValue={this.state.selectedHoso}
                        onValueChange={this.onValueChange.bind(this)}
                    >
                        <Item label="Chọn hồ sơ" value="key0" />
                        <Item label="Tạo nhanh hồ sơ mới" value="taohoso" />
                    {this.state.DsHoSo.map((item) => (
                        <Item label={item.HoVaTen} value={item.Id}/>
                    ))}
                    </Picker>
                    <Picker
                        style= {{marginTop: 10}}
                        mode="dropdown"
                        placeholder="Select One"
                        selectedValue={this.state.isAnonymous}
                        onValueChange={this.onValueChange2.bind(this)}
                    >
                        <Item label="Ẩn danh khi gặp bác sĩ" value={true} />
                        <Item label="Xưng danh khi gặp bác sĩ" value={false} />
                    </Picker>

                    <Item regular style= {{marginTop: 10}} >
                        <Input style={{height: 200}}
                         multiline={true} 
                         placeholder='Nhập vấn đề bạn gặp phải' 
                         onChangeText={(vanDe) => this.setState({ vanDe })}
                        />
                    </Item>

                    <Button full primary style={{marginTop: 10}}
                        onPress={()=> this.findDoctor()}
                    >
                        <Text> Tìm bác sĩ </Text>
                    </Button>
                </Form>
                </Content>
            </Container>
        )
    }
}

export default Service;