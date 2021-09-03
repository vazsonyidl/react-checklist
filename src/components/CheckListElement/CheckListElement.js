import React from 'react';
import './CheckListElement.css';
import Button from '../Button/Button';

const CheckListElement = ({check, clickHandler, setRef, onArrowDown, onArrowUp}) => {
  const onSubmission = resolution => {
    if (check?.disabled) return;
    clickHandler(check.id, resolution);
  };

  const handleKeyDown = event => {
    event.stopPropagation();
    switch (event?.key) {
      case '1':
        onSubmission(true);
        break;
      case '2':
        onSubmission(false);
        break;
      case 'ArrowDown':
        onArrowDown(check.id);
        break;
      case 'ArrowUp':
        onArrowUp(check.id);
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={`container ${check.disabled ? 'disabled' : ''}`}
      aria-disabled={check.disabled}
      onKeyDown={handleKeyDown}
      tabIndex="0"
      ref={element => setRef(element)}
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
