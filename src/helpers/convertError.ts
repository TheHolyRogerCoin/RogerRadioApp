const errors = {
    'authz.invalid_session': 'Unauthorized',
};

export const convertError = (value: string) => {
    if (errors.hasOwnProperty(value)) {
        // tslint:disable-next-line:no-any
        return (errors as any)[value];
    }
    return value;
};
