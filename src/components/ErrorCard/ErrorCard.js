import React from 'react';
import Button from '../Button/Button';
import PropTypes from 'prop-types';

const ErrorCard = ({error, buttonText, clickHandler}) => {
  return (
    <section>
      <div>{error}</div>
      <Button children={buttonText} onClick={clickHandler}/>
    </section>
  );
};

ErrorCard.propTypes = {
  buttonText: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default ErrorCard;
