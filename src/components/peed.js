const Peed = ({ peedObj, isOwner }) => {
  return (
    <div key={peedObj.id}>
      <h4>{peedObj.text}</h4>
      {isOwner && (
        <>
          <button>Dekete Peed</button>
          <button>Edit Peed</button>
        </>
      )}
    </div>
  );
};

export default Peed;
