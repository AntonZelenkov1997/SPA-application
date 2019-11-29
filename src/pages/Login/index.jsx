import React, { useState } from 'react';
import {
  Form,
  Icon,
  Input,
  Button,
  Avatar,
  Typography,
} from 'antd';
import { connect } from 'react-redux';
import sibdevLogo from '../../sibdev-logo.png';
import user from '../../users';
import { mapStateToProps, mapDispatchToProps } from '../../store/maps';

const Login = ({ actionSetFavoriteInfo, setUserAutorisation }) => {
  const [typeEye, setTypeEye] = useState('eye-invisible');
  const [colorEye, setColorEye] = useState('rgba(0,0,0,.25)');
  const [colorUser, setColorUser] = useState('rgba(0,0,0,.25)');
  const [typeInput, setTypeInput] = useState('password');

  const changeTypeEye = () => {
    if (typeEye === 'eye-invisible') {
      setTypeEye('eye');
      setColorEye('#1390E5');
      setTypeInput('text');
    }
    else {
      setTypeEye('eye-invisible');
      setColorEye('#1390E5');    
      setTypeInput('password');
    } 
  }

  const submitData = () => {
    const generateToken = (length) => {
      const a = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('');
      const b = [];
      for (let i = 0; i < length; i++) {
        const j = (Math.random() * (a.length - 1)).toFixed(0);
        b[i] = a[j];
      }
      return b.join('');
    };

    const loginForm = document.querySelector('.ContainerLogin-InputLogin .ant-input').value;
    const passwordForm = document.querySelector('.ContainerLogin-InputPassword .ant-input').value;
    let countOfLoop = 0;
    user.map((element) => {
      if (element.login === loginForm && element.password === passwordForm) {
        let storage = JSON.parse(localStorage.getItem('storage'));
        if (storage) {
          let count = 0;
          storage.users.map((item, index) => {
            if (loginForm === item.login && passwordForm === item.password) {
              storage.index = index;
              storage.token = generateToken(32);
              if (item.favorites.length !== 0) {
                item.favorites.map((itemElement) => {
                  return actionSetFavoriteInfo(itemElement.titleFavorite, itemElement.nameFavorite, itemElement.typeOfSort, itemElement.countOfVideos);
                });
                storage = JSON.stringify(storage);
                localStorage.setItem('storage', storage);
                return setUserAutorisation(true);
              } else {
                storage = JSON.stringify(storage);
                localStorage.setItem('storage', storage);
                return setUserAutorisation(true);
              } 
            }
            else return ++count;
          });
          storage = JSON.parse(localStorage.getItem('storage'));
          if (count === storage.users.length) {
            storage.token = generateToken(32);
            storage.index = storage.users.length;

            storage.users.push(
              {
                login: loginForm,
                password: passwordForm,
                favorites: [],
              },
            );
            storage = JSON.stringify(storage);
            localStorage.setItem('storage', storage);
            return setUserAutorisation(true);
          }
        } else {
          storage = {
            users: [
              {
                login: loginForm,
                password: passwordForm,
                favorites: []
              },
            ],
            token: generateToken(32),
            index: 0,
          };

          storage = JSON.stringify(storage);
          localStorage.setItem('storage', storage);
          return setUserAutorisation(true);
        }
      } else return ++countOfLoop;   
    })

    if (countOfLoop === user.length) {
      alert('Введены некорректные данные. Попробуйте снова');
    }
    
  }

  return (
    <div className="WrappedContainerLogin">
      <Typography className="ContainerLogin">
        <Form onSubmit={submitData}>
          <Form.Item>
            <Avatar
              src={sibdevLogo}
              shape="square"
              size={88}
              className="ContainerLogin-Avatar"
            />
          </Form.Item>

          <Form.Item>
            <Typography>
              <Typography.Title className="ContainerLogin-Title">
                Вход
              </Typography.Title>
            </Typography>
          </Form.Item>

          <Form.Item>
            <Typography>
              <Typography.Title className="ContainerLogin-Label">
                Логин
                <Input
                  onFocus={() => {
                    setColorUser("#1390E5");
                  }}
                  onBlur={() => {
                    setColorUser("rgba(0,0,0,.25)");
                  }}
                  type="text"
                  className="ContainerLogin-InputLogin"
                  placeholder="Username"
                  suffix={
                    <Icon
                      onFocus={() => {
                        setColorUser("#1390E5");
                      }}
                      onBlur={() => {
                        setColorUser("rgba(0,0,0,.25)");
                      }}
                      type="user"
                      style={{ color: `${colorUser}`, fontSize: "24px" }}
                    />
                  }
                />
              </Typography.Title>
            </Typography>
          </Form.Item>

          <Form.Item>
            <Typography>
              <Typography.Title className="ContainerLogin-Label">
                Пароль
                <Input
                  onFocus={() => {
                    setColorEye("#1390E5");
                  }}
                  onBlur={() => {
                    setColorEye("rgba(0,0,0,.25)");
                  }}
                  type={typeInput}
                  className="ContainerLogin-InputPassword"
                  placeholder="Password"
                  suffix={
                    <Icon
                      onFocus={() => {
                        setColorEye("#1390E5");
                      }}
                      onBlur={() => {
                        setColorEye("rgba(0,0,0,.25)");
                      }}
                      className="ContainerLogin-IconLock"
                      type={typeEye}
                      style={{
                        color: `${colorEye}`,
                        cursor: "pointer",
                        outline: "none",
                        fontSize: "24px"
                      }}
                      onClick={changeTypeEye}
                    />
                  }
                />
              </Typography.Title>
            </Typography>
          </Form.Item>
        
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="ContainerLogin-Button"
            >
              Войти
            </Button>
          </Form.Item>
        </Form>
      </Typography>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
