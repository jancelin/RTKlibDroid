#!/bin/bash

##install tools
sudo apt-get update
sudo apt-get install -y gcc git build-essential automake \
                        wget zip unzip nano psmisc procps
##install rtklib
if [ ! -f /usr/local/bin/str2str ]
      then 
          git clone -b demo5 https://github.com/rtklibexplorer/RTKLIB.git
          cd ./RTKLIB/app 
          make --directory=RTKLIB/app/rtkrcv/gcc
          make --directory=RTKLIB/app/rtkrcv/gcc install
          make clean
          cd
      else
          echo 'str2str already exist'
      fi
      
#get conf files
mkdir ./RTKroverConf
wget https://raw.githubusercontent.com/jancelin/RTKlibDroid/master/run/rtkrcv_use.txt -O ./RTKroverConf/rtkrcv_use.txt
wget https://raw.githubusercontent.com/jancelin/RTKlibDroid/master/run/F9P_use.cmd -O ./RTKroverConf/F9P_use.cmd

chmod +x ./RTKroverConf/start.sh


#RUN
echo '#######################################
echo 'You can run rtkrcv with this command'
echo './RTKroverConf/start.sh'
echo '#######################################