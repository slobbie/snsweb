import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from '../routers/Auth';
import Home from '../routers/Home';
import Profile from '../routers/Profile';

import Nav from './Nav';

const AppRouter = ({ isLoggedIn }) => {
  return (
    <>
      {isLoggedIn && <Nav />}
      {isLoggedIn ? (
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/profile' element={<Profile />} />
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
