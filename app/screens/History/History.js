import React, { Component } from "react";
import {
    Container, Header, Left, Body, Right, Content,
    Text,
    List,
    ListItem,
    Title,
    Button,
    Icon
} from 'native-base';
import { FlatList } from 'react-native';
import User from '../../Share/User';
var u = new User();
import accountApi from '../../api/accountApi';

class History extends Component{
    constructor(props){
        super(props);
        this.state = {
            historyList: [],
        }
    }

    componentWillMount(){
        accountApi.listHistory(u.getToken()).then((res) => {
            this.setState({
                historyList: res.DsGap
            });
        })
    }

    render(){
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('Tabs')}>
                            <Icon name="ios-arrow-back" />
                        </Button >
                    </Left>
                    <Body>
                        <Title>Lịch sử cuộc gặp</Title>
                    </Body>
                     <Right />
                </Header>
                <Content>
                <List>
                
                    <FlatList
                        data={this.state.historyList}
                        renderItem={({ item }) =>
                            <ListItem>
                                <Text>
                                    Gặp lúc: {item.LapLuc} {'\n'}
                                    Vấn đề: {item.VanDe}
                                </Text>
                            </ListItem>
                        }
                    />
                 </List>
                </Content>
            </Container>
        )
    }
}

export default History;