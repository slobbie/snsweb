import React from 'react';
import { useState } from 'react/cjs/react.development';

const Home = () => {
  const [peed, setPeed] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();
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
