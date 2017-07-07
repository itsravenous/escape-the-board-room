import React from 'react';
import propTypes from 'prop-types';
import Ticker from '../Ticker';
import './style.css';

export default class WordAssociation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      proposedAnswer: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const {value} = event.target;
    this.setState({
      proposedAnswer: value,
    });
    if(value === this.props.answer) {
      this.props.onComplete();
    }
  }

  render() {
    const {word} = this.props;

    return (
      <div className='word-association'>
        <Ticker>
          Let's play a game of word association...
        </Ticker>
        <span className='word-association__word'>{word}</span>
        <input
          type='text'
          maxLength='6'
          onChange={this.handleInputChange}
          value={this.state.proposedAnswer}
        />
      </div>
    );
  }
}

WordAssociation.defaultProps = {
  onComplete: Function.prototype,
};

WordAssociation.propTypes = {
  answer: propTypes.string,
  onComplete: propTypes.func,
  word: propTypes.string,
};
