
# Add human detecting in camera and send warning message to user. 

my idea is white we live streaming video in camera to server and keep it for user watching as live and also saved a record if user ticked to "save video history" 
and also we read every frame in video and use OpenCV to decode in that frame if that is contain a human durring a time, or Dog, cat .... then send a warning to user (email, realtime on web, notification on mobile app, sms ...)

## Open Computer Vison library 
we do use https://github.com/opencv/opencv for this project, this is model already trained and so easy to use.
If you want to training your self model use Deep Machine Learning i highly recommend use Caffe https://github.com/BVLC/caffe  
this is really cool and speed framework for traning a model.

## Install OpenCV on MacOs

```
brew tap homebrew/science
brew install opencv
```
