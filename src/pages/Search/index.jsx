import React, { useState } from 'react';
import {
  Layout,
  Menu,
  Avatar,
  Typography,
  Input,
  Icon,
  Spin,
} from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import sibdevLogo from '../../sibdev-logo.png';
import API from '../../users/api_key.json';
import { mapStateToProps, mapDispatchToProps } from '../../store/maps';
import GridYoutube from './GridYoutube';
import ModalWindow from './ModalWindow';
import ListYoutube from './ListYoutube';
import HeartPopover from './HeartPopover';
import {
  searchYouTube,
  showGridYoutube,
  showListYoutube,
  logOut,
} from './functions';

const { Header, Content, Footer } = Layout;
const { Search } = Input;

const SearchPage = ({
  setUserAutorisation,
  youtubeData,
  youtubeStatistics,
  query,
  actionGetQuery,
  actionGetYoutubeData,
  actionGetYoutubeStatistics,
  listOfFavorites,
  actionDeleteAllQueries,
  actionDeleteYoutubeQuery,
  actionDeleteYoutubeStatistics,
}) => {
  const API_KEY = API.KEY;
  const [isLoadButton, setLoadButton] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isGridYoutube, setGridYoutube] = useState(true);
  const [isButtonSaveClicked, setButtonSaveClicked] = useState(false);
  const [isResultBody, setResultBody] = useState(false);
  const [exitLoop, setExitLoop] = useState(false);
  const idVideos = [];
  const statisticsVideos = [];

  if (query) {
    setTimeout(() => {
      setResultBody(true);
      setLoadButton(false);
    }, 1000);
  }

  if (youtubeStatistics.length !== 0 && !exitLoop) {
    setExitLoop(true);
    setResultBody(true);
  }

  return (
    <Spin spinning={isLoadButton} tip="Загрузка..." size="large">
      <Header className="Search-Header">
        <Menu
          mode="horizontal"
          className="Search-Menu"
          theme="light"
          selectedKeys={['search']}
        >
          <Menu.Item key="logo">
            <Link to="/">
              <Avatar src={sibdevLogo} className="Search-Logo" size={48} />
            </Link>
          </Menu.Item>

          <Menu.Item key="search">
            <Link to="/search">Поиск</Link>
          </Menu.Item>

          <Menu.Item key="favorite">
            <Link to="/favorites">Избранное</Link>
          </Menu.Item>

          <Menu.Item
            key="logout"
            className="Search-Logout"
            onClick={() => {
              logOut(
                setUserAutorisation,
                actionDeleteAllQueries,
                actionDeleteYoutubeQuery,
                setResultBody,
                actionDeleteYoutubeStatistics,
              );
            }}
          >
            Выйти
          </Menu.Item>
        </Menu>
      </Header>

      {isResultBody ? (
        <Content className="Search-Body">
          <Typography className="Search-ContainerResults">
            <Typography.Title className="Search-TitleResults">
              Поиск видео
            </Typography.Title>
            <Search
              className="Search-SearchBarQuery"
              placeholder="Что хотите посмотреть?"
              enterButton="Найти"
              size="large"
              loading={isLoadButton}
              defaultValue={query}
              onSearch={(q) => searchYouTube(
                q,
                API_KEY,
                setLoadButton,
                actionGetYoutubeData,
                idVideos,
                statisticsVideos,
                actionGetYoutubeStatistics,
                actionGetQuery,
                listOfFavorites,
              )}
              suffix={(
                <HeartPopover
                  visible={isButtonSaveClicked}
                  icon={(
                    <Icon
                      type="heart"
                      theme={isButtonSaveClicked && 'twoTone'}
                      onClick={() => {
                        setModalVisible(!isModalVisible);
                      }}
                      style={{
                        fontSize: '24px',
                        cursor: 'pointer',
                        color: '#1390E5',
                      }}
                    />
)}
                />
)}
            />

            <Typography.Title className="Search-TitleQuery">
              Видео по запросу
              <b>
                «
                {query}
                »
              </b>
              <Icon
                type="appstore"
                className="Icon-Grid"
                onClick={() => {
                  showGridYoutube(setGridYoutube);
                }}
              />
              <Icon
                type="unordered-list"
                className="Icon-List"
                onClick={() => {
                  showListYoutube(setGridYoutube);
                }}
              />
            </Typography.Title>

            {isGridYoutube ? (
              <GridYoutube
                youtubeData={youtubeData}
                youtubeStatistics={youtubeStatistics}
                isModalVisible={isModalVisible}
              />
            ) : (
              <ListYoutube
                youtubeData={youtubeData}
                youtubeStatistics={youtubeStatistics}
              />
            )}
          </Typography>
        </Content>
      ) : (
        <Content className="Search-Body">
          <Typography className="Search-Container">
            <Typography.Title>Поиск видео</Typography.Title>
            <Search
              className="Search-SearchBar"
              placeholder="Что хотите посмотреть?"
              enterButton="Найти"
              size="large"
              loading={isLoadButton}
              onSearch={(q) => searchYouTube(
                q,
                API_KEY,
                setLoadButton,
                actionGetYoutubeData,
                idVideos,
                statisticsVideos,
                actionGetYoutubeStatistics,
                actionGetQuery,
              )}
            />
          </Typography>
        </Content>
      )}
      <Footer className="Serch-Footer" />

      <ModalWindow
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        setButtonSaveClicked={setButtonSaveClicked}
      />
    </Spin>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
