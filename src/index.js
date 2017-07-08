import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import {CSSTransitionGroup} from 'react-transition-group';
import Clue from './components/Clue';
import Home from './components/Home';
import NoteDetection from './components/NoteDetection';
import WordAssociation from './components/WordAssociation';
import config from './config';
import './index.css';

ReactDOM.render(
  (
    <BrowserRouter>
      <CSSTransitionGroup
        component='div'
        className='pages'
        transitionName='pages__page'
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
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
        <Route exact path='/word-association' component={(props) => (
          <WordAssociation
            answer='banana'
            onComplete={() => props.history.push('/clue/word-association')}
            word='☕'
          />
        )}/>

        <Route exact path='/clue/:id' component={(props) => (
          <Clue clue={config.CLUES[props.match.params.id]}/>
        )}/>
      </CSSTransitionGroup>
    </BrowserRouter>
  )
, document.getElementById('root'));
