#!/bin/bash

##Run new rtklib service
if pgrep rtkrcv
 then pkill rtkrcv && rtkrcv -s -o /storage/internal/gnss/rtkrcv.txt
 else rtkrcv -s -o /storage/internal/gnss/rtkrcv.txt
fi
