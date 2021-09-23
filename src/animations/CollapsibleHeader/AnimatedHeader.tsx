import { MaterialTopTabBar, MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import React from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { colors, size } from '../../utils/Constant';

interface HeaderProps extends MaterialTopTabBarProps {
  scrollY: Animated.Value;
}

const AnimatedHeader = ({ scrollY, ...props }: HeaderProps): JSX.Element => {
  const clampedScrollY = scrollY.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolateLeft: 'clamp',
  });
  const diffClampScrollY = Animated.diffClamp(clampedScrollY, 0, size.headerHeight);
  const translateY = diffClampScrollY.interpolate({
    inputRange: [0, size.headerHeight],
    outputRange: [0, -size.headerHeight],
    extrapolate: 'clamp',
  });
  return (
    <Animated.View style={[styles.header, { transform: [{ translateY }] }]}>
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
