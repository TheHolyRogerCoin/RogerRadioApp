import { takeLeading } from 'redux-saga/effects';
import {
    RADIO_STATUS_FETCH,
    RADIO_PLAYLIST_FETCH,
    RADIO_SCHEDULE_FETCH,
} from '../constants';
import { radioStatusFetchSaga } from './radioStatusFetchSaga';
import { radioPlaylistFetchSaga } from './radioPlaylistFetchSaga';
import { radioScheduleListFetchSaga } from './radioScheduleListFetchSaga';

export function* rootRadioStatusSaga() {
    yield takeLeading(RADIO_STATUS_FETCH, radioStatusFetchSaga);
    yield takeLeading(RADIO_PLAYLIST_FETCH, radioPlaylistFetchSaga);
    yield takeLeading(RADIO_SCHEDULE_FETCH, radioScheduleListFetchSaga);
}
