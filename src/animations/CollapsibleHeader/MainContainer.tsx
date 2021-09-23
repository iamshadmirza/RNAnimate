import { createMaterialTopTabNavigator, MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import React from 'react';
import { Animated, FlatList, SafeAreaView, StatusBar } from 'react-native';
import { colors, size } from '../../utils/Constant';
import AnimatedHeader from './AnimatedHeader';
import Screen from './Screen';

const tabs: Array<tabKeys> = ['chats', 'status', 'calls'];
export type tabKeys = 'chats' | 'status' | 'calls';

const Tab = createMaterialTopTabNavigator();

const animatedTabSceneOffset = 0;

const MainContainer = (): JSX.Element => {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  // SYNC SCROLL OFFSET
  const [activeTab, setActiveTab] = React.useState(tabs[0]);
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
  // sync scroll offset when scroll ends
  // scroll ends on onScrollEndDrag and onMomentumScrollEnd
  const syncScrollOffset = () => {
    const scrollValue = tabkeyToScrollPosition[activeTab];
    Object.keys(tabkeyToScrollableChildRef).forEach(key => {
      const scrollRef = tabkeyToScrollableChildRef[key];
      if (!scrollRef || key === activeTab) {
        return;
      }

      if (scrollValue <= animatedTabSceneOffset + size.headerHeight) {
        /* header visible */
        scrollRef.scrollToOffset({
          offset: Math.max(Math.min(scrollValue, animatedTabSceneOffset + size.headerHeight), animatedTabSceneOffset),
          animated: false,
        });
        tabkeyToScrollPosition[key] = scrollValue;
      } else if (
        tabkeyToScrollPosition[key] < animatedTabSceneOffset + size.headerHeight ||
        tabkeyToScrollPosition[key] == null
      ) {
        /* header hidden */
        scrollRef.scrollToOffset({
          offset: animatedTabSceneOffset + size.headerHeight,
          animated: false,
        });
        tabkeyToScrollPosition[key] = animatedTabSceneOffset + size.headerHeight;
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
