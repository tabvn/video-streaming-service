
# RaspberryPi Zero W Setup

## Download Raspbian Stretch Lite latest version
https://downloads.raspberrypi.org/raspbian_lite_latest and extract to your local computer eg: /downloads/2017-11-29-raspbian-stretch-lite.img

## Download SD card formater 
download latest version of Sd-card formatter https://www.sdcard.org/downloads/formatter_4/
and then insert your micro sd card to your computer and format it.
## Install Raspbian to micro sdcard

run this command on your mac 
```
diskutil list
```

you should see something like this

```
/dev/disk2 (internal, physical):
#: TYPE NAME              SIZE    IDENTIFIER
0: FDisk_partition_scheme *7.9 GB disk2
1: Windows_FAT_32 boot    66.1 MB disk2s1
2: Linux                   7.9 GB disk2s2
```

in this case your sd card path is: ``` /dev/disk2 ```

Unmount the SD card

```
diskutil unmountDisk /dev/disk2
```

Copy the Image into micro sd card.

```
sudo dd bs=1m if=~/Downloads/2017-11-29-raspbian-stretch-lite.img of=/dev/disk2

```

```
ls -ls /Volumes/
```

Enable ssh
```
touch /Volumes/boot/ssh
```

Configure wifi info

```
touch /Volumes/boot/wpa_supplicant.conf
```

```
country=US
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1

network={
    ssid="NETWORK-NAME"
    psk="NETWORK-PASSWORD"
}

```
Eject Sd card

```
diskutil eject /dev/disk2
```

Insert sd card into your raspberry pi and plug the power source (usb -> micro usb)
and boot your Pi


after that your pi should connected to your home wifi but you need find the pi IP address via router 

and login over ssh

```
ssh pi@IP
```
default password is: raspberry

Update software on PI
```
sudo apt-get update -y
sudo apt-get upgrade -y
```
