import {
  ACTION_YOUTUBE_DATA,
  ACTION_QUERY,
  ACTION_YOUTUBE_STATISTICS,
  ACTION_DELETE_YOUTUBE_QUERY,
  ACTION_DELETE_YOUTUBE_STATISTICS,
} from './actionTypes';

const actionGetYoutubeData = (value) => ({
  type: ACTION_YOUTUBE_DATA,
  payload: value,
});

const actionGetQuery = (value) => ({
  type: ACTION_QUERY,
  payload: value,
});

const actionGetYoutubeStatistics = (value) => ({
  type: ACTION_YOUTUBE_STATISTICS,
  payload: value,
});

const actionDeleteYoutubeQuery = () => ({
  type: ACTION_DELETE_YOUTUBE_QUERY,
  payload: null,
});

const actionDeleteYoutubeStatistics = () => ({
  type: ACTION_DELETE_YOUTUBE_STATISTICS,
  payload: [],
});

export {
  actionGetYoutubeData,
  actionGetQuery,
  actionGetYoutubeStatistics,
  actionDeleteYoutubeQuery,
  actionDeleteYoutubeStatistics,
};
