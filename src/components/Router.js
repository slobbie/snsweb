import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from '../routers/Auth';
import Home from '../routers/Home';
import Profile from '../routers/Profile';

import Nav from './Nav';

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  return (
    <>
      {isLoggedIn && <Nav userObj={userObj} />}
      {isLoggedIn ? (
        <Routes>
          <Route exact path='/' element={<Home userObj={userObj} />} />
          <Route
            exact
            path='/profile'
            element={<Profile userObj={userObj} refreshUser={refreshUser} />}
          />
        </Routes>
      ) : (
        <Routes>
          <Route exact path='/' element={<Auth />} />
        </Routes>
      )}
    </>
  );
};
export default AppRouter;
