import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { colors, size } from '../../utils/Constant';

interface HeaderProps extends BottomTabHeaderProps {
  scrollY: Animated.Value;
}

const AnimatedHeader = ({ scrollY }: HeaderProps): JSX.Element => {
  React.useEffect(() => {
    const listener = scrollY.addListener(({ value }) => {
      console.log(`value`, value); // TODO: remove this
    });
    return () => {
      scrollY.removeListener(listener);
    };
  }, [scrollY]);

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
