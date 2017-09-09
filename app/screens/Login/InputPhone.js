import React, {Component} from "react";
import {
    Container,
    Header,
    Left,
    Body,
    Right,
    Content,
    Text,
    Title,
    Icon,
    Button,
    Input,
    Item,
    Form,
    Row,
    View
} from 'native-base';
import styles from "./styles";
import accountApi from '../../api/accountApi';
import Error from '../../components/error';

class InputPhone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: ''
        }
    }
    signup = () => {
        var em = this.props.navigation.state.params.email;
        var p = this.state.phone;
        var id = this.props.navigation.state.params.id;
        var to = this.props.navigation.state.params.token;
        //this.setState({ animating: true });
        accountApi.socialRegister(id,to,p,em).then(res => {
                console.log(res)
                if (!res.Id) {
                    this.setState({error: res});
                    //this.setState({ animating: false });
                } else {
                    console.log(res)
                    this.props.navigation.navigate("InputCode", {
                            idU: res.Id,
                            phone: res.Phone
                        });
                    //this.setState({ animating: false });
                }
            });
    }

    render() {
        return (
            <Container style={styles.container}>
                {/* START HEADER*/}
                <Header style={styles.header}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={styles.textHeader} name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title style={styles.textHeader}>Nhập SĐT</Title>
                    </Body>
                    <Right/>
                </Header>
                {/*END HEADER  */}

                {/*START BODY  */}
                <Content style={styles.content}>
                    <Text style={{ textAlign: 'center', color: '#666', fontSize: 16, margin: 35 }}>
                        Bạn cần nhập số điện thoại để tiếp tục đăng kí.
                    </Text>
                    <Form style={styles.form}>
                        <Item regular>
                            <Input
                                style={{textAlign: 'center'}}
                                placeholder="Nhập số điện thoại"
                                placeholderTextColor="#999"
                                onChangeText={(phone) => this.setState({phone})}
                                keyboardType="number-pad"
                                returnKeyType={'done'}/>
                        </Item>

                        <Button block info style={styles.btn} onPress={() => this.signup()}>
                            <Text>Tiếp tục</Text>
                        </Button>

                    </Form>

                    {this.state.error
                        ? <Error error={this.state.error}/>
                        : <View >
                            <Row ></Row>
                        </View>
}
                </Content>
                {/* END BODY  */}
            </Container>
        );
    }
}
export default InputPhone;