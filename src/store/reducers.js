import { combineReducers } from 'redux';
import favoritesReducer from './favorites/reducers';
import youtubeDataReducer from './youtube/reducers';

const allReducers = combineReducers({
  youtubeDataReducer,
  favoritesReducer,
});

export default allReducers;
