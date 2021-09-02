import React from 'react';
import './CheckListElement.css';
import Button from '../Button/Button';

const CheckListElement = ({check, clickHandler}) => {
  const onSubmission = resolution => {
    clickHandler(check.id, resolution);
  };

  const handleKeyDown = event => {
    if(event.key === '1') onSubmission(true);
    if(event.key === '2') onSubmission(false);
  }

  return (
    <div
      className={`container ${check.disabled ? 'disabled' : ''}`}
      aria-disabled={check.disabled}
      onKeyDown={handleKeyDown}
      tabIndex='0'
    >
      {check.description}
      <section>
        <Button children={'Yes'}
                onClick={() => onSubmission(true)}
                disabled={check.disabled}
                type="button"
                className={check.resolution === true ? 'selected' : 'deselected'}/>
        <Button children={'No'}
                onClick={() => onSubmission(false)}
                disabled={check.disabled}
                type="button"
                className={check.resolution === false ? 'selected' : 'deselected'}/>
      </section>
    </div>
  );
};

export default CheckListElement;
