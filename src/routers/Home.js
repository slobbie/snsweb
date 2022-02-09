import React, { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import { dbService } from '../fireinst';

const Home = ({ userObj }) => {
  const [peed, setPeed] = useState('');
  const [peeds, setPeeds] = useState([]);

  useEffect(() => {
    // getPeeds();
    dbService.collection('peeds').onSnapshot((snapshot) => {
      const peedArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPeeds(peedArray);
    });
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.collection('peeds').add({
      text: peed,
      createdAt: Date.now(),
      createrId: userObj.uid,
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
      <div>
        {peeds.map((peed) => {
          return (
            <div key={peed.id}>
              <h4>{peed.text}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
