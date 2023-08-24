import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alertPush } from '../modules/alert';
import { selectPayRequestData } from '../modules/tokenControl';

export const useAlertsPayRequest = () => {
    const requestPaymentMessage = useSelector(selectPayRequestData);
    const dispatch = useDispatch();

    useEffect(() => {
        if (requestPaymentMessage.length > 0) {
            dispatch(
                alertPush({
                    message: requestPaymentMessage,
                    type: requestPaymentMessage.includes('added') ? 'success' : 'error',
                    receive_timestamp: Date.now(),
                })
            );
        }
    }, [dispatch, requestPaymentMessage]);
};
