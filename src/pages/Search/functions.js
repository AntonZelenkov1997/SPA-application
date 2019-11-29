import axios from 'axios';

const searchYouTube = (
  q,
  API_KEY,
  setLoadButton,
  actionGetYoutubeData,
  idVideos,
  statisticsVideos,
  actionGetYoutubeStatistics,
  actionGetQuery,
) => {
  if (q === '') {
    alert('Вы ввели пустой запрос');
    return false;
  }
  setLoadButton(true);

  axios
    .get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=12&q=${q}&key=${API_KEY}`,
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
          .then((res) => {
            statisticsVideos.push(res.data.items[0].statistics.viewCount);
          });
      });

      actionGetYoutubeStatistics(statisticsVideos);
      actionGetQuery(q);
    });
};

const showGridYoutube = (setGridYoutube) => {
  document.querySelector('.Icon-Grid').style.color = 'black';
  document.querySelector('.Icon-List').style.color = '#95a5a6';
  setGridYoutube(true);
  document.body.style.overflow = 'scroll';
};

const showListYoutube = (setGridYoutube) => {
  document.querySelector('.Icon-Grid').style.color = '#95a5a6';
  document.querySelector('.Icon-List').style.color = 'black';
  setGridYoutube(false);
  document.body.style.overflow = 'scroll';
};

const logOut = (
  setUserAutorisation,
  actionDeleteAllQueries,
  actionDeleteYoutubeQuery,
  actionDeleteYoutubeStatistics,
) => {
  let storage = JSON.parse(localStorage.getItem('storage'));
  delete storage.token;
  delete storage.index;
  storage = JSON.stringify(storage);
  localStorage.setItem('storage', storage);
  actionDeleteAllQueries();
  actionDeleteYoutubeQuery();
  actionDeleteYoutubeStatistics();
  setUserAutorisation(false);
};

export {
  searchYouTube,
  showGridYoutube,
  showListYoutube,
  logOut,
};
