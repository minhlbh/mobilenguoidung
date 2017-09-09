import React, { Component } from "react";
import { StackNavigator, } from "react-navigation";
import Home from '../screens/Home';


export default (HomeStack = StackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            header: null
        }
    },
}));