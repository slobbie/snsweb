import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ userObj }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/profile'>{userObj.displayName}의profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
