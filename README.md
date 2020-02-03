**A solution to turn your Android smartphone into a GNSS RTK receiver with a Linux distribution and [RTKlib](http://www.rtklib.com/)**

* Trace logs llh
* Centimetric positioning on all your applications with geolocalisation
* All that can do RTKlib...

> Attention, it is necessary to have an RTK base close to the acquisition area. https://centipede.fr

## Materials

**Smartphone**

* a 64 bits smartphone / tablette.
* No need to root your device.
* USB OTG

**GNSS antenna for dual-frequency reception**

[Ublox F9P](https://store.drotek.com/sirius-rtk-gnss-rover-f9p)

## Android APK

**Required Android applications**

[Userland](https://play.google.com/store/apps/details?id=tech.ula&gl=FR) > UserLAnd is an open-source app which allows you to run several Linux distributions like Ubuntu,
Debian, and Kali.

[ConnectBot](https://play.google.com/store/apps/details?id=org.connectbot&hl=fr) > ConnectBot is a powerful open-source Secure Shell (SSH) client. It allows multiple simultaneous SSH sessions, tunneling, and copy/paste with other applications.

[TCPUART](https://play.google.com/store/apps/details?id=com.hardcodedjoy.tcpuart&gl=FR) > This application allows you to connect an UART (Serial) USB adapter to a TCP socket, to send and receive data. this application is necessary because Userland does not yet have access to the Android usb mount point.

**Optional Android applications**

[droidinfo](https://play.google.com/store/apps/details?id=com.inkwired.droidinfo&hl=fr) > check that his smartphone is 64-bits

[Markor](https://play.google.com/store/apps/details?id=net.gsantner.markor&gl=FR) > for modify parameters (rtkrcv.txt)

[Lefebure](https://play.google.com/store/apps/details?id=com.lefebure.ntripclient&gl=FR) > Make NMEA position data from an external receiver available to other Android applications.

## Configure antenna

### update the firmware

First of all it is necessary to update the [firmware](https://fr.wikipedia.org/wiki/Firmware) of your F9P module.

* [Install U-center](https://www.u-blox.com/en/product/u-center) (Windows or Linux Wine)

* [Update F9P firmware](https://drotek.gitbook.io/rtk-f9p-positioning-solutions/tutorials/updating-zed-f9p-firmware)

## Installation on android smartphone

* install Userland, ConnectBot and TCPUART from PlayStore

### Userland

#### Configure

* download [RTKlib-debian-rootfs_X_X.tar.gz](https://github.com/jancelin/RTKlibDroid/releases/download/RTKlibDroid_0.2/RTKlib-debian-rootfs_0_2.tar.gz) on Android internal storage.
* Start Userland
* Go to **"files system"** & click **+**
* fill in the gaps:
  * name file system: RTKlib
  * user nme: rover
  * password: 123456
  * password vnc: 123456
  * files system: Debian
* Click on **Show advanced options** and select the image you downloaded earlier.
* Save (top right)
* Go to **"Sessions"** & click **+**
* fill in the gaps:
  * session name: rover
  * files system: RTKlib:Debian
  * service type: ssh
* Save (top right)

![Userland](https://github.com/jancelin/RTKlibDroid/blob/master/pictures/userland.png)

## Run with antenna connected

* Connect via usb the antenna to the smartphone (OTG adapter)
* Start TCPUART application:
  * click on **Connect**
  * modify port to 8080
  * click on **Start**
  * **DON'T CLOSE TCPUART**, come back on android home with your buton
* Start Userland
  * Go to **"Sessions"**
  * One click on **rover --> RTKlib:Debian**
  * authorize ConnectBot to connect
  * enter password **123456**
* RTKlibDroid display

```
Paramétres actuels
------------------
Positionnement: kinematic
Mount Point: LIENSS
Rate: 1000 ms
Model: Pedestrian
Elevation: 10°
Input: tcpcli :@localhost:8080:
caster: caster.centipede.fr:2101 rtcm3
GPS : Oui
GAL : Oui
BDS : Oui
QZSS: Oui
GLO : Oui
------------------
1) Start Rover
2) Display Param
3) Modification
4) Quit
Choisir une action:
```
* if parameters ok then write **1** + enter
* write ```status 1``` + enter for display status 

## Change parameters 

```
Choisir une action: 3
1) RTK setting	      3) Caster Connexion   5) Return
2) Antenna Connexion  4) Satellites
```
### 1) RTK setting

```
Modifier:1
1) Positionning Mode  3) Elevation	    5) Return
2) Model	      4) Rate
Modifier:1

Change 1: kinematic to:

3 : static
2 : single
1 : kinematic

Modifier:2

Change Model: 3 : Pedestrian to:

0 : Portable
2 : Stationary
3 : Pedestrian
4 : Automotive
5 : Sea
6 : Airborne <1g
7 : Airborne <2g
8 : Airborne <3g

Modifier:3

Change elevation mask: 10° to:

Modifier:4

change Rate: 200 ms to:

```
### 2) Antenna Connexion

```
Modifier:2
1) RCV connection
2) Return
Modifier:1

Change receiver connection: tcpcli to:
2 : serial
1 : tcpcli
```

* default parameters tcp: ```:@localhost:8080:```
* Use serial if you want to run RTKlibDroid on PC, default parameters tcp : ```ttyACM0:115200:8:n:1:off```


### 3) Caster Connexion

```
Modifier:3
1) Caster Mount Point  3) Caster Port	      5) Caster Password
2) Caster Adresse      4) Caster Username     6) Return
Modifier:1

change Mount Point: LIENSS to:

Modifier:2

change caster adrss: caster.centipede.fr to:

Modifier:3

change caster port: 2101 to:

Modifier:4
!!!Paramètre non intégré!!!
change caster username: to:

Modifier:5
!!!Paramètre non intégré!!!
change caster password: to:

```

### 4) Satellites

```
Modifier:4
1) GPS
2) GAL
3) GLO
4) BDS
5) QZSS
6) Return
Modifier:1

GPS activ: Oui to:
Non : 0
Oui : 1

Modifier:2

GALILEO activ: Oui to:
Non : 0
Oui : 1

Modifier:3

GLONASS activ: Oui to:
Non : 0
Oui : 1

Modifier:4

BEIDOU activ: Oui to:
Non : 0
Oui : 1

Modifier:5

QZSS activ: Oui to:
Non : 0
Oui : 1
```

### Other parameters

You can edit conf files with nano, they are here:

./var/rtkrcv_var.txt
./var/F9P_var.cmd


## Logs LLH

When a session start logs are writings on a share directory available on android : ```Storage/Android/data/tech.ula/files/storage/gnss/solution```

## Mock location

You can use Lefebure apk to see status and use android mock location.
...
