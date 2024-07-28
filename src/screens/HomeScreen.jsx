import {FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import SegmentedControl from '../components/SegmentedControl';
import {fetchNowPlayingMovies} from '../api/moviedb';
import MovieCard from '../components/MovieCard';

const options = ['Now Playing', 'Popular', 'Top Rated', 'Upcoming'];

const HomeScreen = () => {
  const [selectedOption, setSelectedOption] = useState('Top Rated');
  const [movies, setMovies] = useState([]);

  const getNowPlayingMovies = async () => {
    const data = await fetchNowPlayingMovies();
    setMovies(data.results);
  };

  useEffect(() => {
    getNowPlayingMovies();
  }, []);

  return (
    <View style={styles.container}>
      <SegmentedControl
        options={options}
        selectedOption={selectedOption}
        onOptionPress={setSelectedOption}
      />
      <View style={{marginBottom: 80}}>
        {movies && (
          <FlatList
            data={movies}
            renderItem={({item}) => <MovieCard movie={item} />}
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={() => <View style={{height: 50}} />}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#1D1C26',
    paddingTop: 60,
    paddingBottom: 30,
    gap: 20,
  },
});

export default HomeScreen;
