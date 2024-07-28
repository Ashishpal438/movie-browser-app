import axios from 'axios';
import {apiKey} from '../constants';

//endpoints
const apiBaseUrl = 'https://api.themoviedb.org/3';

const nowPlayingMoviesEndpoint = `${apiBaseUrl}/movie/now_playing?language=en-US&page=1&api_key=${apiKey}`;
const popularMoviesEndpoint = `${apiBaseUrl}/movie/popular?language=en-US&page=1&api_key=${apiKey}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?language=en-US&page=1&api_key=${apiKey}`;
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?language=en-US&page=1&api_key=${apiKey}`;

export const image500 = path =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : null;

const apiCall = async (endpoint, params) => {
  const options = {
    method: 'GET',
    url: endpoint,
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchNowPlayingMovies = page => {
  return apiCall(nowPlayingMoviesEndpoint, {page: page});
};

export const fetchPopularMovies = page => {
  return apiCall(popularMoviesEndpoint);
};

export const fetchTopRatedMovies = page => {
  return apiCall(topRatedMoviesEndpoint);
};

export const fetchUpcomingMovies = page => {
  return apiCall(upcomingMoviesEndpoint);
};
