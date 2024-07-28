import React from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';

type SegmentedControlProps = {
  options: string[];
  selectedOption: string;
  onOptionPress?: (option: string) => void;
};

const SegmentedControl = ({
  options,
  selectedOption,
  onOptionPress,
}: SegmentedControlProps) => {
  const {width: windowWidth} = useWindowDimensions();
  const internalPadding = 20;
  const segmentedControlWidth = windowWidth - 40;

  const itemWidth = (segmentedControlWidth - internalPadding) / options.length;

  const rStyle = useAnimatedStyle(() => {
    return {
      left: withTiming(
        itemWidth * options.indexOf(selectedOption) + internalPadding / 2,
      ),
    };
  }, [selectedOption, options, itemWidth]);
  return (
    <View
      style={[
        {
          width: windowWidth - 40,
          paddingHorizontal: internalPadding / 2,
        },
        styles.segmentContainer,
      ]}>
      <Animated.View
        style={[
          {
            width: itemWidth,
            left: itemWidth * options.indexOf(selectedOption),
          },
          styles.activeBox,
          rStyle,
        ]}
      />
      {options.map(option => {
        return (
          <TouchableOpacity
            onPress={() => {
              onOptionPress?.(option);
            }}
            key={option}
            style={[
              {
                width: itemWidth,
              },
              styles.labelContainer,
            ]}>
            <Text style={styles.label}>{option}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  segmentContainer: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#35353D',
    borderRadius: 20,
  },
  labelContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: 500,
    color: 'white',
  },
  activeBox: {
    height: '80%',
    position: 'absolute',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    elevation: 5,
    backgroundColor: '#F17906',
  },
});

export default SegmentedControl;
