import React, { Component } from "react";
import { TouchableOpacity, Image, FlatList ,AsyncStorage} from 'react-native';
import {
    Container, Header, Left, Body, Right, Content,
    Text,
    List, ListItem,
    Card, CardItem,
    Thumbnail,
    Icon,
    Button,
    Input,
    Item,
    Row,View
} from 'native-base';
import accountApi from '../../api/accountApi';
import styles from './styles';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            email: '',
            avatar: '',
        };
        AsyncStorage.getItem('access_token').then((value) => {
            if (value == null) {
                alert('Bạn chưa đăng nhập')
                this.props.navigation.navigate("Login");
            } else {
                accountApi.getUserInfo(value).then((res) => this.setState(
                        { email: res.Email, username: res.HoVaTen,avatar: res.Avatar}
                    ))
            }
        })

    }
    render(){
        return(
            <Container>
                <Header>

                </Header>
                <Content >
                    <View style={styles.panel1}>
                        <List>
                            <ListItem>
                                <Left>
                                    {this.state.avatar ? 
                                    <Thumbnail source={{ uri: this.state.avatar }}
                                        style={{ width: 100, height: 100 }} /> :
                                        <Thumbnail source={{ uri:'http://www.unl.edu/careers/images/staff_images/y_u_no_photo_Square.png'}}
                                        style={{ width: 100, height: 100 }} />
                                    }
                                </Left>
                                <Body>
                                    <Text style={styles.textinfo}>{this.state.username}</Text>
                                    <Text style={styles.textinfo}>{this.state.email}</Text>
                                </Body>
                                <Right>
                                </Right>
                            </ListItem>
                        </List>
                    </View> 
                </Content>
            </Container>
        )
    }
}

export default Home;