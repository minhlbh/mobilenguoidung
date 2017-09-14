import React, { Component } from "react";
import {
    Container, Header, Left, Body, Right, Content,
    Button,
    Icon,
    Title,
    Text
} from 'native-base';
import SignalService from '../../../Share/SignalService';
import User from '../../../Share/User';
var u = new User();

class DoctorInfo extends Component {
    constructor(props){
        super(props);
        SignalService.proxy.on('moiBacSi_BacSiTraLoi', (TraLoi, IdPhong, IdDichVu) => {
            console.log('message-from-server-bacSiTraLoi', TraLoi, IdPhong, IdDichVu);
            alert(TraLoi);
            //Here I could response by calling something else on the server...
        });

        console.log('********************************',u.getIdPhong());
    }

    inviteDoctor(idDichVu, doctorId, roomId){
        SignalService.proxy.invoke('moiBacSi', idDichVu,doctorId,roomId)
        .done((directResponse) => {
            console.log('direct-response-from-server-moibacsi', directResponse); 
        }).fail(() => {
            console.warn('Something went wrong when calling server, it might not be up and running?')
        });
    }
    
    render(){
        const {state} = this.props.navigation;
        return(
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="ios-arrow-back" />
                        </Button >
                    </Left>
                    <Body>
                        <Title>{state.params.ketQua}</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content>
                    <Text>Tìm thấy bác sĩ: {state.params.doctorId}</Text>
                    <Button full info
                        onPress={()=> this.inviteDoctor(state.params.idDichVu,state.params.doctorId,'')}
                    >
                        <Text>Mời bác sĩ</Text>
                    </Button>
                </Content>
            </Container>
        )
    }
}

export default DoctorInfo;