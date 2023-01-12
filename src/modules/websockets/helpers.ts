export const generateSocketURI = (
    baseUrl: string,
    withAuth: boolean,
    api_key: string
) => {
    return `${baseUrl}/all_${withAuth ? 'private' : 'public'}_stats?${
        withAuth ? 'prv' : 'pub'
    }-api-key=${api_key}`;
};
