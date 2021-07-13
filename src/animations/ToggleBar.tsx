import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';
import {View, Text, Button, StyleSheet} from 'react-native';
import React from 'react';

// Copied example from reanimated docs
export default function ToggleBar() {
  const randomWidth = useSharedValue(10);

  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const style = useAnimatedStyle(() => {
    return {
      width: withTiming(randomWidth.value, config),
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Reanimated Demo</Text>
      <Animated.View style={[styles.bar, style]} />
      <Button
        title="toggle"
        onPress={() => {
          randomWidth.value = Math.random() * 350;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  bar: {
    width: 100,
    height: 80,
    backgroundColor: 'black',
    margin: 30,
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
    alignSelf: 'center',
  },
});
