package com.theholyroger.WSClient;

import com.theholyroger.WSProcessor.WSProcessor;

import org.json.JSONObject;

import java.net.URI;

import dev.gustavoavila.websocketclient.WebSocketClient;


public class WSClient {
    URI wsUri;

    private WebSocketClient webSocketClient;
    private WSProcessor wsProcessor;

    public WSClient(
            String wsUrl,
            WSProcessor wsProc
    ) {
        try {
            wsUri = new URI(wsUrl);
        } catch (Exception e) {
            e.printStackTrace();
        }
        wsProcessor = wsProc;
    }

    public void connect() {
        createWebSocketClient();
    }

    public void close() {
        if (webSocketClient != null) {
            webSocketClient.close(2, 1000, null);
            webSocketClient = null;
        }
    }

    private void createWebSocketClient() {
        if (webSocketClient != null) return;

        webSocketClient = new WebSocketClient(wsUri) {
            @Override
            public void onTextReceived(String message) {
                try {
                    JSONObject jsonMsg = new JSONObject(message);
                    wsProcessor.processWsMsg(jsonMsg);
                } catch (Exception e) {
                    e.printStackTrace();
                    System.out.print("onTextReceived err processing: ");
                    System.out.println(message);
                }
            }

            @Override
            public void onOpen() {}

            @Override
            public void onBinaryReceived(byte[] data) {}

            @Override
            public void onPingReceived(byte[] data) {}

            @Override
            public void onPongReceived(byte[] data) {}

            @Override
            public void onException(Exception e) {
                System.out.println(e.getMessage());
            }

            @Override
            public void onCloseReceived(
                    int reason,
                    String description
            ) {}
        };

        webSocketClient.setConnectTimeout(10000);
        webSocketClient.setReadTimeout(60000);
        webSocketClient.addHeader("Origin", "https://rogerradio.app.local");
        webSocketClient.enableAutomaticReconnection(5000);
        webSocketClient.connect();
    }
}
