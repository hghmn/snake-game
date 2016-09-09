
// TODO: add better error catching
export function xhr<T>(method, url, data: { [key: string]: string | number }, callback) {
    const request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (callback && request.readyState == 4 && request.status == 200) {
            // server MUST return JSON text
            callback(null, JSON.parse(request.responseText) as T);
        }
    };
    request.open(method, url);

    let formData;

    if (data) {
        formData = new FormData();

        Object.keys(data).forEach(key =>
            formData.append(key, data[key]));
    }

    request.send(formData || null);
}

export function get<T>(url, callback) {
    return xhr<T>('GET', url, null, callback);
}
export function post<T>(url, data, callback) {
    return xhr<T>('POST', url, data, callback);
}
