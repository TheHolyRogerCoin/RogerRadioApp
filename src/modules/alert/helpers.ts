import { Alert } from './actions';

export const filterByReceiveTime = (
    alertsList: Alert[],
    max_age_ms: number
) => {
    const earliestTimestamp: number = Date.now() - 1000;
    return alertsList.filter(
        (alert) =>
            alert.receive_timestamp &&
            alert.receive_timestamp >
                earliestTimestamp -
                    (alert.display_ms
                        ? parseFloat(alert.display_ms)
                        : max_age_ms)
    );
};
