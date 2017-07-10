import React from 'react';
import './style.scss';

const Button = (props) => (
  <button
    {...props}
    className={props.className ? `button ${props.className}` : `button`}
  >
    {props.children}
  </button>
);

Button.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
};

export default Button;
