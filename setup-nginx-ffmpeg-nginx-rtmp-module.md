This document is setup development enviroment on MacOs. For other Linux such at Ubuntu cloud server we will do later on Deployment task.


## Install Node.js

We need nodejs for development and run backend resful service , websocket server so to instlal Node.js just download this package from offical website https://nodejs.org/en/download/
## Install MongoDB 
This tutorial we are using Mongodb NoSQL database store document for our Node.js app. To instlal MongoDB just download https://www.mongodb.com/download-center?jmp=nav#community 
or use Home brew https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/
## Install Nginx + Nginx Rtmp Module (MacOs)
We use home brew to install package if you dont have Home brew just see documentation to install home brew on your MacOs https://brew.sh/ 

```
brew tap homebrew/nginx
```

```
brew options nginx-full

```

```
brew info nginx-full

```

```
brew install nginx-full --with-rtmp-module --with-debug

```

Nginx config file for default in ``` /usr/local/etc/nginx/nginx.conf ```
Start Nginx
```
nginx
```
Stop Nginx
```
nginx -s stop
```
Reload Nginx
```
nginx -s reload
```
