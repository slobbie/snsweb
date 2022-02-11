import { useEffect, useState } from 'react';
import React from 'react-router-dom';
import AppRouter from './Router';
import { authService } from '../fireinst';

function App() {
  const [init, setInit] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false); // 유저의 로그인 유무 확인
  const [userObj, setUserobj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserobj({
          displayName: authService.currentUser.displayName
            ? authService.currentUser.displayName
            : 'user',
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserobj(null);
      }
      setInit(true);
    }); // firebase 로 user 정보가 들어오면 useEffect  를 이용하여 유저 정보를 붙잡아준다.
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserobj({
      displayName: authService.currentUser.displayName
        ? authService.currentUser.displayName
        : 'user',
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        'Initializing...'
      )}
    </>
  );
}

export default App;
