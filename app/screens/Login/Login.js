import React, { Component } from "react";
import {
    Container, Header, Left, Body, Right, Content,
    Text, View,
    Button,
    Grid,
    Col, Row,
    Icon,
    Input,
    Item
} from 'native-base';
import { Image, AsyncStorage } from 'react-native';
import styles from "./styles";
import images from '../../config/images';
import { colors } from '../../config/styles';
import accountApi from '../../api/accountApi';
// import Error from '../../components/error';
// import Loading from '../../components/loading';
// import FBSDK, { LoginManager , AccessToken, LoginButton} from 'react-native-fbsdk';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: "",
            pass: "",
            error: "",
            loading: false
        };
        AsyncStorage.getItem('access_token').then((value) => {
            console.log(value);
            if (value) {
                this.props.navigation.navigate("Tabs");
            } 
        });
    }

    _loginFacebook() {   
        this.setState({ loading: true });
        LoginManager.logInWithReadPermissions(['email']).then(
            function(result) {
              if (result.isCancelled) {
                alert('Đăng nhập được huỷ');
              } else {
                AccessToken.getCurrentAccessToken().then(
                    (data) => {
                        fetch(`https://graph.facebook.com/me?fields=email&&access_token=${data.accessToken.toString()}`)
                        .then((response) => response.json())
                        .then((res) => {
                            accountApi.checkFacebookLogin(data.userID, res.email, data.accessToken.toString()).then(response =>{
                                console.log(response);
                                if(response == 'Email chưa được dùng đăng kí tài khoản nào!'){
                                    this.props.navigation.navigate("InputPhone", {
                                        id: data.userID,
                                        email: res.email,
                                        token: data.accessToken.toString()
                                    });
                                }else if (response.access_token){
                                    this.props.navigation.navigate("Tabs");
                                    AsyncStorage.setItem('access_token', response.access_token);
                                    alert('Đăng nhập thành công với facebook');
                                } else {
                                    alert(response);
                                    
                                };      
                            }).catch((error) => {
                                alert(error)
                                
                            })                 
                        })                    
                    }
                )             
              }
              
            },
            function(error) {
              alert('Đăng nhập xảy ra lỗi: ' + error);
              this.setState({ loading: false });
            },
            this.setState({ loading: false })
        )
        
        
    }
     

    login = () => {
        this.setState({ loading: true });
        var ph = this.state.phone;
        var pw = this.state.pass;
        accountApi.getToken(ph, pw).then(res => {
            console.log(res.access_token);
            this.setState({ loading: false });
            if (res.access_token) {
                this.props.navigation.navigate("Tabs");
                AsyncStorage.setItem('access_token', res.access_token);
            } else {
                this.setState({ error: "Sai tên số điện thoại hoặc mật khẩu" });
                alert('Sai tên số điện thoại hoặc mật khẩu');
            }
        });

    }

    render() {
        return (
            <Container style={styles.container}>
                <Content scrollEnabled={false}>
                
                    <View style={styles.logoContainer}>
                        <Image source={images.logo} style={styles.logoImage} />
                        <Text style={styles.logoText}> Trưởng Khoa </Text>
                    </View>
                    <View style={styles.bg}>
                        <Grid>
                            <Col style={{ width: 30 }}>
                                <Row style={{ marginTop: 23 }}>
                                    <Icon
                                        style={styles.icon}
                                        name="md-call" />
                                </Row>
                                <Row style={{ marginTop: 20 }}>
                                    <Icon
                                        style={styles.icon}
                                        name="md-unlock" />
                                </Row>
                            </Col>

                            <Col>
                                <Item style={styles.item}>
                                    <Input
                                        style={styles.input}
                                        placeholder="Số điện thoại"
                                        onChangeText={(phone) => this.setState({ phone })}
                                    />
                                </Item>
                                <Item style={styles.item}>
                                    <Input
                                        style={styles.input}
                                        placeholder="Mật khẩu"
                                        secureTextEntry={true}
                                        onChangeText={(pass) => this.setState({ pass })}
                                    />
                                </Item>
                            </Col>
                        </Grid>



                        <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                            <Button success
                                style={styles.btnLogin}
                                onPress={() => this.login()}
                            >
                                <Text style={styles.textLogin}>Đăng nhập</Text>
                            </Button>
                            <Button bordered
                                style={styles.btnRegister}
                                //onPress={() => this.props.navigation.navigate('Signup')}
                            >
                                <Text style={styles.textRegister}>Đăng kí</Text>
                            </Button>
                        </View>
                        <Button transparent
                            style={styles.btnTransparent}
                            //onPress={() => this.props.navigation.navigate("ForgetPass")}
                        >
                            <Text style={{ color: colors.light }}>Quên mật khẩu ?</Text>
                        </Button>

                        
                        <Button  transparent
                             style={styles.btnTransparent}
                            //onPress={() => this._loginFacebook()}
                        >
                            <Icon style={styles.iconFace} name='logo-facebook' />
                        </Button>                        
                       
                    </View>
                </Content>
            </Container>
        );
    }
}

export default Login;