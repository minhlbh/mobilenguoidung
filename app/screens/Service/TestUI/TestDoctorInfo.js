import React, { Component } from 'react';
import {
    Container, Header, Left, Body, Right, Content, ListItem, Thumbnail, List,
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
    constructor(props) {
        super(props);
        this.state = {
            avatar: ''
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
                <Content style={styles.content}>
                    <View>
                        <Label style={{ width: 70, alignSelf: 'center', marginTop: 20 }}>
                            <Text style={{ color: '#0c879a' }}>BÁC SĨ{'\n'}</Text>
                            <Text style={{ alignSelf: 'center', marginTop: 10, color: '#0c879a',fontWeight:'bold' }}>Lê Bá Hồng Minh</Text>
                        </Label>
                        <View style={{ alignSelf: 'center', marginTop: 10, marginBottom: 20 }}>
                            {this.state.avatar ?
                                <Thumbnail large source={{ uri: this.state.avatar }}
                                /> :
                                <Thumbnail large style={{ width: 130, height: 130 }} source={{ uri: 'https://sharinglife.blob.core.windows.net/images/file_453faac4-2ca1-4c2f-ae96-9e9f86f6cf36.jpg' }}
                                />
                            }
                            
                        </View>
                    </View>
                    <View style={{ marginLeft: 30, marginRight: 30, backgroundColor: '#f2f2f2' }}>
                        <Item style={{}}>
                            <Label style={{ width: 70 }}>
                                <Text>GIỚI THIỆU:</Text>
                            </Label>
                            <ListItem><Text style={styles.text}>Chuyên khoa Ung Bướu, {'\n'}
                                bệnh viện Y Học Cổ Truyền</Text>
                            </ListItem>
                        </Item>
                        <Item style={{}}>
                            <Label style={{ width: 70 }}>
                                <Text>GIÁ LƯỢT GẶP:</Text>
                            </Label>
                            <ListItem>
                                <Text style={styles.text}>100000đ</Text>
                            </ListItem>
                        </Item>
                    </View>
                    <Item>
                        <Left>
                            <Button style={{ backgroundColor: 'green' }}>
                                <Text style={{ color: 'white' }}>Mời bác sĩ</Text>
                            </Button>
                        </Left>
                        <Right>
                            <Button style={{ backgroundColor: 'red' }}>
                                <Text style={{ color: 'white' }}>Bỏ qua</Text>
                            </Button>
                        </Right>
                    </Item>
                </Content>
            </Container>
        )
    }
}
