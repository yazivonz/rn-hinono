import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet, Dimensions } from 'react-native';
import colors from '../config/colors';
import { normalizeX, normalizeY } from '../utils/normalize';
import Typo from './Typo';
import { radius, spacingX, spacingY } from 'config/spacing';

const { width } = Dimensions.get('screen');
const containerWidth = width - 30;

function DetailsSelector({ selected, setSelected }) {
  const animatedValue = new Animated.Value(0);
  const [startRange, setStartRange] = useState(0);
  const [endRange, setEndRange] = useState(0);

  const handleSelect = async (text) => {
    const range =
      text == 'Description'
        ? 0
        : text == 'Specifications'
          ? containerWidth * 0.3333
          : text == 'Reviews'
            ? containerWidth * 0.6666
            : 0;
    setStartRange(endRange);
    setEndRange(range);
    setSelected(text);
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

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.selectedView,
          {
            transform: [{ translateX }],
          },
        ]}
      />
      <TouchableOpacity style={styles.textContainer} onPress={() => handleSelect('Description')}>
        <Typo
          size={12}
          style={{
            fontWeight: '500',
            color: selected == 'Description' ? colors.white : colors.black,
          }}>
          Description
        </Typo>
      </TouchableOpacity>
      <TouchableOpacity style={styles.textContainer} onPress={() => handleSelect('Specifications')}>
        <Typo
          size={12}
          style={{
            fontWeight: '500',
            color: selected == 'Specifications' ? colors.white : colors.black,
          }}>
          Specifications
        </Typo>
      </TouchableOpacity>
      <TouchableOpacity style={styles.textContainer} onPress={() => handleSelect('Reviews')}>
        <Typo
          size={12}
          style={{
            fontWeight: '500',
            color: selected == 'Reviews' ? colors.white : colors.black,
          }}>
          Reviews
        </Typo>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: spacingY._15,
    borderRadius: radius._20,
    overflow: 'hidden',
    backgroundColor: colors.inputField,
    marginTop: spacingY._20,
  },
  selectedView: {
    backgroundColor: '#D84040',
    width: normalizeX(containerWidth / 3) - spacingX._10,
    height: '100%',
    position: 'absolute',
    borderRadius: radius._30,
    marginStart: spacingX._3,
  },
  textContainer: {
    flex: 1,
    paddingVertical: normalizeY(10),
    alignItems: 'center',
  },
});

export default DetailsSelector;
