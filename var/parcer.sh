#!/usr/bin/env bash
#------------------
#./var/parcer.sh ./run/var.conf ./var/F9P_var.cmd ./run/F9P_use.cmd &&
#./var/parcer.sh ./run/var.conf ./var/rtkrcv_var.txt ./run/rtkrcv_use.txt
#------------------
# args
declare file_data=$1
declare file_input=$2
declare file_output=$3

source $file_data
eval "echo \"$(< $file_input)\"" > $file_output
