export interface PendingRequestsFetchPayload {
    tokens: string[];
}

export interface PendingRequestsItem {
    TrkPretty: string;
    FromUser: string;
    Action: string;
    Date: string;
}

export interface PendingRequestsPayload {
    user_requests: PendingRequestsItem[];
    response?: string;
}

export interface BalanceFetchPayload {
    tokens: string[];
}

export interface BalancePayload {
    available_tokens: string[];
    available_balance: number;
    response?: string;
}

export interface PayRequestFetchPayload {
    tokens: string[];
    track_name?: string;
}

export interface PayRequestPayload {
    response: string;
    available_tokens: string[];
    available_balance: number;
}

export interface CancelRequestFetchPayload {
    tokens: string[];
    track_name?: string;
}

export interface CancelRequestPayload {
    response: string;
}

export interface CreateRequestFetchPayload {
    song_request_string: string;
    tokens: string[];
}

export interface CreateRequestPayload {
    response: string;
}
