import {
  actionGetYoutubeData,
  actionGetQuery,
  actionGetYoutubeStatistics,
  actionDeleteYoutubeQuery,
  actionDeleteYoutubeStatistics,
} from './youtube/actions';
import {
  actionSetFavoriteInfo,
  actionDeleteQueryInList,
  actionEditQueryInList,
  actionSetStatusRedirectFromFavorites,
  actionDeleteAllQueries,
} from './favorites/actions';

const mapStateToProps = (state) => ({
  youtubeData: state.youtubeDataReducer.youtubeData,
  query: state.youtubeDataReducer.query,
  youtubeStatistics: state.youtubeDataReducer.youtubeStatistics,
  listOfFavorites: state.favoritesReducer.listOfFavorites,
  isRedirectedFromFavorites: state.favoritesReducer.isRedirectedFromFavorites,
});

const mapDispatchToProps = {
  actionGetYoutubeData,
  actionGetQuery,
  actionGetYoutubeStatistics,
  actionSetFavoriteInfo,
  actionDeleteQueryInList,
  actionEditQueryInList,
  actionSetStatusRedirectFromFavorites,
  actionDeleteAllQueries,
  actionDeleteYoutubeQuery,
  actionDeleteYoutubeStatistics,
};

export { mapStateToProps, mapDispatchToProps };
