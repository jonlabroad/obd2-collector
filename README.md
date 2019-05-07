# odb2-collector

## Dependences
### Raspberry Pi Zero W
* Change password of both root and pi users
* Set proper timezone
* raspi-config: change hostname, enable ssh, enable i2c
* apt-get update
* apt-get install python3-pip git
* pip3 install obd boto3 pytz
* pip3 install awscli
* sudo aws configure
* aws configure
* git clone https://github.com/jonlabroad/obd2-collector.git
* RTC Clock (used Adafruit PiRTC PCF8523)
* RTC Clock Setup: https://learn.adafruit.com/adding-a-real-time-clock-to-raspberry-pi/set-up-and-test-i2c

* sudo pip3 install --upgrade pyserial
* Pair to OBD
systemctl start hciuart
sudo bluetoothctl
help <-- see all the commands
show
power on
pairable on
agent on <-- used for persisting pairing code
default-agent
scan on <-- find OBDII and its MAC address
pair <mac_address> <-- enter pin 1234
trust <mac_address> <-- this will allow Pi to automatically pair with the device next time
scan off
quit
