import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';
import NoteDetection from './components/NoteDetection';
import config from './config';
import './index.css';

ReactDOM.render(
  (
    <BrowserRouter>
      <div>
        <Route exact path='/' component={() => (
          <Home
            evilTeamMember={config.EVIL_TEAM_MEMBER}
            heroTeamMember={config.HERO_TEAM_MEMBER}
            heroAdjective={config.INTRO__HERO_ADJECTIVE}
            productRelatedPhrase={config.INTRO__PRODUCT_RELATED_PHRASE}
          />
        )}/>
        <Route exact path='/notes' component={() => (
          <NoteDetection song='ABCDEF'/>
        )}/>
      </div>
    </BrowserRouter>
  )
, document.getElementById('root'));
