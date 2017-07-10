while true
do
  amixer -D pulse sset Master 2%-
  if [ "0" = $(amixer -D pulse sget Master | grep Left | grep -o '[0-9]*%' | sed s/%//) ]
  then
    break;
  fi
done
