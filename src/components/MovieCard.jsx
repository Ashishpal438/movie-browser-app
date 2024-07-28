import {
  View,
  Text,
  Image,
  useWindowDimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {image500} from '../api/moviedb';

const MovieCard = ({movie}) => {
  const width = useWindowDimensions().width;
  return (
    <TouchableOpacity key={movie?.id} style={styles.movieCardContainer}>
      <Image
        source={{uri: image500(movie?.poster_path)}}
        style={{
          height: 600,
          width: width,
          resizeMode: 'contain',
        }}
      />
      <View style={{width: width - 20, gap: 10}}>
        <View style={styles.tagsContainer}>
          <View style={styles.tagWrapper}>
            <Text style={{color: 'white', fontWeight: 400}}>
              {movie?.release_date}
            </Text>
          </View>
          <View style={styles.tagWrapper}>
            <Text style={{color: 'white', fontWeight: 400}}>
              {movie?.adult ? 'Adult' : 'Kids'}
            </Text>
          </View>
          <View style={styles.tagWrapper}>
            <Text style={{color: 'white'}}>
              {movie?.vote_average?.toFixed(1)}
            </Text>
          </View>
        </View>
        <Text style={styles.title}>{movie?.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  movieCardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1D1C26',
  },
  tagsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    gap: 20,
  },
  tagWrapper: {
    backgroundColor: '#35353D',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 600,
    textAlign: 'center',
  },
});

export default MovieCard;
