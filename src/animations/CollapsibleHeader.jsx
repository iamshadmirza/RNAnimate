/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { View, Text, Animated, useWindowDimensions } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { TabView, TabBar } from 'react-native-tab-view';

const HEADER_HEIGHT = 56;

const LIST_CONTENT = Array.from(Array(20)).map(() => ({
  name: 'Something',
  brief:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud',
}));

const ListContent = ({ isActive, scrollY }) => {
  const translateY = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [-50, 0],
    extrapolate: 'clamp',
  });
  return (
    <Animated.FlatList
      style={{ transform: [{ translateY }], paddingTop: 50 }}
      data={LIST_CONTENT}
      keyExtractor={(item, i) => i.toString()}
      scrollEventThrottle={16}
      onScroll={
        isActive && Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })
      }
      renderItem={({ item }) => (
        <View style={{ margin: 10, borderWidth: 1, padding: 10, borderRadius: 5 }}>
          <Text style={{ fontWeight: '700' }}>{item.name}</Text>
          <Text>{item.brief}</Text>
        </View>
      )}
    />
  );
};

const Header = ({ scrollY }) => {
  const translateY = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });
  return (
    <Animated.View
      style={{
        height: HEADER_HEIGHT,
        backgroundColor: '#075e54',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        transform: [{ translateY }],
      }}>
      <Text
        style={{
          fontSize: 20,
          color: 'white',
          paddingLeft: 10,
        }}>
        Whatsapp
      </Text>
    </Animated.View>
  );
};

export const CollapsibleHeader = ({ navigation }) => {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const layout = useWindowDimensions();
  React.useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#075e54',
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerTintColor: 'white',
    });
  }, [navigation]);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'chats', title: 'Chats' },
    { key: 'stories', title: 'Stories' },
    { key: 'calls', title: 'Calls' },
  ]);

  const renderScene = React.useCallback(
    ({ route }) => {
      switch (route.key) {
        case 'chats':
          return <ListContent isActive={routes[index].key === route.key} scrollY={scrollY} />;
        case 'stories':
          return <ListContent isActive={routes[index].key === route.key} scrollY={scrollY} />;
        case 'calls':
          return <ListContent isActive={routes[index].key === route.key} scrollY={scrollY} />;
        default:
          return null;
      }
    },
    [index, routes, scrollY],
  );

  const renderTabBar = React.useCallback(
    props => {
      const translateY = scrollY.interpolate({
        inputRange: [0, HEADER_HEIGHT],
        outputRange: [0, -HEADER_HEIGHT],
        extrapolate: 'clamp',
      });

      const opacity = scrollY.interpolate({
        inputRange: [HEADER_HEIGHT, HEADER_HEIGHT + 20],
        outputRange: [0, 1],
        extrapolateRight: 'clamp',
      });

      const renderItem =
        ({ navigationState, position }) =>
        ({ route }) => {
          return (
            <Animated.View
              style={[
                {
                  width: '100%',
                  zIndex: 10,
                  height: HEADER_HEIGHT,
                  backgroundColor: '#075e54',
                  transform: [{ translateY }],
                },
              ]}>
              <Text>{route.title}</Text>
              <Animated.View>
                <View
                  style={{
                    height: 1,
                    backgroundColor: '#eee',
                  }}
                />
              </Animated.View>
            </Animated.View>
          );
        };

      return (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#fafafa',
          }}>
          {props.navigationState.routes.map((route, i) => {
            return (
              <TouchableWithoutFeedback key={route.key} onPress={() => props.jumpTo(route.key)}>
                {renderItem(props)({ route, index: i })}
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      );
    },
    [scrollY],
  );

  return (
    <>
      <Header scrollY={scrollY} />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </>
  );
};
