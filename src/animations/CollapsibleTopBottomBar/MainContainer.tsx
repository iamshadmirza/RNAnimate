import { useIsFocused } from '@react-navigation/core';
import { createMaterialTopTabNavigator, MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import React from 'react';
import { Animated, FlatList } from 'react-native';
import { bottomTabKeys, topTabKeys } from '.';
import { size } from '../../utils/Constant';
import AnimatedTabBarHeader from './AnimatedTabBarHeader';
import Screen from './Screen';

const Tab = createMaterialTopTabNavigator();
type MainContainerProps = {
  scrollY: Animated.Value;
  color: string;
  bottomTabKey: bottomTabKeys;
  setActiveBottomTab: (key: bottomTabKeys) => void;
  setActiveTopTab: (key: topTabKeys) => void;
  trackRef: (key: `${bottomTabKeys}-${topTabKeys}`, ref: FlatList) => void;
  syncScrollOffset: () => void;
};

const MainContainer = ({
  scrollY,
  color,
  bottomTabKey,
  setActiveBottomTab,
  setActiveTopTab,
  trackRef,
  syncScrollOffset,
}: MainContainerProps): JSX.Element => {
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (isFocused) {
      setActiveBottomTab(bottomTabKey);
    }
  }, [isFocused, setActiveBottomTab, bottomTabKey]);

  return (
    <Tab.Navigator
      tabBar={(props: MaterialTopTabBarProps) => <AnimatedTabBarHeader {...props} scrollY={scrollY} />}
      screenOptions={{
        tabBarBounces: false,
        tabBarActiveTintColor: '#fff',
        tabBarItemStyle: {
          backgroundColor: color,
          height: size.tabBarHeight,
        },
        tabBarLabelStyle: {
          fontWeight: 'bold',
        },
        tabBarStyle: {
          height: size.tabBarHeight,
        },
      }}>
      <Tab.Screen name="Chats">
        {props => (
          <Screen
            {...props}
            topTabKey="chats"
            bottomTabKey={bottomTabKey}
            scrollY={scrollY}
            trackRef={trackRef}
            setActiveTab={setActiveTopTab}
            syncScrollOffset={syncScrollOffset}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Status">
        {props => (
          <Screen
            {...props}
            topTabKey="status"
            bottomTabKey={bottomTabKey}
            scrollY={scrollY}
            trackRef={trackRef}
            setActiveTab={setActiveTopTab}
            syncScrollOffset={syncScrollOffset}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Calls">
        {props => (
          <Screen
            {...props}
            topTabKey="calls"
            bottomTabKey={bottomTabKey}
            scrollY={scrollY}
            trackRef={trackRef}
            setActiveTab={setActiveTopTab}
            syncScrollOffset={syncScrollOffset}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default MainContainer;
