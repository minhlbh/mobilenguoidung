import React, { Component } from "react";
import { TouchableOpacity, Image, FlatList } from 'react-native';
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
} from 'native-base';
import accountApi from '../../api/accountApi';
import styles from './styles';
import homeApi from '../../api/homeApi';
import SignalService from '../../Share/SignalService';
import User from '../../Share/User';

console.disableYellowBox = true;
var u = new User();
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            avatar:'',
            phone: '',
            ListDichVu: [],
        };
      
    }

    componentWillMount() {
        u.getUser().subscribe(rs => {
            this.setState({
                username: rs.HoVaTen,
                email: rs.Email,
                avatar: rs.Avatar,
                phone: rs.Phone,
            });
        })
        homeApi.getListDichVu().then((res) => {
            this.setState({ ListDichVu: res.DsDichVu });
        })
    }

    findDoctor(name, id) {
        this.props.navigation.navigate("Service", {
            id: id,
            name: name
        });
    }

    render() {
        var listDichVu = this.state.ListDichVu;
        return (
            <Container>
                <Header style={styles.header}>
                    <Left >
                        <TouchableOpacity>
                            <Icon style={styles.icon} name='settings' />
                        </TouchableOpacity>
                    </Left>
                    <Body>
                        <Title style={styles.icon}>Trang chủ</Title>
                    </Body>
                    <Right>
                        <TouchableOpacity>
                            <Icon style={styles.icon} name='md-notifications' />
                        </TouchableOpacity>
                    </Right>
                </Header>
                <Content >
                    <View style={styles.panel1}>

                        <ListItem>

                            {this.state.avatar ?
                                <Thumbnail large source={{ uri: this.state.avatar }}
                                /> :
                                <Thumbnail large style={{ marginRight: 20, marginLeft: 20 }} source={{ uri: 'http://www.unl.edu/careers/images/staff_images/y_u_no_photo_Square.png' }}
                                />
                            }

                            <Body>
                                <Text style={styles.textinfo}>{this.state.username}</Text>
                                <Text note style={styles.textinfo}>{this.state.email}</Text>
                                <Text note style={styles.textinfo}>{this.state.phone}</Text>
                            </Body>
                        </ListItem>
                    </View>
                    <View>
                        <Grid>
                            <Row style={{ height: 50 }}>
                                <Col style={styles.col}>
                                    <TouchableOpacity>
                                        <Text style={styles.textPanel1}>1</Text>
                                        <Text style={styles.textPanel1}>Hồ sơ y tế</Text>
                                    </TouchableOpacity>
                                </Col>
                                <Col style={styles.col}>
                                    <TouchableOpacity>
                                        <Text style={styles.textPanel1}>300.000đ</Text>
                                        <Text style={styles.textPanel1}>Số dư tài khoản</Text>
                                    </TouchableOpacity>
                                </Col>
                                <Col style={styles.col}>
                                    <TouchableOpacity onPress={() =>this.props.navigation.navigate('History')}>
                                        <Text style={styles.textPanel1}>5</Text>
                                        <Text style={styles.textPanel1}>Lịch sử</Text>
                                    </TouchableOpacity>
                                </Col>
                            </Row>
                        </Grid>
                    </View>
                    <View style={styles.panel2}>
                        <Button style={styles.button}>
                            <Thumbnail source={require('../../images/tuvan.png')} />
                            <Body>
                                <Text style={{ color: 'white' }}>Tư vấn online</Text>
                            </Body>
                        </Button>
                    </View>

                    <View>
                        <Text style={styles.textDividerTitle}>Dịch vụ</Text>

                        <Card>

                            <FlatList
                                data={listDichVu}
                                horizontal={true}
                                renderItem={({ item }) =>
                                    <TouchableOpacity
                                        onPress={() => this.findDoctor(item.Ten, item.Id)}
                                    >
                                        <CardItem style={{ width: 150 }}>
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