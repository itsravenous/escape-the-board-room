while [ ! -f jammer_lock ]
do
  echo "waiting for code to be entered"
done

# Nuke mplayer from orbit. TODO - use a PID
killall mplayer

