#!/bin/bash

###############################
##
### RUN RTKRCV install command:
##
### curl -k https://raw.githubusercontent.com/jancelin/RTKlibDroid/master/man_rover_linux/install.sh | sudo sh
##
###############################

##install tools
sudo apt-get update
sudo apt-get install -y gcc git build-essential automake \
                        wget zip unzip nano psmisc procps
                        
#get conf files
mkdir ./RTKroverConf
wget https://raw.githubusercontent.com/jancelin/RTKlibDroid/master/run/rtkrcv_use.txt -O ./RTKroverConf/rtkrcv_use.txt
wget https://raw.githubusercontent.com/jancelin/RTKlibDroid/master/run/F9P_use.cmd -O ./RTKroverConf/F9P_use.cmd
wget https://raw.githubusercontent.com/jancelin/RTKlibDroid/master/man_rover_linux/start.sh -O ./RTKroverConf/start.sh
chmod +x ./RTKroverConf/start.sh

##install rtklib
if [ ! -f /usr/local/bin/str2str ]
      then 
          git clone -b demo5 https://github.com/rtklibexplorer/RTKLIB.git
          cd ./RTKLIB/app 
          make all
          make install
          make clean
          cd
      else
          echo 'str2str already exist'
      fi
      

#RUN
echo '#######################################'
echo ''
echo 'modify param'
echo '* modify RTKlib param: sudo nano ./RTKroverConf/rtkrcv_use.txt'
echo '* modify F9P param:    sudo nano ./RTKroverConf/F9P_use.cmd'
echo ''
echo 'You can run rtkrcv with this command:'
echo ''
echo './RTKroverConf/start.sh'
echo ''
echo '#######################################'
