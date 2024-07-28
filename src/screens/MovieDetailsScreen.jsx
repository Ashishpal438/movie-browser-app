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
import {image500} from '../api/moviedb';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const MovieDetailsScreen = ({route}) => {
  const navigation = useNavigation();
  const {movie} = route.params;
  const width = useWindowDimensions().width;
  const isLiked = true;
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
              color={'yellow'}
              style={{position: 'absolute', top: 60, left: 20, zIndex: 1}}
            />
          </TouchableOpacity>
          <MaterialIcon
            name={isLiked ? 'favorite' : 'favorite-border'}
            size={30}
            color={'yellow'}
            style={{position: 'absolute', top: 60, right: 20, zIndex: 1}}
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
});

export default MovieDetailsScreen;
