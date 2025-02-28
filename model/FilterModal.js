import { AntDesign, Entypo } from '@expo/vector-icons';
import { Slider } from '@miblanchard/react-native-slider';
import Typo from 'components/Typo';
import colors from 'config/colors';
import { radius, spacingX, spacingY } from 'config/spacing';
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  FlatList,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { BRANDS, CATEGORIES, COLORS, STYLES, SIZES } from 'utils/data';
import { normalizeY } from 'utils/normalize';
const { height } = Dimensions.get('screen');

function FilterModal({ visible, setVisible }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(1000);

  const handleSelectCategories = (name) => {
    if (selectedCategories.includes(name)) {
      const filtered = selectedCategories.filter((item) => item !== name);
      setSelectedCategories(filtered);
    } else {
      setSelectedCategories([...selectedCategories, name]);
    }
  };
  const handleSelectStyles = (name) => {
    if (selectedStyles.includes(name)) {
      const filtered = selectedStyles.filter((item) => item !== name);
      setSelectedStyles(filtered);
    } else {
      setSelectedStyles([...selectedStyles, name]);
    }
  };
  const handleSelectBrands = (name) => {
    if (selectedBrands.includes(name)) {
      const filtered = selectedBrands.filter((item) => item !== name);
      setSelectedBrands(filtered);
    } else {
      setSelectedBrands([...selectedBrands, name]);
    }
  };
  const handleSelectSizes = (name) => {
    if (selectedSizes.includes(name)) {
      const filtered = selectedSizes.filter((item) => item !== name);
      setSelectedSizes(filtered);
    } else {
      setSelectedSizes([...selectedSizes, name]);
    }
  };
  const handleSelectColors = (name) => {
    if (selectedColors.includes(name)) {
      const filtered = selectedColors.filter((item) => item !== name);
      setSelectedColors(filtered);
    } else {
      setSelectedColors([...selectedColors, name]);
    }
  };

  return (
    <>
      <Modal transparent visible={visible} animationType="slide">
        <TouchableOpacity
          onPress={() => setVisible(false)}
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            height: height * 0.2,
          }}
        />
        <View activeOpacity={1} style={styles.container}>
          <View style={styles.filters}>
            <Typo size={25} style={{ fontWeight: '700' }}>
              Filters
            </Typo>
            <TouchableOpacity style={styles.crossIcon} onPress={() => setVisible(false)}>
              <Entypo name="cross" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={{ paddingBottom: '15%' }}
            showsVerticalScrollIndicator={false}>
            <Heading title={'Category'} index={1} />
            <Animated.ScrollView
              horizontal
              entering={FadeInDown.delay(1 * 130)
                .duration(300)
                .springify()
                .damping(12)
                .stiffness(80)}>
              <FlatList
                scrollEnabled={false}
                data={CATEGORIES}
                numColumns={3}
                contentContainerStyle={{ gap: spacingY._10 }}
                columnWrapperStyle={{ gap: spacingX._10 }}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      style={styles.listItem}
                      onPress={() => handleSelectCategories(item)}>
                      {selectedCategories.includes(item) ? (
                        <AntDesign name="checkcircle" size={18} color={colors.primary} />
                      ) : (
                        <View style={styles.circle} />
                      )}
                      <Typo>{item}</Typo>
                    </TouchableOpacity>
                  );
                }}
              />
            </Animated.ScrollView>
            <Heading title={'Style'} index={2} />
            <Animated.ScrollView
              horizontal
              entering={FadeInDown.delay(2 * 130)
                .duration(300)
                .springify()
                .damping(12)
                .stiffness(80)}>
              <FlatList
                scrollEnabled={false}
                data={STYLES}
                numColumns={3}
                contentContainerStyle={{ gap: spacingY._10 }}
                columnWrapperStyle={{ gap: spacingX._10 }}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      style={styles.listItem}
                      onPress={() => handleSelectStyles(item)}>
                      {selectedStyles.includes(item) ? (
                        <AntDesign name="checkcircle" size={18} color={colors.primary} />
                      ) : (
                        <View style={styles.circle} />
                      )}
                      <Typo>{item}</Typo>
                    </TouchableOpacity>
                  );
                }}
              />
            </Animated.ScrollView>
            <Heading title={'Brand'} index={3} />
            <Animated.ScrollView
              horizontal
              entering={FadeInDown.delay(3 * 130)
                .duration(300)
                .springify()
                .damping(12)
                .stiffness(80)}>
              <FlatList
                scrollEnabled={false}
                data={BRANDS}
                numColumns={3}
                contentContainerStyle={{ gap: spacingY._10 }}
                columnWrapperStyle={{ gap: spacingX._10 }}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      style={styles.listItem}
                      onPress={() => handleSelectBrands(item)}>
                      {selectedBrands.includes(item) ? (
                        <AntDesign name="checkcircle" size={18} color={colors.primary} />
                      ) : (
                        <View style={styles.circle} />
                      )}
                      <Typo>{item}</Typo>
                    </TouchableOpacity>
                  );
                }}
              />
            </Animated.ScrollView>
            <Heading title={'Color'} index={4} />
            <Animated.ScrollView
              horizontal
              entering={FadeInDown.delay(4 * 130)
                .duration(300)
                .springify()
                .damping(12)
                .stiffness(80)}>
              <FlatList
                scrollEnabled={false}
                data={COLORS}
                numColumns={4}
                contentContainerStyle={{ gap: spacingY._10 }}
                columnWrapperStyle={{ gap: spacingX._10 }}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                  const isInclude = selectedColors.includes(item);
                  return (
                    <TouchableOpacity
                      style={[
                        styles.listItem,
                        {
                          borderColor: isInclude ? colors.blue : colors.lightGray,
                          borderWidth: isInclude ? 2 : 1,
                          margin: isInclude ? 0 : 1,
                        },
                      ]}
                      onPress={() => handleSelectColors(item)}>
                      <View
                        style={[
                          styles.circle,
                          { backgroundColor: item.toLowerCase(), borderWidth: 0 },
                        ]}
                      />
                      <Typo>{item}</Typo>
                    </TouchableOpacity>
                  );
                }}
              />
            </Animated.ScrollView>
            <Heading title={'Size'} index={5} />
            <Animated.ScrollView
              horizontal
              entering={FadeInDown.delay(5 * 130)
                .duration(300)
                .springify()
                .damping(12)
                .stiffness(80)}>
              <FlatList
                scrollEnabled={false}
                data={SIZES}
                numColumns={4}
                contentContainerStyle={{ gap: spacingY._10 }}
                columnWrapperStyle={{ gap: spacingX._10 }}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      style={styles.listItem}
                      onPress={() => handleSelectSizes(item)}>
                      {selectedSizes.includes(item) ? (
                        <AntDesign name="checkcircle" size={18} color={colors.primary} />
                      ) : (
                        <View style={styles.circle} />
                      )}
                      <Typo>{item}</Typo>
                    </TouchableOpacity>
                  );
                }}
              />
            </Animated.ScrollView>
            <Heading title={'Price Range'} index={6} />
            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Typo>${low}</Typo>
                <Typo>${high}</Typo>
              </View>
            </View>
            <Slider
              minimumTrackTintColor={colors.themeColor}
              maximumTrackTintColor={colors.lightGray}
              minimumValue={0}
              maximumValue={100}
              thumbTintColor={colors.themeColor}
              trackStyle={{ backgroundColor: colors.lightGray }}
              value={[low, high]}
              onValueChange={([low, high]) => {
                setLow(parseInt(low));
                setHigh(parseInt(high));
              }}
            />
            <View style={styles.footer}>
              <TouchableOpacity onPress={() => setVisible(false)} style={[styles.footerButton]}>
                <Typo size={13} style={{ color: colors.white, fontWeight: '600' }}>
                  Show 32 Results
                </Typo>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setVisible(false)}
                style={[styles.footerButton, { backgroundColor: colors.lighterGray }]}>
                <Typo size={13} style={{ color: colors.black, fontWeight: '600' }}>
                  Reset
                </Typo>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}

