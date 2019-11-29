import {
  ACTION_FAVORITES_INFO,
  ACTION_DELETE_QUERY_IN_LIST,
  ACTION_EDIT_QUERY_IN_LIST,
  ACTION_SET_STATUS_REDIRECT_FROM_FAVORITES,
  ACTION_DELETE_ALL_QUERIES,
} from './actionTypes';

const initialState = {
  listOfFavorites: [],
  isRedirectedFromFavorites: false,
};

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_FAVORITES_INFO:
      return {
        ...state,
        listOfFavorites: [...state.listOfFavorites, action.payload]
      };

    case ACTION_DELETE_QUERY_IN_LIST:
      state.listOfFavorites.splice(action.payload, 1);
      return { ...state, listOfFavorites: [...state.listOfFavorites] };

    case ACTION_EDIT_QUERY_IN_LIST:
      state.listOfFavorites[action.payload.index] = {
        titleFavorite: action.payload.titleFavorite,
        nameFavorite: action.payload.nameFavorite,
        typeOfSort: action.payload.typeOfSort,
        countOfVideos: action.payload.countOfVideos,
      };
      return { ...state, listOfFavorites: [...state.listOfFavorites] };

    case ACTION_SET_STATUS_REDIRECT_FROM_FAVORITES:
      return { ...state, isRedirectedFromFavorites: action.payload };

    case ACTION_DELETE_ALL_QUERIES:
      return { ...state, listOfFavorites: action.payload };

    default:
      return state;
  }
}

export default favoritesReducer;