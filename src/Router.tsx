import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ToggleBar from './animations/ToggleBar';
import AnimationListing from './AnimationListing';

const Stack = createStackNavigator<RootStackParamList>();

function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={AnimationListing} />
        <Stack.Screen name="ToggleBar" component={ToggleBar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
