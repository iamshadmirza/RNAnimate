import React from 'react';
import { Animated, Platform, FlatList, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import faker from 'faker';
import { useIsFocused } from '@react-navigation/core';
import { size } from '../../utils/Constant';
import ChatItem from './ChatItem';
import { tabKeys } from './MainContainer';

const dataArray = Array.from(Array(20)).map(() => ({
  key: faker.datatype.uuid(),
  name: faker.name.firstName(),
  message: faker.random.words(),
}));

const TOTAL_OFFSET = size.headerHeight + size.tabBarHeight;

type ScreenProps = {
  scrollY: Animated.Value;
  trackRef: (key: tabKeys, ref: FlatList) => void;
  tabKey: tabKeys;
  setActiveTab: (key: tabKeys) => void;
  syncScrollOffset: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

const Screen = ({ scrollY, trackRef, tabKey, setActiveTab, syncScrollOffset }: ScreenProps): JSX.Element => {
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (isFocused) setActiveTab(tabKey);
  }, [isFocused, setActiveTab, tabKey]);

  return (
    <Animated.FlatList
      ref={(ref: FlatList) => {
        trackRef(tabKey, ref);
      }}
      contentContainerStyle={Platform.select({
        ios: { flexGrow: 1, paddingBottom: size.tabBarHeight },
        android: {
          flexGrow: 1,
          paddingTop: size.headerHeight,
          paddingBottom: size.tabBarHeight,
        },
      })}
      contentInset={Platform.select({ ios: { top: TOTAL_OFFSET } })}
      contentOffset={Platform.select({
        ios: { x: 0, y: -TOTAL_OFFSET },
      })}
      data={dataArray}
      keyExtractor={item => item.key}
      renderItem={({ item, index }) => <ChatItem data={item} index={index} />}
      scrollEventThrottle={16}
      onScrollEndDrag={syncScrollOffset}
      onMomentumScrollEnd={syncScrollOffset}
      onScroll={
        scrollY &&
        Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: true,
        })
      }
    />
  );
};

export default Screen;
