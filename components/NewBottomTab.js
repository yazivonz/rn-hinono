import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import { FontAwesome5, Ionicons, AntDesign, Feather } from '@expo/vector-icons'; // Import necessary icon sets
import { normalizeX, normalizeY } from '../utils/normalize';
import colors from 'config/colors';
import { spacingX, spacingY } from 'config/spacing';
const { width } = Dimensions.get('screen');

const NewBottomTab = ({ state, navigation }) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [selected, setSelected] = useState('Home');
  const [endRange, setEndRange] = useState(0);
  const [startRange, setStartRange] = useState(0);
  const animatedValue = new Animated.Value(0);

  const tabs = [
    { name: 'Home', iconSet: AntDesign, iconName: 'home' },
    { name: 'Cart', iconSet: Feather, iconName: 'shopping-cart' },
    { name: 'Favouties', iconSet: FontAwesome5, iconName: 'heart' },
    { name: 'Profile', iconSet: Ionicons, iconName: 'person-outline' },
  ];

  const handleSelect = (routeName) => {
    const range =
      routeName == 'Home'
        ? 0
        : routeName == 'Cart'
          ? width * 0.225
          : routeName == 'Favourites'
            ? width * 0.44
            : routeName == 'Profile'
              ? width * 0.66
              : 0;
    setStartRange(endRange);
    setEndRange(range);
    setSelected(routeName);
    if (routeName == 'Cart') navigation.navigate('CartScreen');
    else navigation.navigate(routeName);
  };

  useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: 1,
      friction: 6,
      useNativeDriver: false,
    }).start();
  }, [selected]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [startRange, endRange],
  });

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  // if (isKeyboardVisible) {
  //   return <View style={{ marginVertical: -100 }}></View>;
  // }

  return (
    <View style={styles.container}>
      <View
        style={{
          position: 'absolute',
          bottom: normalizeY(20),
          right: 0,
          left: 0,
          marginHorizontal: '16.3%',
        }}>
        <Animated.View
          style={[
            styles.animationBar,
            {
              transform: [{ translateX }],
            },
          ]}
        />
      </View>
      {tabs.map((tab, index) => {
        const routeName = state.routes[index].name;
        const isFocused = selected === routeName;
        const IconComponent = tab.iconSet;
        return (
          <TouchableOpacity
            key={index}
            style={styles.tabContent}
            onPress={() => handleSelect(routeName)}>
            <IconComponent
              name={tab.iconName}
              size={24}
              color={isFocused ? '#D84040' : colors.black}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default NewBottomTab;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 0,
    height: 75,
    backgroundColor: colors.white,
    position: 'absolute',
    justifyContent: 'space-evenly',
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.1,
    elevation: 10,
    paddingBottom: spacingY._15,
  },
  tabContent: {
    justifyContent: 'space-around',
    alignItems: 'center',
    height: normalizeY(35),
    paddingHorizontal: normalizeX(8),
  },
  icon: {
    width: normalizeY(15),
    height: normalizeY(15),
  },
  animationBar: {
    backgroundColor: '#D84040',
    width: normalizeX(6),
    height: normalizeY(6),
    borderRadius: normalizeY(8),
  },
});
