import React, { Component } from 'react';
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
import styles from './styles'

export default class TestDoctorInfo extends Component {
    constructor(props){
        super(props);
        this.state={
            avatar:''
        }
    }
    render() {
        return (
            <Container>
                <Header style={styles.header}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('Tabs')}>
                            <Icon name="ios-arrow-back" />
                        </Button >
                    </Left>
                    <Body>
                        <Title style={styles.textHeader}>Tìm bác sĩ</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <View style={{alignSelf:'center',marginTop:40}}>
                    {this.state.avatar ?
                        <Thumbnail large source={{ uri: this.state.avatar }}
                        /> :
                        <Thumbnail large style={{ marginRight: 20, marginLeft: 20 }} source={{ uri: 'http://www.unl.edu/careers/images/staff_images/y_u_no_photo_Square.png' }}
                        />
                    }
                    </View>
                    <View style={{marginLeft:30, marginRight:30}}>
                        <Item style={{}}>
                            <Label>
                    <Text>Bác sĩ:</Text>
                    </Label>
                    <ListItem>
                    <Text>Lê Bá Hồng Minh</Text>
                    </ListItem>
                    </Item>
                    <Item style={{}}>
                        <Label>
                    <Text>Giới  thiệu:</Text>
                    </Label>
                    <ListItem>
                    <Text>Chuyên khoa Ung Bướu</Text>
                    <Text>bệnh viện Y Học Cổ Truyền</Text>
                    </ListItem>
                    </Item>
                    <Item style={{}}>
                        <Label>
                    <Text>Giá lượt gặp:</Text>
                    </Label>
                    <ListItem>
                    <Text>100000đ</Text>
                    </ListItem>
                    </Item>
                    </View>
                    
                    <Button style={{marginTop:40, alignSelf:'center'}}>
                        <Text>Mời bác sĩ</Text>
                    </Button>
                </Content>
            </Container>
        )
    }
}
