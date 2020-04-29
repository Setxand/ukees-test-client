export const logout = () => {
    localStorage.clear();
    window.location.reload();
}

export const SERVER_URL = 'http://localhost:8080';

export const RequestMethod = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    PATCH: "PATCH",
    DELETE: "DELETE"
};

export const ResponseStatus = {
    OK: 200,
    ACCEPTED: 202,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    INTERNAL_ERROR: 500
};
const headerDefault = {"Content-Type": "Application/json"};

export const sendRequest = (method, headers, body, url) => {
    const requestOptions = {
        method: method,
        headers: {"Content-Type": "Application/json", ...headers},
        body: body != null ? JSON.stringify(body) : null
    };

    return fetch(SERVER_URL + url, requestOptions);
};

export const isNotEmpty = (object) => {
    return object != null && typeof object !== 'undefined' && object.length > 0;
};

const REFRESH_URL = "/refresh-token";
const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_ID_KEY = "userId";
export const refresh = () => {
    if (localStorage.getItem(REFRESH_TOKEN_KEY)) {
        const AUTH_HEADER = {"Authorization": "Bearer " + localStorage.getItem(REFRESH_TOKEN_KEY)};
        return sendRequest(RequestMethod.GET, AUTH_HEADER, null, REFRESH_URL)
            .then(res => res.json())
            .then(res => {
                if (!res.message) {
                    localStorage.clear();
                    localStorage.setItem(REFRESH_TOKEN_KEY, res.refreshToken);
                    localStorage.setItem(ACCESS_TOKEN_KEY, res.accessToken);
                    localStorage.setItem(USER_ID_KEY, res.userId);
                    return true;
                } else {
                    logout();
                }
            });
    }
};