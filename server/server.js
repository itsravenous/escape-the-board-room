const {spawn} = require('child_process');
const server = require('express')();

const config = require('../src/config.json');
const LOCK_ACTIONS = require('./actions.json');

// Generic lock completion handler
server.post('/lock-action/:id', (req, res, next) => {
  if(!LOCK_ACTIONS[req.params.id]) res.sendStatus(404);
  const commandAndOptions = LOCK_ACTIONS[req.params.id];
  const command = commandAndOptions.split(' ')[0];
  const options = commandAndOptions.split(' ').slice(1);
  spawn(command, options); // Error handling is for wimps
  res.sendStatus(200);
});

// Launcher (submarine-style - multiple concurrent presses needed to trigger ignition)
let IGNITION_ORIGINS = {}; // Yeah, this should be in redis or something
let HAVE_LAUNCHED = false;
const CODES = [
  202, // "202 Accepted" is the closest (though still not a great fit) I could get to "yeah, got your button press but not enough other people pressed their button". See https://httpstatuses.com/202
  200
];
const REQUIRED_IGNITIONS = config.LAUNCHER__REQUIRED_IGNITIONS || 2;
server.post('/launch', (req, res, next) => {
  console.log(req.headers.origin)
  IGNITION_ORIGINS[req.headers.origin] = true;
  setTimeout(() => {
    delete IGNITION_ORIGINS[req.headers.origin];
  }, 200)
  // Do we have enough ignitions to launch the rocket?
  const liftoff = (Object.keys(IGNITION_ORIGINS).length >= REQUIRED_IGNITIONS) | 0;
  res.sendStatus(CODES[liftoff]);
  console.log(IGNITION_ORIGINS)

  // Yes, let's launch!
  if (!HAVE_LAUNCHED && liftoff) {
    HAVE_LAUNCHED = true;
    spawn('mplayer', [`public/audio/${config.LAUNCHER__IGNITION_AUDIO}`]);
  }
});

const port = process.env.PORT || 4000;
server.listen(port);
