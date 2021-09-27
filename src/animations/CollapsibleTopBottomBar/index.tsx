import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Animated } from 'react-native';
import AnimatedBottomTabBar from './AnimatedBottomTabBar';
import AnimatedHeader from './AnimatedHeader';
import MainContainer from './MainContainer';

const BottomTabs = createBottomTabNavigator();

const CollapsibleTopBottomBar = (): JSX.Element => {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  return (
    <BottomTabs.Navigator
      tabBar={props => <AnimatedBottomTabBar {...props} scrollY={scrollY} />}
      screenOptions={{
        header: props => <AnimatedHeader {...props} scrollY={scrollY} />,
      }}>
      <BottomTabs.Screen name="Tab 1">{props => <MainContainer {...props} scrollY={scrollY} />}</BottomTabs.Screen>
      <BottomTabs.Screen name="Tab 2">{props => <MainContainer {...props} scrollY={scrollY} />}</BottomTabs.Screen>
    </BottomTabs.Navigator>
  );
};

export default CollapsibleTopBottomBar;
