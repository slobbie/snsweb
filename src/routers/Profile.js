import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../fireinst';

const Profile = () => {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate('/'); // logout 시에 메인으로 이동
  };
  return (
    <div>
      <span>Profile</span>
      <button onClick={onLogOutClick}>Log out</button>
    </div>
  );
};

export default Profile;
