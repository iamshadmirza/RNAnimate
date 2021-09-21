import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types/RootNavigator';
import { AnimationListing } from './AnimationListing';
import { ToggleBar, CollapsibleHeader, HoldAndDrag } from './animations';

const Stack = createNativeStackNavigator<RootStackParamList>();

function Router(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={AnimationListing} />
        <Stack.Screen name="ToggleBar" component={ToggleBar} />
        <Stack.Screen name="CollapsibleHeader" component={CollapsibleHeader} />
        <Stack.Screen name="HoldAndDrag" component={HoldAndDrag} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
