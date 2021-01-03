import React from 'react';
import { Link } from 'react-router-dom';

function Header({ user, onLogout }) {
  return (
    <header className="bg-blue-600 sticky">
      <div className="py-3 container mx-auto flex justify-between items-center">
        <div>
          <Link to="/" className="text-white font-bold text-2xl uppercase">
            Logo
          </Link>
        </div>
        <div className="text-white font-bold uppercase">
          {user ? (
            <>
              <span className="mr-2 text-xs">{user.email}</span>
              <Link to="/" onClick={onLogout}>
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link to="/signin" className="px-2">
                Signin
              </Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
