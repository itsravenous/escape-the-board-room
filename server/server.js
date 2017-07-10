const {spawnSync} = require('child_process');
const server = require('express')();

const LOCK_ACTIONS = require('./actions.json');

server.post('/lock-action/:id', (req, res, next) => {
  if(!LOCK_ACTIONS[req.params.id]) res.sendStatus(404);
  const commandAndOptions = LOCK_ACTIONS[req.params.id];
  const command = commandAndOptions.split(' ')[0];
  const options = commandAndOptions.split(' ').slice(1);
  spawnSync(command, options);
  res.sendStatus(200);
});

const port = process.env.PORT || 4000;
server.listen(port);
