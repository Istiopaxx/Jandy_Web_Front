import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Signin from '../../components/auth/Signin';
import { signin, initAuth, kakaoOauth, googleOauth } from '../../modules/auth';
import { check } from '../../modules/user';

const SigninContainer = (props) => {
  const { auth, error } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogin = ({ email, password }) => {
    dispatch(signin({ email, password }));
  };

  const onKakaoOauth = (access_token) => {
    dispatch(kakaoOauth(access_token));
  };

  const onGoogleOauth = (access_token) => {
    dispatch(googleOauth(access_token));
  };

  useEffect(() => {
    return () => {
      dispatch(initAuth());
    };
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setErrorMessage('아이디와 패스워드를 다시 입력해주세요');
    }
    if (auth) {
      dispatch(check());
    }
  }, [auth, error, dispatch]);

  useEffect(() => {
    if (user) {
      if (user.isAdmin) {
        alert('관리자님 환영합니다!');
        history.push('/admin');
      } else {
        alert(`${user.nickname}님 안녕하세요!`);
        history.push('/');
      }
    }
  }, [user, history]);

  return (
    <Signin
      onLogin={onLogin}
      errorMessage={errorMessage}
      onKakaoOauth={onKakaoOauth}
      onGoogleOauth={onGoogleOauth}
    />
  );
};

export default SigninContainer;
