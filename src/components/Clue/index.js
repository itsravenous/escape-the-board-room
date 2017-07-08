import React from 'react';
import Ticker from '../Ticker';
import './style.scss';

const Clue = ({clue}) => (
  <div className='clue'>
    <Ticker>{clue}</Ticker>
  </div>
);

Clue.propTypes = {
  clue: React.PropTypes.string,
};

export default Clue;
