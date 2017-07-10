import React, { Component } from 'react';
import propTypes from 'prop-types';
import Locks from '../Locks';
import Pager from '../Pager';
import Ticker from '../Ticker';
import './style.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showNext: false,
    };

    this.handleCodeComplete = this.handleCodeComplete.bind(this);
    this.onPage = this.onPage.bind(this);
    this.onTickerFinish = this.onTickerFinish.bind(this);
    this.setPlayer = this.setPlayer.bind(this);
  }

  handleCodeComplete(codeNumber) {
    this.setState({
      music: `/audio/${this.props.codeSounds[codeNumber]}`,
    }, () => {
      this.player.play();
    });

    this.props.onCodeComplete(codeNumber);
  }

  onPage(pageNumber) {
    this.setState({
      showNext: false,
    });
  }

  onTickerFinish() {
    setTimeout(() => {
      this.setState({
        showNext: true,
      });
    }, 1000);
  }

  setPlayer(player) {
    this.player = player;
  }

  render() {
    const {
      codes,
      evilTeamMember,
      heroAdjective,
      heroTeamMember,
      onCodeComplete,
      onComplete,
      productRelatedPhrase,
    } = this.props;

    return (
      <section className='home'>
        <audio
          ref={this.setPlayer}
          src={this.state.music}
        />

        <Pager
          onPage={this.onPage}
          showNext={this.state.showNext}
        >
          <Ticker
            key='a'
            onFinish={this.onTickerFinish}
          >
            You wake up. Your memory is fuzzy. Your limbs ache and your mouth is filled with a taste that can only be described as... green. Through a haze of amnesia, a vision of {evilTeamMember} brandishing a whiteboard rag and yelling "{productRelatedPhrase}" emerges with disturbing clarity.
          </Ticker>

          <Ticker
            key='b'
            onFinish={this.onTickerFinish}
          >
            The room you are in seems familiar, but you can't quite place it. The walls feel cold, and a little damp.
          </Ticker>

          <Ticker
            key='c'
            onFinish={this.onTickerFinish}
          >
            The projector flickers to life. You sense there is a test ahead of you.
          </Ticker>

          <Ticker
            key='d'
            onFinish={this.onTickerFinish}
          >
            Another memory comes to you. The {heroAdjective} {heroTeamMember}, deftly dodging {evilTeamMember}'s chloroform cloth and disappearing down the corridor, yelling: "I'll transmit the first code as soon as I can, but you'll have to knock out the jamming device first!"
          </Ticker>

          <Ticker
            key='e'
            onFinish={this.onTickerFinish}
          >
            You turn and meet the eyes of your colleagues. You're going to have to work as a team to get out of this one.
          </Ticker>

          <Ticker
            key='f'
            onFinish={this.onTickerFinish}
          >
            It's that, or spend the rest of your days sizing JIRA tickets...
          </Ticker>

          <Locks
            codes={codes}
            onCodeComplete={this.handleCodeComplete}
            onComplete={onComplete}
          />
        </Pager>
      </section>
    );
  }
}

Home.propTypes = {
  codes: propTypes.arrayOf(propTypes.string),
  codeSounds: propTypes.arrayOf(propTypes.string),
  evilTeamMember: propTypes.string,
  heroAdjective: propTypes.string,
  heroTeamMember: propTypes.string,
  productRelatedPhrase: propTypes.string,
};

export default Home;
