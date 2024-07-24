/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

import SegmentedControl from './src/components/SegmentedControl';

const options = ['Now Playing', 'Popular', 'Top Rated', 'Upcoming'];

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [selectedOption, setSelectedOption] = useState('Top Rated');

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#686D76'}}>
      <View style={styles.container}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <SegmentedControl
          options={options}
          selectedOption={selectedOption}
          onOptionPress={setSelectedOption}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  container: {
    flex: 1,
    backgroundColor: '#686D76',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
