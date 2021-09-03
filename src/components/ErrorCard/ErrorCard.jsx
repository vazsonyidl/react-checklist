import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';

const ErrorCard = ({ error, buttonText, clickHandler }) => (
  <section>
    <div>{error}</div>
    <Button children={buttonText} onClick={clickHandler} />
  </section>
);

ErrorCard.propTypes = {
  buttonText: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default ErrorCard;
