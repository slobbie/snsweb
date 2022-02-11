import React, { useState, useEffect } from 'react';
import Factory from '../components/Factory';
import Peed from '../components/peed';
import { dbService } from '../fireinst';

const Home = ({ userObj }) => {
  const [peeds, setPeeds] = useState([]);

  useEffect(() => {
    dbService.collection('peeds').onSnapshot((snapshot) => {
      const peedArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPeeds(peedArray);
    });
  }, []);

  return (
    <div>
      <Factory userObj={userObj} />
      <div>
        {peeds.map((peed) => {
          return (
            <Peed
              key={peed.id}
              peedObj={peed}
              isOwner={peed.creatorId === userObj.uid}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
