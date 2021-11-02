import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Animated, FlatList, Platform } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
// import AnimatedBottomTabBar from './AnimatedBottomTabBar';
import AnimatedHeader from './AnimatedHeader';
import MainContainer from './MainContainer';
import { colors, size } from '../../utils/Constant';

export type bottomTabKeys = 'home' | 'profile';
const bottomTabs: Array<bottomTabKeys> = ['home', 'profile'];

export type topTabKeys = 'chats' | 'status' | 'calls';
const topTabs: Array<topTabKeys> = ['chats', 'status', 'calls'];

const CBTabViewOffset = Platform.OS === 'ios' ? -size.headerHeight : 0;

const BottomTabs = createBottomTabNavigator();

const CollapsibleTopBottomBar = (): JSX.Element => {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const [activeBottomTab, setActiveBottomTab] = React.useState<bottomTabKeys>(bottomTabs[0]);
  const [activeTopTab, setActiveTopTab] = React.useState<topTabKeys>(topTabs[0]);
  const tabkeyToScrollableChildRef = React.useRef<{ [key: string]: FlatList }>({}).current;
  const tabkeyToScrollPosition = React.useRef<{ [key: string]: number }>({}).current;

  // hold ref to all scrollviews
  const trackRef = (key: `${bottomTabKeys}-${topTabKeys}`, ref: FlatList) => {
    tabkeyToScrollableChildRef[key] = ref;
  };

  // listen to global scrollY and track scroll positions of each scrollviews
  React.useEffect(() => {
    const listener = scrollY.addListener(({ value }) => {
      const activeTab = `${activeBottomTab}-${activeTopTab}`;
      tabkeyToScrollPosition[activeTab] = value;
    });
    return () => {
      scrollY.removeListener(listener);
    };
  }, [scrollY, activeBottomTab, activeTopTab, tabkeyToScrollPosition]);

  const syncScrollOffset = () => {
    const activeTab = `${activeBottomTab}-${activeTopTab}`;
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
    <BottomTabs.Navigator
      // tabBar={props => <AnimatedBottomTabBar {...props} scrollY={scrollY} />}
      screenOptions={{
        header: props => <AnimatedHeader {...props} scrollY={scrollY} />,
      }}>
      <BottomTabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color, size: _size }) => <MaterialCommunityIcons name="home" color={color} size={_size} />,
        }}>
        {props => (
          <MainContainer
            {...props}
            color={colors.whatsapp}
            scrollY={scrollY}
            bottomTabKey="home"
            setActiveBottomTab={setActiveBottomTab}
            setActiveTopTab={setActiveTopTab}
            trackRef={trackRef}
            syncScrollOffset={syncScrollOffset}
          />
        )}
      </BottomTabs.Screen>
      <BottomTabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ color, size: _size }) => <MaterialCommunityIcons name="account" color={color} size={_size} />,
        }}>
        {props => (
          <MainContainer
            {...props}
            color={colors.blue}
            scrollY={scrollY}
            bottomTabKey="profile"
            setActiveBottomTab={setActiveBottomTab}
            setActiveTopTab={setActiveTopTab}
            trackRef={trackRef}
            syncScrollOffset={syncScrollOffset}
          />
        )}
      </BottomTabs.Screen>
    </BottomTabs.Navigator>
  );
};

export default CollapsibleTopBottomBar;
