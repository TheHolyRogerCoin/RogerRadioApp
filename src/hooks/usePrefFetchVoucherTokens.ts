import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getVoucherTokens } from '../helpers/preferences';
import { selectBalanceTimestampData } from '../modules/tokenControl';

interface Params {
    lastChange: number;
}

export const usePrefFetchVoucherTokens = (params: Params) => {
    const [voucherTokens, setVoucherTokens] = useState<string[] | undefined>(undefined);
    const [knownLastChange, setKnownLastChange] = useState<number>(params.lastChange);
    const [knownLastBalance, setKnownLastBalance] = useState<number | undefined>(params.lastChange);

    const userBalanceTimestamp = useSelector(selectBalanceTimestampData);

    useEffect(() => {
        if (!voucherTokens || knownLastChange != params.lastChange || knownLastBalance != userBalanceTimestamp) {
            setKnownLastChange(params.lastChange);
            setKnownLastBalance(userBalanceTimestamp);
            getVoucherTokens()
                .then((v) => {
                    setVoucherTokens(v);
                })
                .catch((err) => {
                    setVoucherTokens([]);
                });
        }
    }, [voucherTokens, params.lastChange, knownLastChange, knownLastBalance, userBalanceTimestamp]);

    return voucherTokens || [];
};
