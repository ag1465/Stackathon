import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import MessageBoardScreen from '../screens/MessageBoardScreen';
import MapsScreen from '../screens/MapsScreen';
import SettingsScreen from '../screens/SettingsScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const MessageBoardStack = createStackNavigator(
  {
    MessageBoard: MessageBoardScreen,
  },
  config
);

MessageBoardStack.navigationOptions = {
  tabBarLabel: 'MessageBoard',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-chatbubbles'
          : 'md-chatbubbles'
      }
    />
  ),
};

MessageBoardStack.path = '';

const MapsStack = createStackNavigator(
  {
    Maps: MapsScreen,
  },
  config
);

MapsStack.navigationOptions = {
  tabBarLabel: 'Maps',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-map' : 'md-map'} />
  ),
};

MapsStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  MapsStack,
  MessageBoardStack,
  SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
