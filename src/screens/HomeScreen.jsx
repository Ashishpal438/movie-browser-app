import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SegmentedControl from '../components/SegmentedControl';
import {
  fetchNowPlayingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
} from '../api/moviedb';
import MovieCard from '../components/MovieCard';

const options = ['Now Playing', 'Popular', 'Top Rated', 'Upcoming'];

const HomeScreen = () => {
  const [selectedOption, setSelectedOption] = useState('Top Rated');
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const getNowPlayingMovies = async () => {
    const data = await fetchNowPlayingMovies();
    setMovies(data.results);
  };

  const getPopularMovies = async () => {
    const data = await fetchPopularMovies();
    setMovies(data.results);
  };

  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    setMovies(data.results);
  };
  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    setMovies(data.results);
  };

  useEffect(() => {
    switch (selectedOption) {
      case 'Now Playing':
        getNowPlayingMovies();
        break;
      case 'Popular':
        getPopularMovies();
        break;
      case 'Top Rated':
        getTopRatedMovies();
        break;
      case 'Upcoming':
        getUpcomingMovies();
        break;
      default:
        console.log('Unknown Filter');
    }
  }, [selectedOption]);

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.container}>
      <SegmentedControl
        options={options}
        selectedOption={selectedOption}
        onOptionPress={setSelectedOption}
      />
      <TextInput
        style={styles.searchInput}
        placeholder="Search movies..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <View style={{marginBottom: 80}}>
        {filteredMovies.length > 0 ? (
          <FlatList
            data={filteredMovies}
            renderItem={({item}) => <MovieCard movie={item} />}
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={() => <View style={{height: 50}} />}
          />
        ) : (
          <Text style={styles.error}>Oops... something went wrong!</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#1D1C26',
    paddingTop: 20,
    paddingBottom: 30,
    gap: 20,
  },
  error: {
    fontSize: 24,
    alignSelf: 'center',
    color: '#FFFFFF',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: '90%',
    color: '#979695',
    backgroundColor: '#35353D',
  },
});

export default HomeScreen;
