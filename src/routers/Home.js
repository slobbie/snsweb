import React, { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import { dbService } from '../fireinst';

const Home = () => {
  const [peed, setPeed] = useState('');
  const [peeds, setPeeds] = useState([]);

  const getPeeds = async () => {
    const dbPeeds = await dbService.collection('peeds').get();
    dbPeeds.forEach((document) => {
      const peedsObject = {
        ...document.data(),
        id: document.id,
      };
      setPeeds((prev) => [peedsObject, ...prev]);
    });
  };

  useEffect(() => {
    getPeeds();
  }, []);
  const onSubmit = async (e) => {
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

  console.log(peeds);
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
      <div>
        {peeds.map((peed) => {
          return (
            <div key={peed.id}>
              <h4>{peed.peed}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
