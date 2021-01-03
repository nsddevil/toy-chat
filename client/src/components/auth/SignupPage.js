import React from 'react';
import Signup from './Signup';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from './authSlice';
import { useHistory } from 'react-router-dom';

function SignupPage() {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);
  const history = useHistory();

  const onSignup = (form) => {
    dispatch(signup(form)).then((res) => {
      if (res) {
        alert(res.data.message);
        history.push('/signin');
      }
    });
  };

  return <Signup onSignup={onSignup} error={error} />;
}

export default SignupPage;
