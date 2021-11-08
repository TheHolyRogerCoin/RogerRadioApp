export interface CommonError {
    code: number;
    message: string[];
}

export interface CommonState {
    error?: CommonError;
    loading?: boolean;
}
