import { useEffect, useState } from 'react';
import React from 'react-router-dom';
import AppRouter from './Router';
import { authService } from '../fireinst';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 유저의 로그인 유무 확인

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    }); // firebase 로 user 정보가 들어오면 useEffect  를 이용하여 유저 정보를 붙잡아준다.
  }, []);
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : 'Initializing...'}
      <footer>&copy; {new Date().getFullYear()} SNSWeb</footer>
    </>
  );
}

export default App;
