import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function WithAuth(Component, option, admin = null) {
  function Authenticate(props) {
    const { user } = useSelector((state) => state.auth);
    const history = useHistory();

    useEffect(() => {
      if (!user) {
        if (option === true) {
          history.push('/signin');
        }
      } else {
        if (option === false) {
          history.push('/');
        }
      }
    });
    return <Component {...props} />;
  }

  return Authenticate;
}
