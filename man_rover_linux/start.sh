#!/bin/bash

#RUN
echo '#######################################
echo 'Start rtkrcv '
echo '* display solution with : status 1'
echo '* close server with: shutdown'
echo '* all command : help'
echo '#######################################

## Run RTKlib service
if pgrep rtkrcv
 then pkill rtkrcv && rtkrcv -s -o ./run/rtkrcv_use.txt
 else rtkrcv -s -o ./run/rtkrcv_use.txt
fi
