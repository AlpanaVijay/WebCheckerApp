import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WebsiteChecker from './app/WebsiteChecker';
import History from './app/History';
const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          intialRouteName="Home"
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name="WebsiteChecker" component={WebsiteChecker} />
          <Stack.Screen name="History" component={History} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
