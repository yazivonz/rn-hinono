import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from 'screens/RegisterScreen';
import SigninScreen from 'screens/SigninScreen';
import StartScreen from 'screens/StartScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, orientation: 'portrait' }}>
      <Stack.Screen name="Start" component={StartScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Signin" component={SigninScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
