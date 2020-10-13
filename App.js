import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import DetailsScreen from './src/screens/DetailsScreen';
import HomeScreen from './src/screens/HomeScreen';
import MainScreen from './src/screens/MainScreen';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import SplashScreen from './src/screens/SplashScreen';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"Splash"}>
        <Stack.Screen name="Splash" component={SplashScreen} options={{ header: () => null }} />
        <Stack.Screen name="Main" component={MainScreen} options={{ header: () => null }} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
