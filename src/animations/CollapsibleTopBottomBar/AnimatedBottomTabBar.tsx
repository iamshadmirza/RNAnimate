import { BottomTabBar, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { colors, size } from '../../utils/Constant';

interface HeaderProps extends BottomTabBarProps {
  scrollY: Animated.Value;
}

const AnimatedBottomTabBar = ({ scrollY, ...props }: HeaderProps): JSX.Element => {
  const bottomTabBarHeight = 100;
  const clampedScrollY = scrollY.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolateLeft: 'clamp',
  });
  const diffClampScrollY = Animated.diffClamp(clampedScrollY, 0, bottomTabBarHeight);
  const translateY = diffClampScrollY.interpolate({
    inputRange: [0, bottomTabBarHeight],
    outputRange: [0, bottomTabBarHeight],
    extrapolate: 'clamp',
  });
  return (
    <Animated.View style={[styles.header, { transform: [{ translateY }] }]}>
      <BottomTabBar {...props} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  whatsappHeader: {
    height: size.headerHeight,
    backgroundColor: colors.whatsapp,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  whatsappHeaderText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default AnimatedBottomTabBar;
