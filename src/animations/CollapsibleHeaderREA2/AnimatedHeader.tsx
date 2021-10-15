import { MaterialTopTabBar, MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { clamp } from 'react-native-redash';
import { colors, size } from '../../utils/Constant';

interface HeaderProps extends MaterialTopTabBarProps {
  scrollY: Animated.SharedValue<number>;
}

const AnimatedHeader = ({ scrollY, ...props }: HeaderProps): JSX.Element => {
  const headerStyle = useAnimatedStyle(() => {
    const diffClampScrollY = clamp(scrollY.value, 0, size.headerHeight);
    const translateY = interpolate(
      diffClampScrollY,
      [0, size.headerHeight],
      [0, -size.headerHeight],
      Extrapolate.CLAMP,
    );
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
      transform: [{ translateY }],
    };
  });
  return (
    <Animated.View style={headerStyle}>
      <View style={styles.whatsappHeader}>
        <Text style={styles.whatsappHeaderText}>WhatsApp</Text>
      </View>
      <MaterialTopTabBar {...props} />
    </Animated.View>
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

export default AnimatedHeader;
