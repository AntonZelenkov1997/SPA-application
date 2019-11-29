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
import { mapDispatchToProps, mapStateToProps } from '../../../store/maps';

const { Option } = Select;


const ModalWindow = ({
  isModalVisible,
  setModalVisible,
  query,
  actionSetFavoriteInfo,
  listOfFavorites,
  setButtonSaveClicked,
}) => {
  const [valueSlider, setValueSlider] = useState(25);
  const [typeOfSort, setTypeOfSort] = useState('relevance');
  const [exitLoop, setExitLoop] = useState(false);
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
  const sliderValue = (e) => setValueSlider(e);
  const inputValue = (e) => {
    const { value } = e.target;
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;

    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      setValueSlider(value);
    }
  };

  if (listOfFavorites.length !== 0 && !exitLoop) {
    let storage = JSON.parse(localStorage.getItem('storage'));
    storage.users[storage.index].favorites = listOfFavorites;
    storage = JSON.stringify(storage);
    localStorage.setItem('storage', storage);
    setExitLoop(true);
  }

  const clickButtonSaving = () => {
    const titleFavorite = document.querySelector('.Modal-InputFavorite').value;
    const titleFavoriteName = document.querySelector(
      '.Modal-InputFavoriteTitle',
    ).value;
    const valueFavoriteSlider = Number(
      document.querySelector('.Modal-InputFavoriteSliderValue').value,
    );

    if (!titleFavoriteName || !valueFavoriteSlider) {
      alert(
        'Ошибка! Не введено название видео, либо количество видео равно нулю',
      );
      return null;
    }

    actionSetFavoriteInfo(
      titleFavorite,
      titleFavoriteName,
      typeOfSort,
      valueFavoriteSlider,
    );
    setModalVisible(false);
    setButtonSaveClicked(true);
    setExitLoop(false);

    setTimeout(() => {
      setButtonSaveClicked(false);
    }, 2000);
  };

  return (
    <Modal
      wrapClassName="ModalWindow"
      onCancel={() => {
        setModalVisible(false);
      }}
      visible={isModalVisible}
      closable={false}
      footer={null}
    >
      <Typography className="Modal-Container">
        <Typography.Title className="Modal-Title">
          Сохранить запрос
        </Typography.Title>

        <Typography.Title className="Modal-TitleQuery">Запрос</Typography.Title>
        <Input className="Modal-InputFavorite" value={query} disabled />

        <Typography.Title className="Modal-TitleQueryName">
          <font color="red">* </font>
            Название
        </Typography.Title>
        <Input
          className="Modal-InputFavoriteTitle"
          placeholder="Укажите название"
        />

        <Typography.Title className="Modal-TitleQueryName">
          Сортировать по
        </Typography.Title>

        <Select
          className="Modal-InputFavoriteSort"
          placeholder="Без сортировки"
          size="large"
        >
          {sortItems.map((element) => (
            <Option
              onClick={(e) => {
                setTypeOfSort(e.key);
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
              value={valueSlider}
              defaultValue={24}
              onChange={sliderValue}
              max={50}
            />
          </Col>

          <Col span={6}>
            <Input
              className="Modal-InputFavoriteSliderValue"
              value={valueSlider}
              onChange={inputValue}
              maxLength={2}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalWindow);
