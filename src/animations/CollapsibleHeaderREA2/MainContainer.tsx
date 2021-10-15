import { createMaterialTopTabNavigator, MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import React from 'react';
import { FlatList, SafeAreaView, StatusBar, Platform } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { colors, size } from '../../utils/Constant';
import AnimatedHeader from './AnimatedHeader';
import Screen from './Screen';

const tabs: Array<tabKeys> = ['chats', 'status', 'calls'];
export type tabKeys = 'chats' | 'status' | 'calls';

const Tab = createMaterialTopTabNavigator();

export const CBTabViewOffset = Platform.OS === 'ios' ? -size.headerHeight : 0;

const MainContainer = (): JSX.Element => {
  const scrollY = useSharedValue(0);
  // SYNC SCROLL OFFSET
  const [activeTab, setActiveTab] = React.useState(tabs[0]);
  const tabkeyToScrollableChildRef = React.useRef<{ [key: string]: FlatList }>({}).current;
  const tabkeyToScrollPosition = React.useRef<{ [key: string]: number }>({}).current;

  // hold ref to all scrollviews
  const trackRef = (key: tabKeys, ref: FlatList) => {
    tabkeyToScrollableChildRef[key] = ref;
  };
  // listen to global scrollY and track scroll positions of each scrollviews
  // React.useEffect(() => {
  //   const listener = scrollY.addListener(({ value }) => {
  //     tabkeyToScrollPosition[activeTab] = value;
  //   });
  //   return () => {
  //     scrollY.removeListener(listener);
  //   };
  // });
  // sync scroll offset when scroll ends
  // scroll ends on onScrollEndDrag and onMomentumScrollEnd
  // const syncScrollOffset = () => {
  //   const scrollValue = tabkeyToScrollPosition[activeTab];
  //   Object.keys(tabkeyToScrollableChildRef).forEach(key => {
  //     const scrollRef = tabkeyToScrollableChildRef[key];
  //     if (!scrollRef || key === activeTab) {
  //       return;
  //     }

  //     if (scrollValue <= CBTabViewOffset + size.headerHeight) {
  //       /* header visible */
  //       scrollRef.scrollToOffset({
  //         offset: Math.max(Math.min(scrollValue, CBTabViewOffset + size.headerHeight), CBTabViewOffset),
  //         animated: false,
  //       });
  //       tabkeyToScrollPosition[key] = scrollValue;
  //     } else if (
  //       tabkeyToScrollPosition[key] < CBTabViewOffset + size.headerHeight ||
  //       tabkeyToScrollPosition[key] == null
  //     ) {
  //       /* header hidden */
  //       scrollRef.scrollToOffset({
  //         offset: CBTabViewOffset + size.headerHeight,
  //         animated: false,
  //       });
  //       tabkeyToScrollPosition[key] = CBTabViewOffset + size.headerHeight;
  //     }
  //   });
  // };

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
              // syncScrollOffset={syncScrollOffset}
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
              // syncScrollOffset={syncScrollOffset}
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
              // syncScrollOffset={syncScrollOffset}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default MainContainer;
