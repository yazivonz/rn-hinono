import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { normalizeY } from '../utils/normalize';
import colors from 'config/colors';

const Typo = ({ size, alignCenter, style, ...props }) => {
  return (
    <Text
      allowFontScaling={false}
      style={[
        styles.default,
        {
          fontSize: size ? normalizeY(size) : normalizeY(14),
        },
        style,
      ]}
      {...props}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  default: {
    color: colors.black,
  },
});

export default Typo;
