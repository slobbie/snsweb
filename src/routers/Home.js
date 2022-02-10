import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Peed from '../components/peed';
import { dbService, storageService } from '../fireinst';

const Home = ({ userObj }) => {
  const [peed, setPeed] = useState('');
  const [peeds, setPeeds] = useState([]);
  const [attachment, setAttachment] = useState('');

  useEffect(() => {
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
    let attachmentUrl = '';
    if (attachment !== '') {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, 'data_url');
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const peedObj = {
      text: peed,
      createdAt: Date.now(),
      createrId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection('peeds').add(peedObj);
    setPeed('');
    setAttachment('');
  };

  const onChange = (e) => {
    setPeed(e.target.value);
  };
  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearPhot = () => {
    setAttachment('');
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
        <input type='file' accept='image/*' onChange={onFileChange} />
        <input type='submit' value='NewPeed' />
        {attachment && (
          <div>
            <img src={attachment} width='50px' height='50px' />
            <button onClick={onClearPhot}>x</button>
          </div>
        )}
      </form>
      <div>
        {peeds.map((peed) => {
          return (
            <Peed
              key={peed.id}
              peedObj={peed}
              isOwner={peed.createrId === userObj.uid}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
