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
    Row,
    View,
    Title,
    Grid,
    Col,
    Fab
} from 'native-base';
import accountApi from '../../api/accountApi';
import styles from './styles';
import homeApi from '../../api/homeApi';
console.disableYellowBox = true;

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            email: '',
            avatar: '',
            phone: '',
            ListDichVu: [],
        };
        AsyncStorage.getItem('access_token').then((value) => {
            
                accountApi.getUserInfo(value).then((res) => this.setState(
                        { email: res.Email, username: res.HoVaTen,avatar: res.Avata, phone: res.Phone}
                    ))
      
        })
    }

    componentWillMount() {
        homeApi.getListDichVu().then((res) => {
            this.setState({ListDichVu: res.DsDichVu});
        })
    }

    findDoctor(name, id){
        this.props.navigation.navigate("Service", {
            id: id,
            name: name
        });
    }

    render(){
        var listDichVu =this.state.ListDichVu; 
        return(
            <Container>
                <Header>
                    <Left/>
                    <Body>
                        <Title>Trang chủ</Title>
                    </Body>
                    <Right />
                </Header>
                <Content >
                    <View style={styles.panel1}>
                        
                            <ListItem>
                                
                                    {this.state.avatar ? 
                                    <Thumbnail large  source={{ uri: this.state.avatar }}
                                         /> :
                                        <Thumbnail large style={{marginRight: 20, marginLeft: 20}} source={{ uri:'http://www.unl.edu/careers/images/staff_images/y_u_no_photo_Square.png'}}
                                         />
                                    }
                                
                                <Body>
                                    <Text style={styles.textinfo}>{this.state.username}</Text>
                                    <Text note style={styles.textinfo}>{this.state.email}</Text>
                                    <Text note style={styles.textinfo}>{this.state.phone}</Text>
                                </Body>
                                
                            </ListItem>
                            <Grid>
                                <Row style={{height: 50}}>
                                    <Col>
                                        <Text style={styles.textPanel1}>1</Text>
                                        <Text style={styles.textPanel1}>Hồ sơ y tế</Text>
                                    </Col>
                                    <Col>
                                        <Text style={styles.textPanel1}>300.000đ</Text>
                                        <Text style={styles.textPanel1}>Số dư tài khoản</Text>
                                    </Col>
                                    <Col>
                                        <Text style={styles.textPanel1}>5</Text>
                                        <Text style={styles.textPanel1}>Lịch sử</Text>
                                    </Col>
                                </Row>
                            </Grid>
                    </View> 
                    <View>
                    
                    <CardItem style={{marginTop: 15}}>
                        <Thumbnail  style={{marginRight: 20}} source={require('../../images/khamonline.png')} />
                        <Body>
                            
                            <Text>
                                Khám bệnh online 
                            </Text>
                            <Text note>
                            Tìm bác sĩ online để tư vấn vấn đề bạn gặp phải
                        </Text>
                        </Body>
                    </CardItem>

                    <Text style={styles.textDividerTitle}>Các dịch vụ</Text>
                                    
                    <Card>
                       
                        <FlatList
                            data={listDichVu}
                            horizontal={true}
                            renderItem={({ item }) =>
                                <TouchableOpacity
                                   onPress={() => this.findDoctor(item.Ten,item.Id)}
                                >
                                    <CardItem style={{width: 150}}>
                                        <Body>
                                            <Image style={styles.itemImage} source={{ uri: item.Avatar }} />
                                            <Text>
                                                {item.Ten}
                                            </Text>
                                        </Body>
                                    </CardItem>
                                </TouchableOpacity>
                            }
                        />         
                    </Card>
                    </View>
                    
                </Content>

            </Container>
        )
    }
}

export default Home;