import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FavouritesScreen from 'screens/FavouritesScreen';
import HomeScreen from 'screens/HomeScreen';
import CartScreen from 'screens/CartScreen';
import ProfileScreen from 'screens/ProfileScreen';
import CustomBottomTab from 'components/CustomBottomTab';
import NewBottomTab from 'components/NewBottomTab';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <NewBottomTab {...props} />}
      screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Favourites" component={FavouritesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
