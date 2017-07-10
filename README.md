# Escape the Board Room

A lot of the fun parts - the "physical" clues and games aren't included here - it's up to you to create those. As long as your ~~victims~~ players have a list of codes they need to arrive at, all will be well.

You'll need to copy `config.example.json` to `config.json` and populate it with your answers and office-specific values (such as the hero and villain. Don't be too mean!)

## Games
### The "jamming signal"
You'll need a device that can be discovered and powered off. Note its IP address on your chosen network and set it up with: `sh server/jammer.sh <ip> <audio_file>`. In another terminal (mplayer doesn't like to be backgrounded), run `sh server/jammer_kill_sound.sh`. Once the jamming device is powered off, your chosen audio file will play. It will stop once the first lock is solved. (These scripts are all very clunky, but they work).

### "Sing me a song"
It's up to you how the players determine the song you define as `NOTES__SONG`. I prefer a git-related task (a short hash can work well if you pick the right one!). Note that most browsers will require a HTTPS connection to use the microphone, so best to serve this from some form of hosting. You can deploy the project with [now](https://now.sh), as long as you temporarily remove `src/config.json` from `.gitignore`.

## Running it
To run the UI and actions server, run `npm start`. This is by no means production-grade stuff 🐉

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app); see their README for details on deployment, etc.
