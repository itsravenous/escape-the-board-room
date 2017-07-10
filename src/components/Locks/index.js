import React, { Component } from 'react';
import {CSSTransitionGroup} from 'react-transition-group';
import propTypes from 'prop-types';
import './style.css';

class Locks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      complete: false,
      lockStates: props.codes.map(code => false),
      lockValues: props.codes.map(code => ''),
    };

    this.handleCodeEntry = this.handleCodeEntry.bind(this);
  }

  handleCodeEntry(code, lockNumber) {
    this.setState((state) => {
      const isCorrect = code.toLowerCase().trim() === this.props.codes[lockNumber].toLowerCase().trim();
      if(isCorrect) this.props.onCodeComplete(lockNumber);
      state.lockStates[lockNumber] = isCorrect;
      state.lockValues[lockNumber] = code;
      return state;
    }, () => {
      if(this.state.lockStates.filter(state => state).length === this.props.codes.length) {
        this.setState({ complete: true });
        this.props.onComplete();
      }
    });
  }

  render() {
    const { codes } = this.props;
    const { lockStates } = this.state;

    return (
      <ul className='locks'>
        {codes.map((code, i) => (
          <li
            className='locks__lock'
            key={i}
          >
            <input
              className={`locks__input locks__input--${lockStates[i]}`}
              disabled={this.state.lockStates[i]}
              onChange={(event) => this.handleCodeEntry(event.target.value, i)}
              type='text'
              value={this.state.lockValues[i]}
            />
          </li>
        ))}
      </ul>
    );
  }
}

Locks.defaultProps = {
  onCodeComplete: Function.prototype,
  onComplete: Function.prototype,
};

Locks.propTypes = {
  codes: propTypes.arrayOf(propTypes.string).isRequired,
  onCodeComplete: propTypes.func,
  onComplete: propTypes.func,
};

export default Locks;
