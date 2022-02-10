import { useState } from 'react';
import { dbService } from '../fireinst';

const Peed = ({ peedObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newPeed, setNewPeed] = useState(peedObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm('게시글을 지우겠습니까?');
    console.log(ok);
    if (ok) {
      await dbService.doc(`peeds/${peedObj.id}`).delete();
    }
  };
  const toggleEditing = () => {
    setEditing(!editing);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.doc(`peeds/${peedObj.id}`).update({
      text: newPeed,
    });
    setEditing(false);
  };

  const onChange = (e) => {
    setNewPeed(e.target.value);
  };
  return (
    <div key={peedObj.id}>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type='text'
              placeholder='새로운 글을 작성해주세요.'
              defaultValue={newPeed}
              required
              onChange={onChange}
            />
            <input type='submit' value='수정' />
          </form>
          <button onClick={toggleEditing}>취소</button>
        </>
      ) : (
        <>
          <h4>{peedObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Peed</button>
              <button onClick={toggleEditing}>Edit Peed</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Peed;
