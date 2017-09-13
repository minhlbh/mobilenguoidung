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
import {AsyncStorage, Image } from 'react-native';
import styles from './styles';
import serviceApi from '../../api/serviceApi';
import signalr from 'react-native-signalr';
import SignalService from '../../Share/SignalService';
import User from '../../Share/User';
var u = new User();
var ImagePicker = require('react-native-image-picker');


var options = {
    title: 'Select Avatar',
    customButtons: [
      {name: 'fb', title: 'Choose Photo from Facebook'},
    ],
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };
class Service extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          selectedHoso: undefined,
          isAnonymous : true,
          DsHoSo: [],
          picture: '',
          vanDe: '',
          imageSource: '',
        };

        //get các hồ sơ sức khỏe của account
        AsyncStorage.getItem('access_token').then((value) => {
            serviceApi.getProfiles(value).then((res) => this.setState(
                 { DsHoSo: res.accountSoYBa.DsHoSoSucKhoe}
            ))
        });

        SignalService.proxy.on('nguoiDungVaoDichVu_CapSoIdPhong', (IdPhong) => {
            console.log('message-from-server-nguoiDungVaoDichVu_CapSoIdPhong:', IdPhong);
        });
    }

    componentWillMount() {
        const {state} = this.props.navigation;
        SignalService.proxy.on('timBacSi_KetQua', (KetQua, UserId) => {
            console.log('message-from-server', KetQua, UserId);
            if(!UserId){
                alert(KetQua)
            }else{
                this.props.navigation.navigate('DoctorInfo', {
                    ketQua:KetQua,
                    idDichVu: state.params.id,
                    doctorId: UserId
                });
            }
        });
        
        var email = '';
        u.getUser().subscribe(rs => {
           email= rs.Email;
        })

        SignalService.proxy.invoke('nguoiDungKhaiBaoUserName', email)
            .done((directResponse) => {
                console.log('direct-response-from-server', directResponse);
                       
            }).fail(() => {
                console.warn('Something went wrong when calling server, it might not be up and running?')
            });

        SignalService.proxy.invoke('nguoiDungVaoDichVu', state.params.id)
        .done((directResponse) => {
            u.setIdPhong(directResponse);
            console.log('direct-response-from-server-nguoiDungVaoDichVu', directResponse);
           
        }).fail(() => {
            console.warn('Something went wrong when calling server, it might not be up and running?')
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
       
    }

    // chọn hồ sơ
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

    // chọn ẩn danh hay không
    onValueChange2(value) {
        this.setState({
            isAnonymous: value
        });
    }
    
    pickImage() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            }
            else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            }
            else {
              let source = { uri: response.uri };
          
              // You can also display the image using data:
              // let source = { uri: 'data:image/jpeg;base64,' + response.data };
          
              this.setState({
                imageSource: source
              });
            }
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
                    onPress={()=> this.pickImage()}
                    >
                        <Text>Chọn ảnh</Text>
                    </Button>
                    <Image source={this.state.imageSource} style={{height: 200, width: 200}} />
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