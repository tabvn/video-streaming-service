from twisted.internet.protocol import ReconnectingClientFactory
from autobahn.twisted.websocket import WebSocketClientProtocol, WebSocketClientFactory
import json
import subprocess

server = "127.0.0.1"  # Server IP Address or domain eg: tabvn.com
port = 3001  # Server Port

streaming_process = None


class App:

    def __init__(self):

        print("App is initial.")

    def stop_camera(self):
        global streaming_process

        if streaming_process is not None:

            print("Begin stopping camera")

            streaming_process.kill()
            streaming_process = None
        else:

            print("No streaming process so we dont need to do stop")

    def show_camera(self, is_bool):

        global streaming_process

        print("We need to show camera {0}".format(is_bool))

        if is_bool:

            print(streaming_process)

            if streaming_process is None:
                ffmpeg_command = 'ffmpeg -re -i /Users/toan/Tutorials/stream/video.mkv -c:v libx264 -preset veryfast -maxrate 3000k -bufsize 6000k -pix_fmt yuv420p -g 50 -c:a aac -b:a 160k -ac 2 -ar 44100 -f flv rtmp://localhost/live/tabvn'

                streaming_process = subprocess.Popen(ffmpeg_command, shell=True, stdin=subprocess.PIPE)
                # streaming_process.communicate()
            else:

                print("Streaming is in process we are not accept more streaming.")
        else:

            self.stop_camera()

    def decode_message(self, payload):

        print("Got message need to decode {0}".format(payload))
        json_message = json.loads(payload)
        action = json_message.get('action')
        payload_value = json_message.get('payload')

        if action == 'stream':
            self.show_camera(payload_value)


class AppProtocol(WebSocketClientProtocol):

    def onConnect(self, response):
        print("Connected to the server")
        self.factory.resetDelay()

    def onOpen(self):
        print("Connection is open.")

        # when connection is open we send a test message the the server.

        def hello_server():
            message = {"action": "pi_online", "payload": {"id": "tabvn", "secret": "key"}}

            self.sendMessage(json.dumps(message))
            # self.sendMessage(u"Pi Here do you have any any job for me to do ?".encode('utf8'))

        hello_server()

    def onMessage(self, payload, isBinary):
        if (isBinary):
            print("Got Binary message {0} bytes".format(len(payload)))
        else:
            print("Got Text message from the server {0}".format(payload.decode('utf8')))
            # need to decode this message and know what is server command
            app = App()
            app.decode_message(payload)

    def onClose(self, wasClean, code, reason):
        print("Connect closed {0}".format(reason))


class AppFactory(WebSocketClientFactory, ReconnectingClientFactory):
    protocol = AppProtocol

    def clientConnectionFailed(self, connector, reason):
        print("Unable connect to the server {0}".format(reason))
        self.retry(connector)

    def clientConnectionLost(self, connector, reason):
        print("Lost connection and retrying... {0}".format(reason))
        self.retry(connector)


if __name__ == '__main__':
    import sys
    from twisted.python import log
    from twisted.internet import reactor

    log.startLogging(sys.stdout)
    factory = AppFactory(u"ws://{0}".format(server).format(":").format(port))
    reactor.connectTCP(server, port, factory)
    reactor.run()
