
# Setup and create app for RaspberryPi 3, pi Zero w stream video from camera to the server


## Setup Python
Python default is enabled on Macos or Raspberry Pi so we dont have to install. But if you are working on development enviroment and Python did not install , so let follow the documentation and install correctly. https://www.python.org/downloads/ 
## Setup Pip (Python Package Index) 
We use Pip to manage all python packages, so to setup Pip just follow this https://pip.pypa.io/en/latest/installing/ 
For Ubuntu or other linux i recommend follow this doc: https://packaging.python.org/guides/installing-using-linux-tools/#installing-pip-setuptools-wheel-with-linux-package-managers
```
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
```
```
python get-pip.py
```
## Websocket client lib https://github.com/crossbario/autobahn-python
