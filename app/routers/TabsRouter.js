import React, {Component} from 'react';
import {  TabNavigator } from "react-navigation";
import HomeStack from './HomeStack';
import {Icon} from 'native-base';

const Tabs = TabNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => <Icon name="md-home"  style={{ color: tintColor }} />
    },
  },
  Doctor: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => <Icon name="md-home"  style={{ color: tintColor }} />
    },
  },
  Lockup: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => <Icon name="md-home"  style={{ color: tintColor }} />
    },
  },
   Person: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => <Icon name="md-home"  style={{ color: tintColor }} />
    },
  },
}, {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#0f9cb3',
      inactiveTintColor: '#CCC',
      showIcon: true,
      style: {
        backgroundColor: '#FFF',
        paddingTop:0,
        height: 60
      },
      labelStyle: {
        fontSize: 11,
      },
      indicatorStyle:{
        backgroundColor: '#0f9cb3',
      },
    }
  });

  export default Tabs;