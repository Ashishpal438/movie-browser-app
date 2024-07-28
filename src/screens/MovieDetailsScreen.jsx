import {
  View,
  Text,
  Image,
  useWindowDimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {image500} from '../api/moviedb';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {addFavorite, removeFavorite} from '../store/favoritesSlice';

const MovieDetailsScreen = ({route}) => {
  const navigation = useNavigation();
  const {movie} = route.params;
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.favorites);
  const isFavorite = favorites.some(fav => fav.id === movie.id);
  const width = useWindowDimensions().width;

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFavorite(movie));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#1D1C26'}}>
      <View style={{position: 'relative'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 1000,
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name="arrow-back"
              size={30}
              color={'#FF6F61'}
              style={{position: 'absolute', top: 60, left: 20, zIndex: 1}}
            />
          </TouchableOpacity>
          <MaterialIcon
            name={isFavorite ? 'favorite' : 'favorite-border'}
            size={30}
            color={'#FF6F61'}
            style={{position: 'absolute', top: 60, right: 20, zIndex: 1}}
            onPress={handleFavoriteToggle}
          />
        </View>
        <Image
          source={{uri: image500(movie?.poster_path)}}
          style={{
            height: 650,
            width: width,
            resizeMode: 'cover',
            zIndex: 1,
          }}
        />
      </View>
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
        <View style={[styles.tagWrapper, {backgroundColor: 'yellow'}]}>
          <Text style={{color: 'black'}}>
            IMDB {movie?.vote_average?.toFixed(1)}
          </Text>
        </View>
      </View>
      <Text style={styles.title}>{movie?.title}</Text>
      <Text style={styles.overview}>{movie?.overview}</Text>
      <TouchableOpacity
        style={styles.favoritesButton}
        onPress={() => navigation.navigate('FavouritesScreen')}>
        <Text style={styles.buttonText}>Go to Favorites</Text>
      </TouchableOpacity>
    </ScrollView>
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
    alignItems: 'center',
    marginTop: 10,
    gap: 20,
    marginLeft: 20,
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
    textAlign: 'left',
    marginLeft: 20,
    marginVertical: 20,
  },
  overview: {
    color: 'white',
    fontSize: 16,
    fontWeight: 600,
    textAlign: 'left',
    marginLeft: 20,
  },
  favoritesButton: {
    backgroundColor: '#FF6F61',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MovieDetailsScreen;
