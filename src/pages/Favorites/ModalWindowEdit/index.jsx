import React, { useState } from 'react';
import {
  Modal,
  Input,
  Typography,
  Slider,
  Row,
  Col,
  Select,
  Button,
} from 'antd';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../../store/maps';

const { Option } = Select;

const ModalWindowEdit = ({
  isModalVisible,
  setModalVisible,
  actionEditQueryInList,
  listOfFavorites,
  indexForFavorite,
}) => {
  const [valueSlider, setValueSlider] = useState(null);
  const [exitLoop, setExitLoop] = useState(false);
  const [typeOfSortModal, setTypeOfSortModal] = useState('relevance');
  const sortItems = [
    {
      key: 'date',
      type: 'дате',
    },
    {
      key: 'rating',
      type: 'рейтингу',
    },
    {
      key: 'relevance',
      type: 'релевантности',
    },
    {
      key: 'title',
      type: 'алфавиту',
    },
    {
      key: 'videoCount',
      type: 'количеству контента',
    },
    {
      key: 'viewCount',
      type: 'количеству просмотров',
    }
  ];

  const inputValue = (e) => {
    if (Number.isInteger(e)) {
      return setValueSlider(e);
    } else {
      let { value } = e.target;
      const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;

      if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
        setValueSlider(value);
      }
    }
  };

  const clickButtonSaving = () => {
    const titleFavoriteModal = document.querySelector('.Modal-InputFavorite').value;
    const titleFavoriteNameModal = document.querySelector(
      '.Modal-InputFavoriteTitle',
    ).value;
    const valueFavoriteSlider = Number(
      document.querySelector('.Modal-InputFavoriteSliderValue').value,
    );

    if (!titleFavoriteNameModal || !valueFavoriteSlider) {
      alert(
        'Ошибка! Не введено название видео, либо количество видео равно нулю',
      );
      return null;
    }
    actionEditQueryInList(indexForFavorite,
      titleFavoriteModal,
      titleFavoriteNameModal,
      typeOfSortModal,
      valueFavoriteSlider);

    let storage = JSON.parse(localStorage.getItem('storage'));

    storage.users[storage.index].favorites[indexForFavorite].titleFavorite = titleFavoriteModal;
    storage.users[storage.index].favorites[indexForFavorite].nameFavorite = titleFavoriteNameModal;
    storage.users[storage.index].favorites[indexForFavorite].typeOfSort = typeOfSortModal;
    storage.users[storage.index].favorites[indexForFavorite].countOfVideos = valueFavoriteSlider;

    storage = JSON.stringify(storage);
    localStorage.setItem('storage', storage);

    setModalVisible(false);
  };

  if (!exitLoop && listOfFavorites.length !== 0 && indexForFavorite !== null && isModalVisible) {
    setValueSlider(listOfFavorites[indexForFavorite].countOfVideos);

    setExitLoop(true);
  }

  if (indexForFavorite === null) {
    return null;
  }

  return (
    <Modal
      wrapClassName="ModalWindow"
      visible={isModalVisible}
      closable={false}
      footer={null}
      maskClosable={false}
      destroyOnClose
    >
      <Typography className="Modal-Container">
        <Typography.Title className="Modal-Title">
          Сохранить запрос
        </Typography.Title>

        <Typography.Title className="Modal-TitleQuery">Запрос</Typography.Title>
        <Input
          className="Modal-InputFavorite"
          defaultValue={listOfFavorites[indexForFavorite].titleFavorite}
        />

        <Typography.Title className="Modal-TitleQueryName">
          <font color="red">* </font>
            Название
        </Typography.Title>
        <Input
          className="Modal-InputFavoriteTitle"
          placeholder="Укажите название"
          defaultValue={listOfFavorites[indexForFavorite].nameFavorite}
        />

        <Typography.Title className="Modal-TitleQueryName">
          Сортировать по
        </Typography.Title>

        <Select
          className="Modal-InputFavoriteSort"
          placeholder="По релевантности"
          size="large"
          defaultValue={listOfFavorites[indexForFavorite].typeOfSort}
        >
          {sortItems.map((element) => (
            <Option
              onClick={(e) => {
                setTypeOfSortModal(e.key);
              }}
              key={element.key}
            >
              {element.type}
            </Option>
          ))}
        </Select>

        <Typography.Title className="Modal-TitleQueryName">
          Максимальное количество
        </Typography.Title>

        <Row gutter={20} className="Modal-ContainerSlider">
          <Col span={18}>
            <Slider
              className="Modal-Slider"
              onChange={inputValue}
              max={50}
              value={!valueSlider ? listOfFavorites[indexForFavorite].countOfVideos : valueSlider}
            />
          </Col>

          <Col span={6}>
            <Input
              className="Modal-InputFavoriteSliderValue"
              onChange={inputValue}
              maxLength={2}
              value={!valueSlider ? listOfFavorites[indexForFavorite].countOfVideos : valueSlider}
            />
          </Col>
        </Row>

        <Row className="Modal-Footer" gutter={10}>
          <Col span={12}>
            <Button
              className="Modal-ButtonNotSaving"
              onClick={() => {
                setModalVisible(false);
              }}
            >
              Не сохранять
            </Button>
          </Col>

          <Col span={12}>
            <Button
              className="Modal-ButtonSaving"
              type="primary"
              onClick={clickButtonSaving}
            >
              Сохранить
            </Button>
          </Col>
        </Row>
      </Typography>
    </Modal>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalWindowEdit);
