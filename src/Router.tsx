import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types/RootNavigator';
import { AnimationListing } from './AnimationListing';
import { ToggleBar, HoldAndDrag, CollapsibleHeader, CollapsibleHeaderREA2 } from './animations';
import CollapsibleTopBottomBar from './animations/CollapsibleTopBottomBar';

const Stack = createNativeStackNavigator<RootStackParamList>();

function Router(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={AnimationListing} />
        <Stack.Screen name="ToggleBar" component={ToggleBar} />
        <Stack.Screen
          name="CollapsibleHeader"
          component={CollapsibleHeader}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CollapsibleHeaderREA2"
          component={CollapsibleHeaderREA2}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="HoldAndDrag" component={HoldAndDrag} />
        <Stack.Screen name="CollapsibleTopBottomBar" component={CollapsibleTopBottomBar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
