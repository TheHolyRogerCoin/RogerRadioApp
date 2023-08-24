import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alertPush } from '../modules/alert';
import { selectCreateRequestData } from '../modules/tokenControl';

export const useAlertsCreateRequest = () => {
    const requestCreationMessage = useSelector(selectCreateRequestData);
    const dispatch = useDispatch();

    useEffect(() => {
        if (requestCreationMessage.length > 0) {
            dispatch(
                alertPush({
                    message: requestCreationMessage,
                    type: requestCreationMessage.includes('distracted') ? 'error' : 'success',
                    receive_timestamp: Date.now(),
                })
            );
        }
    }, [dispatch, requestCreationMessage]);
};
