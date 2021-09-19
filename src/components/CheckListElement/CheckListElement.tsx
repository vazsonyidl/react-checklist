import React from 'react';
import PropTypes from 'prop-types';

import './CheckListElement.scss';
import {ICheck} from '../../App';

interface ICheckListElementProps {
  check: ICheck;
  clickHandler: Function;
  setRef: Function;
  onArrowDown: Function;
  onArrowUp: Function;
}

const CheckListElement = ({check, clickHandler, setRef, onArrowDown, onArrowUp}: ICheckListElementProps) => {
  const onSubmission = (resolution: boolean) => {
    if (check?.disabled) return;
    clickHandler(check.id, resolution);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    event.stopPropagation();
    switch (event?.key) {
      case '1':
        onSubmission(true);
        break;
      case '2':
        onSubmission(false);
        break;
      case 'ArrowDown':
        onArrowDown(check?.id);
        break;
      case 'ArrowUp':
        onArrowUp(check?.id);
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
      tabIndex={0}
      ref={element => setRef(element)}
    >
      <span data-testid="check-description">{check.description}</span>
      <section className="radio-container" role="article">
        <input type="radio"
               id="radio-yes"
               value="true"
               checked={check.resolution === true}
               readOnly/>
        <label htmlFor="radio-yes" onClick={() => onSubmission(true)} data-testid="check-yes-label">Yes</label>
        <input type="radio"
               id="radio-no"
               value="no"
               checked={check.resolution === false}
               readOnly/>
        <label htmlFor="radio-no" onClick={() => onSubmission(false)} data-testid="check-no-label">No</label>
      </section>
    </div>
  );
};

CheckListElement.propTypes = {
  check: PropTypes.shape({
    id: PropTypes.string.isRequired,
    priority: PropTypes.number,
    description: PropTypes.string,
    resolution: PropTypes.bool,
    disabled: PropTypes.bool
  }).isRequired,
  setRef: PropTypes.func.isRequired
};

export default CheckListElement;
