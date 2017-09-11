import React, { Component } from "react";
import { StackNavigator, } from "react-navigation";
import Service from '../screens/Service';
import TaoNhanhHoSo from '../screens/HoSo/TaoNhanhHoSo';
import DoctorInfo from '../screens/Service/DoctorInfo';

export default (ServiceStack = StackNavigator({
    Service: {
        screen: Service,
        navigationOptions: {
            header: null
        }
    },
    TaoNhanhHoSo: {
        screen: TaoNhanhHoSo,
        navigationOptions: {
            header: null
        }
    },
    DoctorInfo: {
        screen: DoctorInfo,
        navigationOptions: {
            header: null
        }
    }
}));