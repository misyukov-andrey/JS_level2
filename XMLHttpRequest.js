const fetch = (method, url) => {
    let xhr;

    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();

    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }


    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const images = JSON.parse(xhr.responseText);
        }
    }


    xhr.open(method, url, true);
    xhr.timeout = 15000;
    xhr.send();
}

const URL = 'https://jsonplaceholder.typicode.com/photos';
fetch('GET', URL);