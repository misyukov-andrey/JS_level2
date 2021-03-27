var textBefore = document.getElementById('before-text');
var textAfter = document.getElementById('after-text');

var changeText = () => {
    let str = textBefore.textContent;
    console.log(str);

    textAfter.innerText = str.replace(/\B'|'\B/g, '"');
};