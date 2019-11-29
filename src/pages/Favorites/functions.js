import axios from 'axios';
import store from '../../store/store';
import API from '../../users/api_key.json';

const setRequest = (
  indexForQuery,
  actionGetYoutubeStatistics,
  listOfFavorites,
  actionSetStatusRedirectFromFavorites,
  actionGetYoutubeData,
  actionGetQuery,
  history,
  setSpinLoad,
) => {
  const API_KEY = API.KEY;

  const idVideos = [];
  const statisticsVideos = [];
  setSpinLoad(true);
  axios
    .get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&order=${listOfFavorites[indexForQuery].typeOfSort}&maxResults=${listOfFavorites[indexForQuery].countOfVideos}&q=${listOfFavorites[indexForQuery].titleFavorite}&key=${API_KEY}`,
    )

    .then((res) => {
      actionGetYoutubeData(res.data);
      res.data.items.forEach((element) => {
        idVideos.push(element.id.videoId);
      });

      idVideos.forEach((element) => {
        axios
          .get(
            `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${element}&key=${API_KEY}`,
          )
          .then((result) => {
            statisticsVideos.push(result.data.items[0].statistics.viewCount);
          });
      });
      actionGetYoutubeStatistics(statisticsVideos);
      actionSetStatusRedirectFromFavorites(true);
      console.log(store.getState());
    });
  actionGetQuery(listOfFavorites[indexForQuery].titleFavorite);
  console.log(idVideos, statisticsVideos);
  console.log(store.getState());

  setTimeout(() => {
    history.push('./search');
    setSpinLoad(false);
  }, 1000);
};

const logOut = (
  setUserAutorisation,
  actionDeleteAllQueries,
  actionDeleteYoutubeQuery,
  actionDeleteYoutubeStatistics,
) => {
  let storage = JSON.parse(localStorage.getItem('storage'));
  delete storage.index;
  delete storage.token;
  storage = JSON.stringify(storage);
  localStorage.setItem('storage', storage);
  actionDeleteAllQueries();
  actionDeleteYoutubeQuery();
  actionDeleteYoutubeStatistics();
  setUserAutorisation(false);
};

const checkUpdates = (actionSetFavoriteInfo) => {
  const storage = JSON.parse(localStorage.getItem('storage'));

  if (storage.users[storage.index].favorites.length !== 0) {
    storage.users[storage.index].favorites.map((element) => actionSetFavoriteInfo(
      element.titleFavorite,
      element.nameFavorite,
      element.typeOfSort,
      element.countOfVideos,
    ));
  } else alert('Новых данных нет');
};

export { setRequest, logOut, checkUpdates };
