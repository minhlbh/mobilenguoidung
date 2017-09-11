import React, { Component } from "react";
import { StackNavigator, } from "react-navigation";
import Home from '../screens/Home';
import ServiceStack from './ServiceStack';

export default (HomeStack = StackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            header: null
        }
    },
    Service: {
        screen: ServiceStack,
        navigationOptions: {
            header: null
        }
    }
}));