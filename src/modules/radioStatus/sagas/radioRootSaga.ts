import { takeLeading } from 'redux-saga/effects';
import { RADIO_STATUS_FETCH, RADIO_PLAYLIST_FETCH } from '../constants';
import { radioStatusFetchSaga } from './radioStatusFetchSaga';
import { radioPlaylistFetchSaga } from './radioPlaylistFetchSaga';

export function* rootRadioStatusSaga() {
    yield takeLeading(RADIO_STATUS_FETCH, radioStatusFetchSaga);
    yield takeLeading(RADIO_PLAYLIST_FETCH, radioPlaylistFetchSaga);
}
