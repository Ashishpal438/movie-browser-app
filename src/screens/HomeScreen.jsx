import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
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
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getNowPlayingMovies = async () => {
    setLoading(true);
    const data = await fetchNowPlayingMovies(page);
    setNowPlaying(prevMovies => [...prevMovies, ...data.results]);
    setLoading(false);
  };

  const getPopularMovies = async () => {
    setLoading(true);
    const data = await fetchPopularMovies(page);
    setPopular(prevMovies => [...prevMovies, ...data.results]);
    setLoading(false);
  };

  const getTopRatedMovies = async () => {
    setLoading(true);
    const data = await fetchTopRatedMovies(page);
    setTopRated(prevMovies => [...prevMovies, ...data.results]);
    setLoading(false);
  };
  const getUpcomingMovies = async () => {
    setLoading(true);
    const data = await fetchUpcomingMovies(page);
    setUpcoming(prevMovies => [...prevMovies, ...data.results]);
    setLoading(false);
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
  }, [selectedOption, page]);

  const currentMovieType = () => {
    switch (selectedOption) {
      case 'Now Playing':
        return nowPlaying;
        break;
      case 'Popular':
        return popular;
        break;
      case 'Top Rated':
        return topRated;
        break;
      case 'Upcoming':
        return upcoming;
        break;
      default:
        console.log('Unknown Filter');
    }
  };

  const filteredMovies = currentMovieType().filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const loadMoreMovies = () => {
    if (!loading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SegmentedControl
        options={options}
        selectedOption={selectedOption}
        onOptionPress={setSelectedOption}
      />
      <View style={styles.searchContainer}>
        <Icon
          name="search-outline"
          size={20}
          color="#888"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search movies..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#888"
        />
      </View>
      <View style={{marginBottom: 80}}>
        {filteredMovies.length > 0 ? (
          <FlatList
            data={filteredMovies}
            renderItem={({item}) => <MovieCard movie={item} />}
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={() => <View style={{height: 50}} />}
            onEndReached={loadMoreMovies}
            onEndReachedThreshold={0.5}
            ListFooterComponent={loading ? <Text>Loading...</Text> : null}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2D2C3C',
    borderRadius: 10,
    width: '90%',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    color: '#FFF',
    fontSize: 16,
    height: 20,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: '90%',
    color: '#979695',
  },
});

export default HomeScreen;
