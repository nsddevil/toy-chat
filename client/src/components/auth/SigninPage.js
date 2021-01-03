import React from 'react';
import Signin from './Signin';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signin } from './authSlice';

function SigninPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { error } = useSelector((state) => state.auth);

  const onSignin = (form) => {
    dispatch(signin(form)).then((res) => {
      if (res) history.push('/');
    });
  };
  return <Signin onSignin={onSignin} error={error} />;
}

export default SigninPage;
