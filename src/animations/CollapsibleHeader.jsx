import React from 'react';
import { View, Text, StyleSheet, Platform, Animated } from 'react-native';
import faker from 'faker';
import { createMaterialTopTabNavigator, MaterialTopTabBar } from '@react-navigation/material-top-tabs';
import { colors } from '../utils/Constant';

const Tab = createMaterialTopTabNavigator();

const HEADER_HEIGHT = 50;

const dataArray = Array.from(Array(20)).map(() => ({
  key: faker.datatype.uuid(),
  name: faker.name.firstName(),
  message: faker.random.words(),
}));

const Item = ({ data }) => {
  return (
    <View style={styles.chatContainer}>
      <Text style={styles.chatUser}>{data.name}</Text>
      <Text>{data.message}</Text>
    </View>
  );
};

const Screen = ({ scrollY }) => {
  return (
    <Animated.FlatList
      contentContainerStyle={styles.contentContainerStyle}
      contentInset={Platform.select({ ios: { top: 50 } })}
      contentOffset={Platform.select({
        ios: { x: 0, y: -HEADER_HEIGHT },
      })}
      data={dataArray}
      keyExtractor={item => item.key}
      renderItem={({ item }) => <Item data={item} />}
      scrollEventThrottle={16}
      onScroll={
        scrollY &&
        Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: true,
        })
      }
    />
  );
};

const AnimatedHeader = ({ scrollY, ...props }) => {
  const clampedScrollY = scrollY.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolateLeft: 'clamp',
  });
  const diffClampScrollY = Animated.diffClamp(clampedScrollY, 0, HEADER_HEIGHT);
  const translateY = diffClampScrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: 'clamp',
  });
  return (
    <Animated.View style={[styles.header, { transform: [{ translateY }] }]}>
      <MaterialTopTabBar {...props} />
    </Animated.View>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const CollapsibleHeader = () => {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  return (
    <Tab.Navigator
      tabBar={props => <AnimatedHeader {...props} scrollY={scrollY} />}
      screenOptions={{
        tabBarActiveTintColor: '#fff',
        tabBarItemStyle: {
          backgroundColor: colors.whatsapp,
          height: HEADER_HEIGHT,
        },
        tabBarLabelStyle: {
          fontWeight: 'bold',
        },
        tabBarStyle: {
          height: HEADER_HEIGHT,
        },
      }}>
      <Tab.Screen name="Chats">{props => <Screen {...props} scrollY={scrollY} />}</Tab.Screen>
      <Tab.Screen name="Status">{props => <Screen {...props} scrollY={scrollY} />}</Tab.Screen>
      <Tab.Screen name="Calls">{props => <Screen {...props} scrollY={scrollY} />}</Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  contentContainerStyle: Platform.select({
    ios: { flexGrow: 1, paddingBottom: HEADER_HEIGHT },
    android: {
      flexGrow: 1,
      paddingTop: HEADER_HEIGHT,
      paddingBottom: HEADER_HEIGHT,
    },
  }),
  chatContainer: {
    borderRadius: 5,
    borderWidth: StyleSheet.hairlineWidth,
    margin: 10,
    padding: 10,
  },
  chatUser: {
    fontSize: 17,
    fontWeight: '600',
  },
});
