import React, { useEffect, useState, useRef } from 'react';
import {
  Menu,
  Avatar,
  Layout,
  Typography,
  Row,
  Col,
  Button,
  Spin,
} from 'antd';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import sibdevLogo from '../../sibdev-logo.png';
import { mapDispatchToProps, mapStateToProps } from '../../store/maps';
import ModalWindowEdit from './ModalWindowEdit';
import { setRequest, logOut, checkUpdates } from './functions';

const { Header, Content } = Layout;

const Favorites = ({
  listOfFavorites,
  actionDeleteQueryInList,
  actionGetYoutubeStatistics,
  actionSetStatusRedirectFromFavorites,
  actionGetYoutubeData,
  actionGetQuery,
  setUserAutorisation,
  actionDeleteAllQueries,
  actionDeleteYoutubeQuery,
  actionDeleteYoutubeStatistics,
  actionSetFavoriteInfo,
}) => {
  const [isListOfFavoritesLoad, setListOfFavoritesLoad] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [indexForFavorite, setIndexForFavorite] = useState(null);
  const exitLoopLocalStorage = useRef(false);

  const [spinLoad, setSpinLoad] = useState(false);
  const history = useHistory();
  const modal = (
    <ModalWindowEdit
      setModalVisible={setModalVisible}
      isModalVisible={isModalVisible}
      indexForFavorite={indexForFavorite}
    />
  );

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('storage'));

    if (storage && !exitLoopLocalStorage) {
      storage.users[storage.index].favorites.map((element) => {
        actionSetFavoriteInfo(
          element.titleFavorite,
          element.nameFavorite,
          element.typeOfSort,
          element.countOfVideos,
        );
      });
      exitLoopLocalStorage.current = true;
    }

    if (listOfFavorites.length !== 0) {
      setListOfFavoritesLoad(true);
    }
  }, [listOfFavorites, actionSetFavoriteInfo]);

  const renderListOfFavorites = listOfFavorites.map((element, index) => {
    return (
      <Row
        className="Favorites-Row"
        gutter={20}
        key={String(index)}
        name="RowInList"
      >
        <Col span={15}>
          <Typography.Title className="Favorites-ListTitle" level={3}>
            {element.titleFavorite}
          </Typography.Title>
        </Col>

        <Col span={3}>
          <Typography.Title className="Favorites-Edit">
            <Button
              ghost
              onClick={() => {
                setRequest(
                  index,
                  actionGetYoutubeStatistics,
                  listOfFavorites,
                  actionSetStatusRedirectFromFavorites,
                  actionGetYoutubeData,
                  actionGetQuery,
                  history,
                  setSpinLoad,
                );
              }}
              style={{ color: '#2ecc71', borderColor: '#2ecc71' }}
            >
              Выполнить
            </Button>
          </Typography.Title>
        </Col>

        <Col span={3}>
          <Typography.Title className="Favorites-Edit">
            <Button
              type="primary"
              ghost
              onClick={() => {
                setIndexForFavorite(index);
                setModalVisible(true);
              }}
            >
              Изменить
            </Button>
          </Typography.Title>
        </Col>

        <Col span={3}>
          <Typography.Title className="Favorites-Delete">
            <Button
              type="danger"
              ghost
              onClick={() => {
                actionDeleteQueryInList(index);
                let storage = JSON.parse(localStorage.getItem('storage'));
                storage.users[storage.index].favorites = listOfFavorites;
                storage = JSON.stringify(storage);

                if (listOfFavorites.length === 0) {
                  localStorage.setItem('storage', storage);
                  return setListOfFavoritesLoad(false);
                }
                return localStorage.setItem('storage', storage);
              }}
            >
              Удалить
            </Button>
          </Typography.Title>
        </Col>
      </Row>
    );
  });

  return (
    <Spin spinning={spinLoad} tip="Загрузка..." size="large">
      <Header className="Search-Header">
        <Menu
          mode="horizontal"
          className="Search-Menu"
          theme="light"
          selectedKeys={['favorite']}
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
                actionDeleteYoutubeStatistics,
              );
            }}
          >
            Выйти
          </Menu.Item>
        </Menu>
      </Header>

      <Content className="Favorites-Container">
        <Typography.Title level={2} className="Favorites-Title">
          Избранное
        </Typography.Title>
        <Typography className="Favorite-ContainerList">
          {isListOfFavoritesLoad ? (
            renderListOfFavorites.reverse().map((element) => element)
          ) : (
            <Typography.Title level={3}>
              Похоже, у вас пока нет ничего в избранном :'(
              <br />
              Добавьте что-нибудь
              <br />
              <Button type="primary" ghost onClick={() => checkUpdates(actionSetFavoriteInfo)}>
                Обновить данные
              </Button>
            </Typography.Title>
          )}
          {isListOfFavoritesLoad && modal}
        </Typography>
      </Content>
    </Spin>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
