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
    // headers = isNotEmpty(headers) ? headers.concat(defaultHeaders) : defaultHeaders

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

// export const refresh = () => {
//     if (localStorage.getItem(this.REFRESH_TOKEN_KEY)) {
//         sendRequest(RequestMethod.GET, this.AUTH_HEADER, null, this.REFRESH_URL)
//             .then(res => res.json())
//             .then(res => {
//                 if (!res.message) {
//                     localStorage.clear();
//                     localStorage.setItem(this.REFRESH_TOKEN_KEY, res.refreshToken);
//                     localStorage.setItem(this.ACCESS_TOKEN_KEY, res.accessToken);
//                     localStorage.setItem(this.USER_ID_KEY, res.userId);
//                     this.setState({isAuthenticated: true})
//                 } else {
//                     localStorage.clear();
//                 }
//             });
//     }
// };