import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss';

const Button = ({ children, ...rest }) => (
  <button className="Button" {...rest}>
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