const Heading = ({ title, index }) => {
  return (
    <Animated.View
      style={{ marginBottom: 11 }}
      entering={FadeInDown.delay(index * 130)
        .duration(300)
        .springify()
        .damping(12)
        .stiffness(80)}>
      <Typo size={16} style={styles.heading}>
        {title}
      </Typo>
      {/* <View style={styles.line} /> */}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopRightRadius: radius._20,
    borderTopLeftRadius: radius._20,
    marginTop: -spacingY._20,
    paddingHorizontal: spacingX._20,
  },
  heading: {
    fontWeight: '700',
    marginTop: spacingY._20,
  },
  crossIcon: {
    backgroundColor: colors.lighterGray,
    borderRadius: radius._20,
    padding: spacingY._5,
    marginTop: spacingY._10,
  },
  line: {
    height: normalizeY(1),
    backgroundColor: colors.lightGray,
    marginVertical: spacingY._10,
  },
  circle: {
    height: normalizeY(17),
    width: normalizeY(17),
    borderRadius: radius._10,
    borderWidth: normalizeY(1),
    borderColor: colors.lightGray,
  },
  listItem: {
    flexDirection: 'row',
    borderWidth: 1,
    padding: spacingY._5,
    paddingHorizontal: spacingY._7,
    borderRadius: spacingY._20,
    gap: spacingX._5,
    borderColor: colors.lightGray,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  footerButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: normalizeY(50),
    backgroundColor: colors.primary,
    marginTop: spacingY._10,
    borderRadius: radius._15,
    borderCurve: 'continuous',
  },
  filters: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: spacingY._5,
  },
});

export default FilterModal;
