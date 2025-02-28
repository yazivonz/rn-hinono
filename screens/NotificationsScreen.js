import React, { useRef } from 'react';
import { StyleSheet, View, Animated } from 'react-native';

import colors from '../config/colors';
import { notifications } from 'utils/data';
import ScreenComponent from 'components/ScreenComponent';
import { radius, spacingX, spacingY } from 'config/spacing';
import { AntDesign } from '@expo/vector-icons';
import Typo from 'components/Typo';
import { normalizeY } from 'utils/normalize';
import Header from 'components/Header';

function NotificationsScreen({ navigation }) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const SPACING = spacingY._20;
  const CARD_HEIGHT = normalizeY(55);
  const ITEM_SIZE = CARD_HEIGHT + SPACING * 3;

  return (
    <ScreenComponent style={styles.container}>
      <Header label={'Notifications'} />
      <Animated.FlatList
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: true,
        })}
        showsVerticalScrollIndicator={false}
        data={notifications}
        contentContainerStyle={{
          padding: SPACING,
        }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          const inputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)];
          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });
          const opacity = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });

          const isRead = item.isRead;
          return (
            <Animated.View
              style={[
                styles.notiView,
                {
                  backgroundColor: isRead ? colors.light : colors.grayBG,
                  marginBottom: SPACING,
                  padding: SPACING,
                  transform: [{ scale }],
                  opacity,
                },
                isRead && {
                  borderColor: '#D84040',
                },
              ]}>
              <View style={{ height: CARD_HEIGHT }} />
              <View
                style={{ flex: 1, justifyContent: 'space-between', marginVertical: -spacingY._10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacingX._10 }}>
                  <View
                    style={[
                      styles.dot,
                      {
                        backgroundColor: isRead ? '#D84040' : colors.lightGray,
                      },
                    ]}
                  />
                  <Typo size={15} style={{ fontWeight: '600' }}>
                    {item.title}
                  </Typo>
                </View>

                <Typo numberOfLines={2} style={{ color: colors.gray }}>
                  {item.body}
                </Typo>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    gap: spacingX._5,
                  }}>
                  <AntDesign name="clockcircle" size={14} color={'#D84040'} />
                  <Typo style={styles.dateTxt}>{item.date}</Typo>
                </View>
              </View>
            </Animated.View>
          );
        }}
      />
    </ScreenComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  notiView: {
    flexDirection: 'row',
    borderRadius: radius._15,
    borderColor: colors.lightGray,
    borderWidth: 0.5,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 5,
  },
  dateTxt: {
    opacity: 0.8,
    color: '#D84040',
    alignSelf: 'flex-end',
    fontWeight: '500',
    fontSize: normalizeY(13),
  },
  dot: {
    height: normalizeY(10),
    width: normalizeY(10),
    borderRadius: radius._10,
  },
});
export default NotificationsScreen;
