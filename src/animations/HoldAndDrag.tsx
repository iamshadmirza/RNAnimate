import React from 'react';
import { View, Image, StyleSheet, LayoutRectangle } from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
} from 'react-native-reanimated';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { clamp, withBouncing } from 'react-native-redash';

const HEAD_WIDTH = 100;

const UserHead = () => {
  return (
    <Image style={[styles.head]} source={{ uri: 'https://avatars2.githubusercontent.com/u/22999030?s=460&v=4' }} />
  );
};

export const HoldAndDrag = (): JSX.Element => {
  const [container, setContainer] = React.useState<null | LayoutRectangle>(null);
  const boundX = container ? container.width - HEAD_WIDTH : 0;
  const boundY = container ? container.height - HEAD_WIDTH : 0;
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { offsetX: number; offsetY: number }>(
    {
      onStart: (event, ctx) => {
        ctx.offsetX = translateX.value;
        ctx.offsetY = translateY.value;
      },
      onActive: (event, ctx) => {
        translateX.value = clamp(event.translationX + ctx.offsetX, 0, boundX);
        translateY.value = clamp(event.translationY + ctx.offsetY, 0, boundY);
      },
      onEnd: event => {
        translateX.value = withBouncing(
          withDecay({
            velocity: event.velocityX,
            clamp: [0, boundX],
          }),
          0,
          boundX,
        );
        translateY.value = withBouncing(
          withDecay({
            velocity: event.velocityY,
            clamp: [0, boundY],
          }),
          0,
          boundY,
        );
      },
    },
  );
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
  }));
  return (
    <View style={styles.container} onLayout={({ nativeEvent: { layout } }) => setContainer(layout)}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={{ ...animatedStyle }}>
          <UserHead />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  head: {
    width: HEAD_WIDTH,
    aspectRatio: 1,
    borderRadius: HEAD_WIDTH / 2,
  },
});
