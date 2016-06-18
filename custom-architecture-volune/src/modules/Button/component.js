import React, { PropTypes } from 'react';

const Button = ({
  value,
  onClick,
}) => (
  <button
    style={{ color: value ? 'green' : 'red' }}
    onClick={onClick}
  >Toggle</button>
);

Button.propTypes = {
  value: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

export default Button;

