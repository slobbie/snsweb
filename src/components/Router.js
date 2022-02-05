import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from '../routers/Auth';
import Home from '../routers/Home';

const AppRouter = ({ isLoggedIn }) => {
  return (
    <>
      {isLoggedIn ? (
        <Routes>
          <Route exact path='/' element={<Home />} />
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
