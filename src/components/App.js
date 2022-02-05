import { useState } from 'react';
import React from 'react-router-dom';
import AppRouter from './Router';
import { authService } from '../fireinst';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser); // 유저의 로그인 유무 확인
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; {new Date().getFullYear()} SNSWeb</footer>
    </>
  );
}

export default App;
