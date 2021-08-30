import React from 'react';
import './CheckListElement.css';
import Button from '../Button/Button';

const CheckListElement = ({check}) => {
  const onSubmission = (resolution ,id) => {
    console.log(resolution, id);
  };
  return (
    <div className="container">
      {check.description}
      <section>
        <Button children={'Yes'} onClick={() => onSubmission(true, check.id)}/>
        <Button children={'No'} onClick={() => onSubmission(false, check.id)}/>
      </section>
    </div>
  );
};

export default CheckListElement;
