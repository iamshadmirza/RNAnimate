import React from 'react';
import { View, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import { colors } from '../utils/Constant';

const Bounce = (): JSX.Element => {
  const scale = useSharedValue(1);
  const handleBounceEffect = () => {
    scale.value = withSequence(
      withRepeat(
        withSpring(0.5, {
          stiffness: 90,
        }),
        2,
        true,
      ),
      withSpring(1),
    );
  };
  const styles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Pressable onPressIn={handleBounceEffect}>
        <Animated.View
          style={[
            {
              width: 200,
              aspectRatio: 1,
              borderRadius: 100,
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
