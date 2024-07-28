// screens/FavoritesScreen.js
import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {image500} from '../api/moviedb';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {removeFavorite} from '../store/favoritesSlice';
import {useNavigation} from '@react-navigation/native';

const FavoritesScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const favorites = useSelector(state => state.favorites.favorites);

  const handleFavoriteToggle = movie => {
    dispatch(removeFavorite(movie));
  };

  const renderItem = ({item}) => (
    <View style={styles.movieCard}>
      <Image source={{uri: image500(item.poster_path)}} style={styles.image} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          paddingVertical: 5,
        }}>
        <Text style={styles.title}>{item.title}</Text>
        <MaterialIcon
          name={'favorite'}
          size={30}
          color={'#FF6F61'}
          onPress={() => handleFavoriteToggle(item)}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'row', gap: 20}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color={'#FF6F61'} />
        </TouchableOpacity>
        <Text style={styles.header}>Favorite Movies</Text>
      </View>
      {favorites ? (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      ) : (
        <Text style={styles.error}>No Favourite Movies Found...</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D1C26',
    padding: 20,
  },
  header: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  movieCard: {
    backgroundColor: '#35353D',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
  },
  title: {
    color: 'white',
    padding: 10,
    fontWeight: '500',
  },
  error: {
    fontSize: 24,
    alignSelf: 'center',
    color: '#FFFFFF',
  },
});

export default FavoritesScreen;
