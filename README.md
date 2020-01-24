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

* [Install U-center](https://www.u-blox.com/en/product/u-center) (Windows seulement)

* [Update F9P firmware](https://drotek.gitbook.io/rtk-f9p-positioning-solutions/tutorials/updating-zed-f9p-firmware)

### configure ZED-F9P RTK device as a rover

* [download this file](https://raw.githubusercontent.com/jancelin/RTKlibDroid/master/U-Blox_ZED-F9P_rtkrover_5hz_pedestrian.txt)

* [inject file intoZED-F9P](https://drotek.gitbook.io/rtk-f9p-positioning-solutions/how-to-get-started/zed-f9p-rtk-configuration)

## Installation on android smartphone

* install Userland, ConnectBot and TCPUART from PlayStore

### Userland

#### Configure

* download [this debian + rtklib image](https://github.com/jancelin/RTKlibDroid/releases/download/RTKlibDroid_0.1/rtk-debian-rootfs.tar.gz) on internal storage.
* Start Userland
* Go to **"files system"** & click **+**
* fill in the gaps:
  * name file system: rtk
  * user nme: rover
  * password: 12345678
  * password vnc: 12345678
  * files system: Debian
* Click on **Show advanced options** and select the image you downloaded earlier.
* Save (top right)
* Go to **"Sessions"** & click **+**
* fill in the gaps:
  * session name: rtk
  * files system: rtk:Debian
  * service type: ssh
* Save (top right)

#### first Run for testing

* Go to **"Sessions"**
* One click on **rtk --> rtk**
* authorize ConnectBot to connect
* enter password **12345678**
* **stream server start** **rtkrcvver.demo5 b33b2 console (h:help)** should appear
* deconnect ConnectBot session & stop Userland

## Run with antenna connected

* Connect via usb the antenna to the smartphone (OTG adapter)
* Start TCPUART application:
  * click on **Connect**
  * modify port to 8080
  * click on **Start**
  * **DON'T CLOSE TCPUART**, come back on android home with your buton
* Start Userland
  * Go to **"Sessions"**
  * One click on **rtk --> rtk**
  * authorize ConnectBot to connect
  * enter password **12345678**
  * **stream server start** **rtkrcvver.demo5 b33b2 console (h:help)** should appear
  * enter **status 1** for read GNSS RTK status

## Change Base RTK name (https://centipede.fr) and modify rtkrcv parameters

rtkrcv.txt is here: Storage/Android/data/tech.ula/files/storage/gnss/

## Logs LLH

When a session start logs are writings in Storage/Android/data/tech.ula/files/storage/gnss/solution

## Mock location

You can use Lefebure apk to see status and use android mock location.
...
