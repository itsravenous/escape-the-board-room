import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import {CSSTransitionGroup} from 'react-transition-group';
import QRCode from 'qrcode.react';
import Clue from './components/Clue';
import Home from './components/Home';
import Launcher from './components/Launcher';
import NoteDetection from './components/NoteDetection';
import WordAssociation from './components/WordAssociation';
import config from './config';
import './index.css';

const gotoClue = (history, clue) => history.push(`/clue/${clue}`);
const submitCode = (codeNumber) => {
  const request = new XMLHttpRequest();
  request.open('POST', `/lock-action/${codeNumber}`, true);
  request.setRequestHeader('Accept', 'text/plain');
  request.onload = Function.prototype;
  request.send();
};
const attemptIgnition = () => {
  console.log('attempt')
  const request = new XMLHttpRequest();
  request.open('POST', `/launch`, true);
  request.setRequestHeader('Accept', 'text/plain');
  request.onload = Function.prototype;
  request.send();
};

ReactDOM.render(
  (
    <BrowserRouter>
      <div>
        <Route exact path='/' component={({history}) => (
          <Home
            codes={config.CODES}
            codeSounds={config.CODE_SOUNDS}
            evilTeamMember={config.EVIL_TEAM_MEMBER}
            heroTeamMember={config.HERO_TEAM_MEMBER}
            heroAdjective={config.INTRO__HERO_ADJECTIVE}
            onCodeComplete={submitCode}
            onComplete={() => setTimeout(() => history.push('/launcher-code'), 1000)}
            productRelatedPhrase={config.INTRO__PRODUCT_RELATED_PHRASE}
          />
        )}/>
        <Route exact path='/notes' component={({history}) => (
          <NoteDetection
            song={config.NOTES__SONG}
            onSongComplete={() => gotoClue(history, 'note-detection')}
          />
        )}/>
        <Route exact path='/word-association' component={({history}) => (
          <WordAssociation
            answer='banana'
            onComplete={() => gotoClue(history, 'word-association')}
            word='☕'
          />
        )}/>

        <Route exact path='/launcher-code' component={({history}) => (
          <div className='qr-code'>
            <QRCode value={`${config.HOST}/launcher`}/>
          </div>
        )}/>

        <Route exact path='/launcher' component={({history}) => (
          <Launcher
            boosterCount={config.LAUNCHER__REQUIRED_IGNITIONS}
            evilTeamMember={config.EVIL_TEAM_MEMBER}
            onButtonPress={attemptIgnition}
            shinyTechnology={config.LAUNCHER__SHINY_TECHNOLOGY}
            stubbornTeamMember={config.LAUNCHER__STUBBORN_TEAM_MEMBER}
          />
        )}/>

        <Route exact path='/clue/:id' component={(props) => (
          <Clue clue={config.CLUES[props.match.params.id]}/>
        )}/>
      </div>
    </BrowserRouter>
  )
, document.getElementById('root'));
