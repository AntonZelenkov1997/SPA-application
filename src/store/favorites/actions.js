import {
  ACTION_FAVORITES_INFO,
  ACTION_DELETE_QUERY_IN_LIST,
  ACTION_EDIT_QUERY_IN_LIST,
  ACTION_SET_STATUS_REDIRECT_FROM_FAVORITES,
  ACTION_DELETE_ALL_QUERIES,
} from './actionTypes';

const actionSetFavoriteInfo = (
  titleFavorite,
  nameFavorite,
  typeOfSort,
  countOfVideos,
) => ({
  type: ACTION_FAVORITES_INFO,
  payload: {
    titleFavorite,
    nameFavorite,
    typeOfSort,
    countOfVideos,
  },
});

const actionDeleteQueryInList = (value) => ({
  type: ACTION_DELETE_QUERY_IN_LIST,
  payload: value,
});

const actionEditQueryInList = (
  index,
  titleFavorite,
  nameFavorite,
  typeOfSort,
  countOfVideos,
) => ({
  type: ACTION_EDIT_QUERY_IN_LIST,
  payload: {
    index,
    titleFavorite,
    nameFavorite,
    typeOfSort,
    countOfVideos,
  },
});

const actionSetStatusRedirectFromFavorites = (value) => ({
  type: ACTION_SET_STATUS_REDIRECT_FROM_FAVORITES,
  payload: value,
});

const actionDeleteAllQueries = () => ({
  type: ACTION_DELETE_ALL_QUERIES,
  payload: [],
});

export {
  actionSetFavoriteInfo,
  actionDeleteQueryInList,
  actionEditQueryInList,
  actionSetStatusRedirectFromFavorites,
  actionDeleteAllQueries,
};
