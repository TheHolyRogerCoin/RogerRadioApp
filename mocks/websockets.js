const WebSocket = require('ws');

const isSubscribed = (streams, routingKey) => {
  for (const i in streams) {
    const stream = streams[i];
    if (routingKey.startsWith(stream) || routingKey.endsWith(stream)) {
      return true;
    }
  }
  return false;
}

const sendEvent = (ws, routingKey, event) => {
  try {
    const payload = {
      push_timestamp: 1234567890,
      payload: {}
    };
    payload.payload[routingKey] = event;
    ws.send(JSON.stringify(payload));
  } catch (error) {
    console.log(`failed to send websockets message: ${error}`);
  }
}

const nowPlayingMock = (ws) => () => {
  const statusData = {
    event_timestamp: 2234567890,
    Artwork: "",
    Artist: "Test Artist",
    Duration: "1200",
    Listeners: "15",
    TimeLeft: "60",
    Title: "Test Title",
    CurrentRotation: "Test Block",
    NextTrack: {
      Title: "Test Next Title",
      Artist: "Test Next Artist"
    },
  };
  sendEvent(ws, "now_playing", statusData);
};

const errorMock = (ws) => () => {
  const data = {
    event_timestamp: 2234567890,
    message: "Error: Some long error message goes in here",
    type: "error",
  };
  sendEvent(ws, "alert", data);
};

const successMock = (ws) => () => {
  const data = {
    event_timestamp: 2234567890,
    message: "Success: Some long success message goes in this fella",
    type: "success",
  };
  sendEvent(ws, "alert", data);
};

const snackbarMock = (ws) => () => {
  const data = {
    event_timestamp: 2234567890,
    message: "Test Message - Test Message - Test Message",
    type: "snackbar",
  };
  sendEvent(ws, "alert", data);
};

class WebsocketsMock {
  constructor(port) {
    this.port = port;
    this.start();
  }
  start() {
    this.wss = new WebSocket.Server({ port: this.port });
    const url = `ws://0.0.0.0:${this.port}`.green
    console.log(`WebsocketsMock: listening on ${url}`);
    const websockets = this;
    this.wss.on('connection', function connection(ws, request) {
      websockets.initConnection(ws, request);
      ws.on('message', (message) => websockets.onMessage(ws, message));
      ws.on('close', () => websockets.closeConnection(ws));
    });
  }
  close() {
    this.wss.close();
  }
  initConnection(ws, request) {
    ws.authenticated = true;
    ws.timers = [];
    ws.streams = [];
    ws.sequences = {};

    console.log(`WebsocketsMock: connection accepted, url: ${request.url}`);
    ws.timers.push(setInterval(nowPlayingMock(ws), 5000));
    ws.timers.push(setInterval(errorMock(ws), 5000));
    ws.timers.push(setInterval(successMock(ws), 7000));
    ws.timers.push(setInterval(snackbarMock(ws), 9000));
    }
    closeConnection() {
        console.log('WebsocketsMock: connection closed');
    }
    onMessage(ws, message) {
        if (message.length === 0)
            return;
        try {
            console.log('WebsocketsMock: received message: %s', message);
            var payload = JSON.parse(message);

      if ("jwt" in payload) {
        if (payload["jwt"] === "Bearer null") {
          ws.send(JSON.stringify({ "error": { "message": "Authentication failed." } }));
        } else {
          ws.send(JSON.stringify({ "success": { "message": "Authenticated." } }));
          ws.authenticated = true;
        }
      }
    } catch (err) {
      console.log(`WebsocketsMock: Something went wrong: ${err} (message: ${message})`);
    }

  }

}
module.exports = WebsocketsMock;
