import React from 'react';
import { useState } from 'react/cjs/react.development';
import { dbService } from '../fireinst';

const Home = () => {
  const [peed, setPeed] = async useState('');
  const onSubmit = (e) => {
    e.preventDefault();
    await dbService.collection('peeds').add({
      peed,
      createdAt: Date.now(),
    });
    setPeed('');
  };
  const onChange = (e) => {
    setPeed(e.target.value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={peed}
          onChange={onChange}
          type='text'
          placeholder="what's on your mind"
          maxLength={120}
        />
        <input type='submit' value='NewPeed' />
      </form>
    </div>
  );
};

export default Home;
