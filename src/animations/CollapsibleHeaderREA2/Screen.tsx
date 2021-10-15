/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
import React from 'react';
import { Platform, FlatList } from 'react-native';
import faker from 'faker';
import { useIsFocused } from '@react-navigation/core';
import Animated, { useAnimatedScrollHandler } from 'react-native-reanimated';
import { size } from '../../utils/Constant';
import ChatItem from './ChatItem';
import { tabKeys } from './MainContainer';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

type DataType = {
  key: string;
  name: string;
  message: string;
};

const dataArray: Array<DataType> = Array.from(Array(20)).map(() => ({
  key: faker.datatype.uuid(),
  name: faker.name.firstName(),
  message: faker.random.words(),
}));

const TOTAL_OFFSET = size.headerHeight + size.tabBarHeight;

type ScreenProps = {
  scrollY: Animated.SharedValue<number>;
  trackRef: (key: tabKeys, ref: FlatList) => void;
  tabKey: tabKeys;
  setActiveTab: (key: tabKeys) => void;
};

const Screen = ({ scrollY, trackRef, tabKey, setActiveTab }: ScreenProps): JSX.Element => {
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (isFocused) setActiveTab(tabKey);
  }, [isFocused, setActiveTab, tabKey]);

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
  });

  return (
    <AnimatedFlatList
      ref={(ref: FlatList) => {
        trackRef(tabKey, ref);
      }}
      contentContainerStyle={Platform.select({
        ios: { flexGrow: 1, paddingBottom: TOTAL_OFFSET },
        android: {
          flexGrow: 1,
          paddingTop: TOTAL_OFFSET,
          paddingBottom: size.headerHeight,
        },
      })}
      contentInset={Platform.select({ ios: { top: TOTAL_OFFSET } })}
      contentOffset={Platform.select({
        ios: { x: 0, y: -TOTAL_OFFSET },
      })}
      data={dataArray}
      keyExtractor={item => item.key}
      renderItem={({ item, index }) => <ChatItem data={item as DataType} index={index} />}
      scrollEventThrottle={16}
      onScroll={scrollY && onScroll}
    />
  );
};

export default Screen;
