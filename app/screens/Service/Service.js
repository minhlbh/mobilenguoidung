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

import { AsyncStorage } from 'react-native';
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
            isAnonymous: true,
            DsHoSo: [],
            picture: '',
            vanDe: '',
            name: '',
            birth: '',
            gender: '',

        };
        AsyncStorage.getItem('access_token').then((value) => {
            console.log(value);
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

        const { state } = this.props.navigation;
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
            //Here I could response by calling something else on the server...
        });
    }

    findDoctor() {
        var id = this.props.navigation.state.params.id;
        var idHoSo = this.state.selectedHoso;
        var isAnonymous = this.state.isAnonymous;
        var vanDe = this.state.vanDe;
        var linkAnh = this.state.picture;


        SignalService.proxy.invoke('timBacSi', id, idHoSo, isAnonymous, vanDe, linkAnh)
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

    onValueChange2(value) {
        this.setState({
            isAnonymous: value
        });
    }
    componentWillMount() {

    }
    render() {
        const { state } = this.props.navigation;
        return (
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
                        <View style={styles.header}>
                        <Item style={{ alignSelf: 'center', }}>
                            <Text style={styles.text}>Lời nhắn tới bác sĩ</Text>
                        </Item>
                        </View>
                        <Item>
                            <Input
                                style={styles.input}
                                multiline={true}
                                placeholder='Text area..'
                                onChangeText={(vanDe) => this.setState({ vanDe })}
                            />
                        </Item>
                    </View>

                    <Button style={styles.button}
                        //onPress={() => this.findDoctor()}
                        onPress={()=> this.props.navigation.navigate('TestDoctorInfo')}
                    >
                        <Text>Tìm bác sĩ</Text>
                    </Button>
                </Content>
            </Container>
        )
    }
}

export default Service;