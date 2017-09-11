import React, { Component } from 'react';
import {
    View, Text, Container, Header, Left, Button, Right, Content, Body, Icon, Title, Input, Label, Item, Picker, Form,
} from 'native-base';
import {AsyncStorage} from 'react-native';
import styles from './styles';
import accountApi from '../../../api/accountApi';

export default class TaoHoSo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: undefined,
            name: '',
            birth: '',
            error: '',
        };
    }
    onValueChange(value) {
        this.setState({
            selected: value
        });
    }

    createProfile(){
        var name = this.state.name;
        var birth = this.state.birth;
        var gender = this.state.selected;

        const {state} = this.props.navigation;

        if(!name){
            this.setState({error: 'Chưa nhập họ và tên'});
        } else if(!birth){
            this.setState({error: 'Chưa nhập năm sinh'});
        } else{ 
            AsyncStorage.getItem('access_token').then((token) => {
                accountApi.createFastProfile(name,birth,gender,token).then((res) => {
                    if(res.IdHoSo){
                        this.props.navigation.navigate("Service", {
                            id: state.params.id,
                            name: state.params.name
                        });
                    }
                })
            })
        }
    }
    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="ios-arrow-back" />
                         </Button >
                    </Left>
                    <Body>
                        <Title>Tạo hồ sơ</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <View style={styles.content}>
                    <Item regular style={styles.item}>
                        <Label style={styles.label}>
                            <Text>Họ và tên:</Text>
                        </Label>
                        <Input
                            onChangeText={(name) => this.setState({ name })}
                            value={this.state.name} />
                    </Item>
                    <Item regular style={styles.item}>
                        <Label style={styles.label}>
                            <Text>Năm sinh:</Text>
                        </Label>
                        <Input
                            onChangeText={(birth) => this.setState({ birth })}
                            value={this.state.birth} />
                    </Item>
                    <View>
                        <Item regular style={styles.item}>
                            <Label style={styles.label}>
                                <Text>Giới tính:</Text>
                            </Label>
                            <Right>
                                <Picker style={styles.picker}
                                    mode="dropdown"
                                    selectedValue={this.state.selected}
                                    onValueChange={this.onValueChange.bind(this)}>
                                    <Item label="Nam" value="Nam" />
                                    <Item label="Nữ" value='Nữ' />
                                </Picker>
                            </Right>
                        </Item>
                    </View>
                    <Button full style={styles.button}
                        onPress={()=> this.createProfile()}
                    >
                        <Text>Tạo Hồ Sơ</Text>
                    </Button>
                    </View>
                </Content>
            </Container>
        )
    }
}