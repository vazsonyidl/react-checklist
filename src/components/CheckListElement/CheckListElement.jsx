import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button/Button';
import './CheckListElement.css';

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
      tabIndex="0"
      ref={element => setRef(element)}
    >
      <span data-testid="check-description">{check.description}</span>
      <section className="button-container">
        <Button onClick={onSubmission.bind(this, true)}
                disabled={check.disabled}
                type="button"
                className={check.resolution === true ? 'selected' : 'deselected'}
                data-testid="check-yes-btn">
          Yes
        </Button>
        <Button onClick={onSubmission.bind(this, false)}
                disabled={check.disabled}
                type="button"
                className={check.resolution === false ? 'selected' : 'deselected'}
                data-testid="check-no-btn">
          No
        </Button>
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
