#!/bin/bash
#-----------------------------------------------------------------------------
##installation of rtklib for android userland debian (test with ublox zed-F9P)
##ssh rover@192.168.43.1 -p2022   > smartphone wifi hotspot
##ssh rover@172.24.1.62 -p2022    > raspberry
### Password: 123456
#-----------------------------------------------------------------------------
##install tools
sudo apt-get update
sudo apt-get install -y gcc git build-essential automake \
                        wget zip unzip nano psmisc procps
##install rtklib
git clone -b demo5 https://github.com/rtklibexplorer/RTKLIB.git
cd ./RTKLIB/app 
make all 
make install
make clean
cd

#get RTKlibDroid
git clone -b master https://github.com/jancelin/RTKlibDroid.git
cp ./RTKlibDroid/start.sh ./
cp -r ./RTKlibDroid/run ./
cp -r ./RTKlibDroid/var ./
cp -r ./RTKlibDroid/source ./

find ./ -type f -iname "*.sh" -exec chmod +x {} \;
##symbolic link for execution at start of session (not possible at start with userland)
##ln -i start.sh /etc/profile.d/start.sh

#close session, stop session Userland (android), connect GNSS antenna F9P, start TCPUART, start rover Userland.
