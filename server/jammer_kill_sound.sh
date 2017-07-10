while [ ! -f jammer_lock ]
do
  sleep 1
  echo "waiting for code to be entered"
done

# Fade volume out
sh fade_out.sh

# Nuke mplayer from orbit. TODO - use a PID
killall mplayer

# Restore volume
amixer -D pulse sset Master 100%
