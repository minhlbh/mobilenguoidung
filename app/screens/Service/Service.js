import React, { Component } from "react";
import {
    Container, Header, Left, Body, Right, Content, ListItem, Thumbnail,
    Button,
    Icon,
    Title,
    Form,
    Picker,
    Item,
    Input,
    Label,
    Text,
    View
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
            isAnonymous: true,
            DsHoSo: [],
            picture: '',
            vanDe: '',
            name: '',
            birth: '',
            gender: '',

        };

        //get các hồ sơ sức khỏe của account
        AsyncStorage.getItem('access_token').then((value) => {
            serviceApi.getProfiles(value).then((res) => this.setState(
                {
                    DsHoSo: res.accountSoYBa.DsHoSoSucKhoe,
                    avatar: res.accountSoYBa.DsHoSoSucKhoe.Avatar,
                    name: res.accountSoYBa.DsHoSoSucKhoe.HoVaTen,
                    birth: res.accountSoYBa.DsHoSoSucKhoe.NgaySinh,
                    gender: res.accountSoYBa.DsHoSoSucKhoe.GioiTinh
                }
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
            if (!UserId) {
                alert(KetQua)
            } else {
                this.props.navigation.navigate('DoctorInfo', {
                    ketQua: KetQua,
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
        const { state } = this.props.navigation;
        if (value == 'taohoso') {
            this.props.navigation.navigate('TaoNhanhHoSo', {
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
                serviceApi.uploadImg(response).then((res) => {
                    console.log(res);
                })
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
                <Header style={styles.header}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('Tabs')}>
                            <Icon name="ios-arrow-back" />
                        </Button >
                    </Left>
                    <Body>
                        <Title style={styles.textHeader}>{state.params.name}</Title>
                    </Body>
                    <Right />
                </Header>

                <Content>
                    <View style={styles.panel1}>
                        <ListItem>
                            {this.state.avatar ?
                                <Thumbnail large source={{ uri: this.state.avatar }}
                                /> :
                                <Thumbnail large style={{ marginRight: 20, marginLeft: 20 }} source={{ uri: 'http://www.unl.edu/careers/images/staff_images/y_u_no_photo_Square.png' }}
                                />
                            }
                            <Body>
                                <Picker //style={styles.picker1}
                                    mode="dropdown"
                                    placeholder="Select One"
                                    selectedValue={this.state.selectedHoso}
                                    onValueChange={this.onValueChange.bind(this)}
                                >
                                    <Item label="Chọn hồ sơ" value="key0" />
                                    <Item label="Tạo nhanh hồ sơ mới" value="taohoso" />
                                    {this.state.DsHoSo.map((item) => (
                                        <Item label={item.HoVaTen} value={item.Id} />
                                    ))}
                                </Picker>
                                <Text style={styles.textHeader}>Họ và tên: Đỗ Thành Phúc</Text>
                                <Text style={styles.textHeader}>Ngày sinh: 17/11/1997</Text>
                                <Text style={styles.textHeader}>Giới tính: Nam</Text>
                            </Body>

                        </ListItem>
                        <Picker
                            //style={styles.picker2}
                            mode="dropdown"
                            placeholder="Select One"
                            selectedValue={this.state.isAnonymous}
                            onValueChange={this.onValueChange2.bind(this)}
                        >
                            <Item label="Ẩn danh khi gặp bác sĩ" value={true} />
                            <Item label="Xưng danh khi gặp bác sĩ" value={false} />
                        </Picker>
                    </View>
                    <View style={{ marginTop: 35, }}>
                        <Item style={{ alignSelf: 'center', }}>
                            <Text style={styles.text}>Lời nhắn tới bác sĩ</Text>
                        </Item>
                        <Item>
                            <Input
                                style={styles.input}
                                multiline={true}
                                placeholder='Text area..'
                                onChangeText={(vanDe) => this.setState({ vanDe })}
                            />
                        </Item>
                    </View>
                    <Button full primary style={{marginTop: 10}}
                    onPress={()=> this.pickImage()}
                    >
                        <Text>Chọn ảnh</Text>
                    </Button>
                    <View>
                          <Image source={this.state.imageSource} style={{height: 100, width: 100}} />
                     
                    </View>
                    <Button style={styles.button}
                        onPress={() => this.findDoctor()}
                    >
                        <Text>Tìm bác sĩ</Text>
                    </Button>
                </Content>
            </Container>
        )
    }
}

export default Service;