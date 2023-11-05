function ajax(url, requestMethod, requestBody) {

    const fetchData = {
        headers: {
            "Accept": 'application/json',
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': "*",
        },
        method: requestMethod,
    };

    if (requestBody) {
        fetchData.body = JSON.stringify(requestBody);
    }

    return fetch(url, fetchData).then((response) => { return response.json() })
}

export default ajax