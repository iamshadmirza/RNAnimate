import { createMaterialTopTabNavigator, MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import React from 'react';
import {
  Animated,
  FlatList,
  SafeAreaView,
  StatusBar,
  Platform,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { clamp } from 'react-native-redash';
import { colors, size } from '../../utils/Constant';
import AnimatedHeader from './AnimatedHeader';
import Screen from './Screen';

const tabs: Array<tabKeys> = ['chats', 'status', 'calls'];
export type tabKeys = 'chats' | 'status' | 'calls';

const Tab = createMaterialTopTabNavigator();

export const CBTabViewOffset = Platform.OS === 'ios' ? -size.headerHeight : 0;

const MainContainer = (): JSX.Element => {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  // SYNC SCROLL OFFSET
  const [activeTab, setActiveTab] = React.useState(tabs[0]);
  const scrollYTwo = React.useRef(0);
  const tabkeyToScrollableChildRef = React.useRef<{ [key: string]: FlatList }>({}).current;
  const tabkeyToScrollPosition = React.useRef<{ [key: string]: number }>({}).current;

  // hold ref to all scrollviews
  const trackRef = (key: tabKeys, ref: FlatList) => {
    tabkeyToScrollableChildRef[key] = ref;
  };
  // listen to global scrollY and track scroll positions of each scrollviews
  React.useEffect(() => {
    const listener = scrollY.addListener(({ value }) => {
      tabkeyToScrollPosition[activeTab] = value;
    });
    return () => {
      scrollY.removeListener(listener);
    };
  });

  const checkHeaderPosition = (nativeEvent: NativeScrollEvent) => {
    // check if header is visible or not
    // if scroll position is past threshold, adjust header so it will either be visible or hidden after scroll
    const scrollYOffset = nativeEvent.contentOffset.y;
    const diff = Math.abs(scrollYOffset + size.headerHeight + size.tabBarHeight - scrollYTwo.current);
    const scrollRef = tabkeyToScrollableChildRef[activeTab];
    if (scrollYOffset < scrollYTwo.current) {
      // scrolled down
      if (diff < size.headerHeight) {
        console.log('scrolled down');

        scrollRef.scrollToOffset({
          offset: -(size.headerHeight + size.tabBarHeight - scrollYOffset),
          animated: true,
        });
      }
    } else {
      // scrolled up
      console.log('scrolled up');
      if (diff < size.headerHeight) {
        scrollRef.scrollToOffset({
          offset: scrollYOffset - size.tabBarHeight,
          animated: true,
        });
      }
    }

    scrollYTwo.current = scrollYOffset;
  };
  // sync scroll offset when scroll ends
  // scroll ends on onScrollEndDrag and onMomentumScrollEnd
  const syncScrollOffset = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
    checkHeaderPosition(nativeEvent);
    return;
    const scrollValue = tabkeyToScrollPosition[activeTab];
    Object.keys(tabkeyToScrollableChildRef).forEach(key => {
      const scrollRef = tabkeyToScrollableChildRef[key];
      if (!scrollRef || key === activeTab) {
        return;
      }

      if (scrollValue <= CBTabViewOffset + size.headerHeight) {
        /* header visible */
        scrollRef.scrollToOffset({
          offset: Math.max(Math.min(scrollValue, CBTabViewOffset + size.headerHeight), CBTabViewOffset),
          animated: false,
        });
        tabkeyToScrollPosition[key] = scrollValue;
      } else if (
        tabkeyToScrollPosition[key] < CBTabViewOffset + size.headerHeight ||
        tabkeyToScrollPosition[key] == null
      ) {
        /* header hidden */
        scrollRef.scrollToOffset({
          offset: CBTabViewOffset + size.headerHeight,
          animated: false,
        });
        tabkeyToScrollPosition[key] = CBTabViewOffset + size.headerHeight;
      }
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.whatsapp }}>
      <StatusBar backgroundColor={colors.whatsapp} barStyle="light-content" />
      <Tab.Navigator
        tabBar={(props: MaterialTopTabBarProps) => <AnimatedHeader {...props} scrollY={scrollY} />}
        screenOptions={{
          tabBarActiveTintColor: '#fff',
          tabBarItemStyle: {
            backgroundColor: colors.whatsapp,
            height: size.tabBarHeight,
          },
          tabBarLabelStyle: {
            fontWeight: 'bold',
          },
          tabBarStyle: {
            height: size.tabBarHeight,
          },
        }}>
        <Tab.Screen name="Chats">
          {props => (
            <Screen
              {...props}
              tabKey={tabs[0]}
              scrollY={scrollY}
              trackRef={trackRef}
              setActiveTab={setActiveTab}
              syncScrollOffset={syncScrollOffset}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Status">
          {props => (
            <Screen
              {...props}
              tabKey={tabs[1]}
              scrollY={scrollY}
              trackRef={trackRef}
              setActiveTab={setActiveTab}
              syncScrollOffset={syncScrollOffset}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Calls">
          {props => (
            <Screen
              {...props}
              tabKey={tabs[2]}
              scrollY={scrollY}
              trackRef={trackRef}
              setActiveTab={setActiveTab}
              syncScrollOffset={syncScrollOffset}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default MainContainer;
