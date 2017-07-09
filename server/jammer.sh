#!/bin/bash
# Stolen from https://github.com/itsravenous/treasure-hunt/blob/master/events/jammer.sh (original credit: https://github.com/sourcejedi)
target=$1
sound=$2
if [ -z "$target" ];
then
  echo "Please specify hostname/ip for jammer"
  exit 1
fi
if [ -z "$sound" ];
then
  echo "Please specify sound to play once unjammed"
  exit 1
fi

# Loop until jammer unreachable (i.e. powered off)
while true; do
    (ping -c2 "$target" | grep "bytes from") || break
done

mplayer -loop 0 $sound
