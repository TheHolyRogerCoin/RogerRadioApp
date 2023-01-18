import { Channel, eventChannel, EventChannel } from 'redux-saga';
import {
    all,
    call,
    cancel,
    delay,
    fork,
    put,
    race,
    take,
} from 'redux-saga/effects';
import { radioApiKey, websocketsUrl } from '../../../api';
import { alertPush } from '../../alert';
import {
    radioPlaylistData,
    radioScheduleListData,
    radioRecentRequestsData,
    radioStatusData,
} from '../../radioStatus/actions';
import {
    WebsocketsConnectFetch,
    websocketsDisconnectData,
    websocketsDisconnectFetch,
} from '../actions';
import {
    WEBSOCKETS_CONNECT_DATA,
    WEBSOCKETS_CONNECT_FETCH,
    WEBSOCKETS_DIRECT_WRITE,
    WEBSOCKETS_DISCONNECT_DATA,
    WEBSOCKETS_DISCONNECT_FETCH,
} from '../constants';
import { generateSocketURI } from '../helpers';

interface WebsocketsBuffer {
    messages: object[];
}

const initWebsockets = (
    { withAuth }: WebsocketsConnectFetch['payload'],
    buffer: WebsocketsBuffer
): [EventChannel<any>, WebSocket] => {
    const baseUrl = `${websocketsUrl()}/ws_stats_${
        withAuth ? 'private' : 'public'
    }`;

    const ws = new WebSocket(
        generateSocketURI(baseUrl, withAuth, radioApiKey())
    );
    const channel = eventChannel((emitter) => {
        ws.onopen = () => {
            emitter({
                type: WEBSOCKETS_CONNECT_DATA,
            });
            while (buffer.messages.length > 0) {
                const message = buffer.messages.shift();
                ws.send(JSON.stringify(message));
            }
        };
        ws.onerror = (error) => {
            window.console.log(`WebSocket error ${error}`);
            window.console.dir(error);
        };
        ws.onclose = (event) => {
            channel.close();
        };
        ws.onmessage = ({ data }) => {
            // tslint:disable-next-line no-any
            let payload: {
                push_timestamp?: number;
                payload?: any;
            } = {};

            try {
                payload = JSON.parse(data as string);
            } catch (e: any) {
                window.console.error(`Error parsing : ${e.data}`);
            }

            if (payload.hasOwnProperty('payload')) {
                for (const routingKey in payload.payload) {
                    const event = payload.payload;

                    switch (routingKey) {
                        case 'now_playing':
                            emitter(radioStatusData(event));
                            return;

                        case 'playlist':
                            emitter(radioPlaylistData(event));
                            return;

                        case 'schedulelist':
                            emitter(radioScheduleListData(event));
                            return;

                        case 'recent_requests':
                            emitter(radioRecentRequestsData(event));
                            return;

                        case 'alert':
                            emitter(alertPush(event.alert));
                            return;

                        default:
                    }
                    window.console.log(
                        `Unhandeled websocket channel: ${routingKey}`
                    );
                }
            }
        };

        // unsubscribe function
        return () => {
            emitter(websocketsDisconnectData());
        };
    });

    return [channel, ws];
};

function* writer(
    socket: WebSocket,
    buffer: {
        messages: object[];
    }
) {
    while (true) {
        const data = yield take(WEBSOCKETS_DIRECT_WRITE);
        if (socket.readyState === socket.OPEN) {
            socket.send(JSON.stringify(data.payload));
        } else {
            buffer.messages.push(data.payload);
        }
    }
}

function* reader(channel) {
    while (true) {
        const action = yield take(channel);
        yield put(action);
    }
}

function* watchDisconnect(socket: WebSocket, channel: Channel<{}>) {
    yield take(WEBSOCKETS_DISCONNECT_FETCH);
    socket.close();
}

function* bindSocket(
    channel: Channel<{}>,
    socket: WebSocket,
    buffer: WebsocketsBuffer
) {
    return yield all([
        call(reader, channel),
        call(writer, socket, buffer),
        call(watchDisconnect, socket, channel),
    ]);
}

export function* websocketsSagas() {
    let initialized = false;
    let connectFetchPayload: WebsocketsConnectFetch['payload'] | undefined;
    const buffer: WebsocketsBuffer = {
        messages: [],
    };
    let pipes;

    while (true) {
        const { connectFetch, disconnectData } = yield race({
            connectFetch: take(WEBSOCKETS_CONNECT_FETCH),
            disconnectData: take(WEBSOCKETS_DISCONNECT_DATA),
        });

        if (connectFetch) {
            if (initialized) {
                yield put(websocketsDisconnectFetch());
                yield take(WEBSOCKETS_DISCONNECT_DATA);
            }
            connectFetchPayload = connectFetch.payload;
        }

        if (disconnectData) {
            yield delay(10000);
        }

        if (connectFetchPayload) {
            const [channel, socket] = yield call(
                initWebsockets,
                connectFetchPayload,
                buffer
            );
            initialized = true;
            if (pipes) {
                yield cancel(pipes);
            }
            pipes = yield fork(bindSocket, channel, socket, buffer);
        }
    }
}
