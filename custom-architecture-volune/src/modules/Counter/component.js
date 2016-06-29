import React, { PropTypes } from 'react';

const Counter = ({
  value,
}) => (<div>Value: {value}</div>);

Counter.propTypes = {
  value: PropTypes.number.isRequired,
};

export default Counter;
