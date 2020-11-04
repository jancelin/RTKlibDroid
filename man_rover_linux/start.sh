#!/bin/bash

## Run RTKlib service
if pgrep rtkrcv
 then pkill rtkrcv && rtkrcv -s -o ./run/rtkrcv_use.txt
 else rtkrcv -s -o ./run/rtkrcv_use.txt
fi
