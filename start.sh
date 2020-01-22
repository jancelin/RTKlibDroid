#!/bin/bash

##Check if rtklib service run and kill them.
if pgrep str2str
 then pkill str2str
fi &&
##Run new rtklib service
/bin/str2str -in tcpcli://127.0.0.1:8080#ubx -out tcpsvr://:5015 &
if pgrep rtkrcv
 then pkill rtkrcv && rtkrcv -s -o /storage/internal/gnss/rtkrcv.txt
 else rtkrcv -s -o /storage/internal/gnss/rtkrcv.txt
fi
