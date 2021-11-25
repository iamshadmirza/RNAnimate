import React from 'react';
import { View, Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring } from 'react-native-reanimated';
import { colors } from '../utils/Constant';

const Bounce = (): JSX.Element => {
  const scale = useSharedValue(1);
  const handleBounceEffect = () => {
    scale.value = withSequence(withSpring(0.6), withSpring(1));
  };
  const styles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Pressable onPress={handleBounceEffect}>
        <Animated.View
          style={[
            {
              width: 50,
              aspectRatio: 1,
              borderRadius: 25,
              backgroundColor: colors.blue,
            },
            styles,
          ]}
        />
      </Pressable>
    </View>
  );
};

export default Bounce;
