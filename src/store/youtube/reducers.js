import {
  ACTION_YOUTUBE_DATA,
  ACTION_QUERY,
  ACTION_YOUTUBE_STATISTICS,
  ACTION_DELETE_YOUTUBE_QUERY,
  ACTION_DELETE_YOUTUBE_STATISTICS,
} from './actionTypes';

const initialState = {
  youtubeData: null,
  query: null,
  youtubeStatistics: [],
};

const youtubeDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_YOUTUBE_DATA:
      return { ...state, youtubeData: action.payload };
    case ACTION_QUERY:
      return { ...state, query: action.payload };
    case ACTION_YOUTUBE_STATISTICS:
      return { ...state, youtubeStatistics: action.payload };
    case ACTION_DELETE_YOUTUBE_QUERY:
      return { ...state, query: action.payload };
    case ACTION_DELETE_YOUTUBE_STATISTICS:
      return { ...state, youtubeStatistics: action.payload };
    default:
      return state;
  }
};

export default youtubeDataReducer;
