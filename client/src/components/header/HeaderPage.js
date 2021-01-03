import React from 'react';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../auth/authSlice';

function HeaderPage() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
  };
  return <Header user={user} onLogout={onLogout} />;
}

export default HeaderPage;
