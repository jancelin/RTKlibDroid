#!/bin/bash

#RUN
echo '#######################################'
echo 'Start rtkrcv '
echo '* display solution with : status 1'
echo '* close server with: shutdown'
echo '* all command : help'
echo '* modify RTKlib param: sudo nano ./RTKroverConf/rtkrcv_use.txt'
echo '* modify F9P param:    sudo nano ./RTKroverConf/F9P_use.cmd'
echo '#######################################'

## Run RTKlib service
if pgrep rtkrcv
 then pkill rtkrcv && rtkrcv -s -o ./RTKroverConf/rtkrcv_use.txt
 else rtkrcv -s -o ./RTKroverConf/rtkrcv_use.txt
fi
