
# Setup and create app for RaspberryPi 3, pi Zero w stream video from camera to the server

## Tool for development Python
I recommend use Pycharm  really cool for you and for me. Just donwload community version it's free https://www.jetbrains.com/pycharm/download
## Setup Python
Python default is enabled on Macos or Raspberry Pi so we dont have to install. But if you are working on development enviroment and Python did not install , so let follow the documentation and install correctly. https://www.python.org/downloads/ 
## Setup Pip (Python Package Index) 
We use Pip to manage all python packages, so to setup Pip just follow this https://pip.pypa.io/en/latest/installing/ 
For Ubuntu or other linux i recommend follow this doc: https://packaging.python.org/guides/installing-using-linux-tools/#installing-pip-setuptools-wheel-with-linux-package-managers
```
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
```
```
sudo python get-pip.py
```
## Websocket client library
 autobahn-python is good library we will use for Websocket Client in this project https://github.com/crossbario/autobahn-python
 so our RaspberryPi will connect to websocket server as client. and we may control it to capture video/picture or stop any time. we can check it status is connected to internet or offline.
 
 ```
 pip install autobahn[twisted]
 ```
On MacOs if you are getting an error after running that command use following command

```
pip install autobahn[twisted] --user
```
