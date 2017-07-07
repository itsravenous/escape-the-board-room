import React from 'react';
import './style.scss';

const Button = ({className, children}) => (
  <button
    {...props}
    className={className ? `button ${className}` : `button`}
  >
    {children}
  </button>
);

Button.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
};

export default Button;
