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

[TCPUART](https://play.google.com/store/apps/details?id=com.hardcodedjoy.tcpuart&gl=FR) > This application allows you to connect an UART (Serial) USB adapter to a TCP socket, to send and receive data. this application is necessary because Userland does not yet have access to the Android usb mount point.

[Lefebure](https://play.google.com/store/apps/details?id=com.lefebure.ntripclient&gl=FR) > Make NMEA position data from an external receiver available to other Android applications.

**Optional Android applications**

[droidinfo](https://play.google.com/store/apps/details?id=com.inkwired.droidinfo&hl=fr) > check that his smartphone is 64-bits

[Markor](https://play.google.com/store/apps/details?id=net.gsantner.markor&gl=FR) > for modify parameters (rtkrcv.txt)
