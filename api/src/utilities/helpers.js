/**
 * helpers.js
 * @author Francisco J. Medina <francisco@seedburysquare.com>
 * @copyright Seedbury Square, LLC. All Rights Reserved.
 * 
 * @version 2020-04-04 Initial Version 
 */

// export function clearElement(element) {
//     while (element.firstChild) {
//         element.removeChild(element.firstChild);
//     }
//     return element;
// }
// export function appendChildren(element, ...children) {
//     children.forEach(child => {
//         element.appendChild(child);
//     });
//     return element;
// }
// export function removeChildren(element, ...children) {
//     children.forEach(child => {
//         element.removeChild(child);
//     });
//     return element;
// }
// export function setElementClassList(element, ...classNames) {
//     classNames.forEach(className => element.classList.add(className));
//     return element;
// }
// export function setEventListener(element, listenerAction = () => { }, eventType = 'click') {
//     element.addEventListener(eventType, (e) => listenerAction(e));
//     return element;
// }
export function httpRequest(url, method = 'POST', params = false) {
    return new Promise(function (resolve, reject) {
        var formData = new FormData();
        formData.enctype = 'multipart/form-data';
        //Convert JS data to JSON and append to form
        formData.append('params', JSON.stringify(params));
        //xhr is XMLHttpRequest. Transfer data between a webbrowser and a webserver.
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                resolve(JSON.parse(this.responseText));
            } else if (this.status > 200) {
                reject(new Error('statusCode=' + this.statusCode));
            }
        };
        xhr.open(method, url, true);
        xhr.send(formData);
    });
}
// export function sortObjArray(property) {
//     var sortOrder = 1;
//     if (property[0] === "-") {
//         sortOrder = -1;
//         property = property.substr(1);
//     }
//     return function (a, b) {
//         var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
//         return result * sortOrder;
//     };
// }
// export function scaleFactorConverter(value, scaleFactor = 1) {
//     scaleFactor = scaleFactor / 10;
//     return value * scaleFactor;
// }
// export function getTemplateAreasColumns(numberOfColumns, columnName = 'columns') {
//     return `"${Array.apply(null, Array(numberOfColumns)).map(() => columnName).join(' ')}"`;
// }
// export function getTemplateAreasRows(numberOfRows, rowName = 'rows') {
//     return Array.apply(null, Array(numberOfRows)).map(() => '"' + rowName + '"').join(' ');
// }
// export function parseDate(date) {
//     return new Date(date.substring(0, 4) + '-' + date.substring(4, 6) + '-' + date.substring(6, 8));
// }
// export function getMagnitude(n) {
//     var order = Math.floor(Math.log(n) / Math.LN10
//         + 0.000000001); // because float math sucks like that
//     return Math.pow(10, order);
// }
// export function getDateNoTime(date = new Date()) {
//     return new Date(date.getFullYear().toString(), date.getMonth().toString(), date.getDate().toString());
// }
/**
 * helpers.js
 * @author Francisco J. Medina <francisco@seedburysquare.com>
 * @copyright Seedbury Square, LLC. All Rights Reserved.
 * 
 * @version 2019-09-18 Initial Version 
 */

import { keys, DEFAULT_ROUTE, MONTHS, SHORT_MONTHS, WEEKDAYS, SHORT_WEEKDAYS, ANIMATIONS, CUSTOMIZABLE_STYLES } from './constants.js';

export function proxify(setHandler = () => { }, getHandler = () => { }) {
    return new Proxy({}, {
        get: function (obj, prop) {
            getHandler(obj, prop);
            return prop in obj ? obj[prop] : undefined;
        },
        set: function (obj, prop, value) {
            obj[prop] = value;
            setHandler(obj, prop, value);
            return true;
        }
    }
    );
}
export function setCookie(cname, cvalue, exdays = 7) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}
export function getCookie(cname) {
    const name = cname + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}
export function pushIfNotInArray(array, item, property = false) {
    if (!array.find(arrayItem => property ? (arrayItem[property] === item[property]) : (JSON.stringify(arrayItem) == JSON.stringify(item)))) {
        array.push(item);
    }
    return array;
}
export function getStyles(element, property) {
    const computedStyles = getComputedStyle(element);
    if (computedStyles) {
        property = property.replace(/([A-Z])/g, '-$1').toLowerCase();
        return computedStyles.getPropertyValue(property);
    }
}
export function isOnline() {
    return navigator.onLine;
}
export function parseRequestURL() {
    return location.hash.toLowerCase() || DEFAULT_ROUTE;
}
export function getRoute(level = 0, route = false) {
    route = route ? route : parseRequestURL();
    return route.split('/').slice(level, level + 2).join('/');
}
export function getRouteFolder(level = 0, route = false) {
    route = route ? route : parseRequestURL();
    return '/' + route.split('/').slice(level, level + 1).join('/');
}
export function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    return element;
}
export function appendChildren(element, ...children) {
    children.forEach(child => {
        element.appendChild(child);
    });
    return element;
}
export function removeChildren(element, ...children) {
    children.forEach(child => {
        if (element.contains(child)) {
            element.removeChild(child);
        }
    });
    return element;
}
export function setElementClassList(element, ...classNames) {
    classNames.forEach(className => element.classList.add(className));
    return element;
}
export function setEventListener(element, listenerAction = () => { }, eventType = 'click') {
    element.addEventListener(eventType, (e) => listenerAction(e));
    return element;
}
export function toggleClass(element, className) {
    if (Array.isArray(element)) {
        element.forEach(el => {
            if (el.classList.contains(className)) {
                el.classList.remove(className);
            } else {
                el.classList.add(className);
            }
        })
    } else {
        if (element.classList.contains(className)) {
            element.classList.remove(className);
        } else {
            element.classList.add(className);
        }
    }
}
export function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}
export function md5(string) {
    function RotateLeft(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }
    function AddUnsigned(lX, lY) {
        let lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }
    function F(x, y, z) { return (x & y) | ((~x) & z); }
    function G(x, y, z) { return (x & z) | (y & (~z)); }
    function H(x, y, z) { return (x ^ y ^ z); }
    function I(x, y, z) { return (y ^ (x | (~z))); }
    function FF(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };
    function GG(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };
    function HH(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };
    function II(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };
    function ConvertToWordArray(string) {
        let lWordCount;
        const lMessageLength = string.length;
        const lNumberOfWords_temp1 = lMessageLength + 8;
        const lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        const lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        const lWordArray = Array(lNumberOfWords - 1);
        let lBytePosition = 0;
        let lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    };
    function WordToHex(lValue) {
        let WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
        }
        return WordToHexValue;
    };
    function Utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        let utftext = "";
        for (let n = 0; n < string.length; n++) {
            const c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    };
    let x = Array();
    let k, AA, BB, CC, DD, a, b, c, d;
    const S11 = 7, S12 = 12, S13 = 17, S14 = 22;
    const S21 = 5, S22 = 9, S23 = 14, S24 = 20;
    const S31 = 4, S32 = 11, S33 = 16, S34 = 23;
    const S41 = 6, S42 = 10, S43 = 15, S44 = 21;
    string = Utf8Encode(string);
    x = ConvertToWordArray(string);
    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
    for (k = 0; k < x.length; k += 16) {
        AA = a; BB = b; CC = c; DD = d;
        a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
        d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
        a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
        c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
        d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = AddUnsigned(a, AA);
        b = AddUnsigned(b, BB);
        c = AddUnsigned(c, CC);
        d = AddUnsigned(d, DD);
    }
    const temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);
    return temp.toLowerCase();
}
export function getTwoDigitNumber(num) {
    return ("0" + num).slice(-2);
}
export function addAutoResizeTextArea(textArea) {
    let offset = textArea.offsetHeight - textArea.clientHeight;
    textArea.addEventListener('input', (e) => {
        e.target.style.height = (e.target.scrollHeight + offset) / 10 + 'rem';
    });
}
export function addBreakLineToText(text) {
    return text.replace(/\n\r?/g, '<br />');
}
export function getChildIndex(child) {
    let parent = child.parentNode;
    let children = parent.children;
    let i = children.length - 1;
    for (; i >= 0; i--) {
        if (child == children[i]) {
            break;
        }
    }
    return i;
}
export function getBrowserSpecs() {
    let ua = navigator.userAgent, tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return { name: 'IE', version: (tem[1] || '') };
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if (tem != null) return { name: tem[1].replace('OPR', 'Opera'), version: tem[2] };
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null)
        M.splice(1, 1, tem[1]);
    return { name: M[0], version: M[1] };
}
export function getLocalIP() {
    return new Promise((resolve, reject) => {
        if (window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection) {
            window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
            const peerConnection = new RTCPeerConnection({ iceServers: [] });
            peerConnection.createDataChannel('');
            peerConnection.createOffer(peerConnection.setLocalDescription.bind(peerConnection), () => { });
            peerConnection.onicecandidate = (ice) => {
                peerConnection.onicecandidate = () => { };
                if (!ice || !ice.candidate || !ice.candidate.candidate) {
                    reject(false);
                } else { resolve(ice.candidate.address) };
            };
        }
        else {
            reject(false);
        }
    })

}
export function getGeolocation(enableHighAccuracy = true) {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation && (typeof (navigator.geolocation.getCurrentPosition) === 'function')) {
            navigator.geolocation.getCurrentPosition((position) => resolve({ coordinates: { latitude: position.coords.latitude, longitude: position.coords.longitude }, timestamp: position.timestamp }),
                (msg) => { console.log(msg); },
                { maximumAge: 10000, timeout: 5000, enableHighAccuracy });
        } else {
            reject(false);
        }
    });
}
export function drawMap(iFrame, lat, lon, zoom = 16) {
    iFrame.src = 'https://www.google.com/maps/embed/v1/view?zoom=' + zoom + '&center=' + lat + ',' + lon + '&key=' + keys.GOOGLE_MAPS;
}
export function areCookiesEnabled() {
    if (navigator.cookieEnabled == true) { return 'Enabled'; }
    else if (navigator.cookieEnabled == false) { return 'Disabled'; }
    else { return 'Unknown'; }
}
export function getBrowserDimensions() {
    if (typeof (window.innerWidth) != 'undefined') {
        return { width: window.innerWidth, height: window.innerHeight }
    }
    else {
        return { width: document.body.clientWidth, height: document.body.clientHeight }
    }
}
export function getComputerSpecs() {
    const osVersion = new RegExp(/[0-9]{1,3}_[0-9]{1,3}_[0-9]{1,3}/g).exec(navigator.appVersion)[0].replace(/_/g, '.');
    const appVersion = navigator.appVersion.split('(')[1].replace(/;/g, '').split(')')[0].split(' ');
    return {
        machine: appVersion[0],
        procesor: appVersion[1],
        os: appVersion[2] + ' ' + appVersion[3] + ' ' + appVersion[4],
        osVersion
    };
}
export function search(array, value, ...props) {
    const results = [], valueArray = value.trim().split(' ');
    array.forEach(arrayItem => {
        let hits = 0;
        props.forEach(prop => {
            valueArray.forEach(valueArrayItem => {
                if ((typeof arrayItem[prop].getMonth === 'function') ? isStringEqual(formatDate(arrayItem[prop]), valueArrayItem) : isStringEqual(arrayItem[prop], valueArrayItem)) hits++;
            });
            if (hits > 0) results.push({ result: arrayItem, hits });
        });
    });
    return results.sort(sortObjArray('-hits')).map(item => item.result);
}
export function isStringEqual(string1, string2) {
    return removeStringAccents(string1.toLowerCase()).includes(removeStringAccents(string2.toLowerCase()));
}
export function removeStringAccents(str) {
    const strIndividualLetters = str.split('');
    let newString = '';
    for (let i = 0, l = strIndividualLetters.length; i < l; i++) {
        switch (strIndividualLetters[i]) {
            case 'á':
                strIndividualLetters[i] = 'a';
                break;
            case 'é':
                strIndividualLetters[i] = 'e';
                break;
            case 'í':
                strIndividualLetters[i] = 'i';
                break;
            case 'ó':
                strIndividualLetters[i] = 'o';
                break;
            case 'ú':
                strIndividualLetters[i] = 'u';
                break;
            case 'Á':
                strIndividualLetters[i] = 'A';
                break;
            case 'É':
                strIndividualLetters[i] = 'E';
                break;
            case 'Í':
                strIndividualLetters[i] = 'I';
                break;
            case 'Ó':
                strIndividualLetters[i] = 'O';
                break;
            case 'Ú':
                strIndividualLetters[i] = 'U';
                break;
            default:
        }
        newString += strIndividualLetters[i];
    }
    return newString;
}
export function sortObjArray(property) {
    let sortOrder = 1;
    if (property[0] === '-') {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    };
}
export function parseQueryString(query) {
    const consts = query.split("&");
    const query_string = {};
    for (let i = 0; i < consts.length; i++) {
        const pair = consts[i].split("=");
        const key = decodeURIComponent(pair[0]);
        const value = decodeURIComponent(pair[1]);
        // If first entry with this name
        if (typeof query_string[key] === "undefined") {
            query_string[key] = decodeURIComponent(value);
            // If second entry with this name
        } else if (typeof query_string[key] === "string") {
            const arr = [query_string[key], decodeURIComponent(value)];
            query_string[key] = arr;
            // If third or later entry with this name
        } else {
            query_string[key].push(decodeURIComponent(value));
        }
        if (key === "") {
            return false;
        }
    }
    return query_string;
}
export function getHttpParams() {
    return parseQueryString(window.location.search.substr(1));
}
export function isObjectEmpty(obj) {
    for (const prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}
export function compareObjects(template, objToEval) {
    let isEqual = true;
    Object.keys(template).forEach(key => {
        if (template[key] && typeof template[key] == 'object' && objToEval[key] && typeof objToEval[key] == 'object') { compareObjects(template[key], objToEval[key]); }
        if (template[key] != objToEval[key]) { isEqual = false; }
    });
    return isEqual;
}
export function navigate(hash, params = false) {
    setAddressBarParams(params, hash);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
}
export function setAddressBarParams(params = false, hash = parseRequestURL()) {
    window.history.pushState({ urlPath: hash, params }, "", hash);
}
export function getAddressBarParams() {
    return window.history.state ? window.history.state.params : {};
}
export function validateFields(fields) {
    return (fields.map(field => (!field.value || field.value === '')).length > 0) ? false : true;
}
export function validateIsEmail(email) {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
export function validateIsEmpty(data) {
    if (data === null || data === "" || data === undefined) {
        return true;
    } else {
        return false;
    }
}
export async function getBase64EncodedFileObj(file) {
    const fileContent = await toBase64(file);
    return { fileContent, fileName: md5(fileContent) + '-' + file.size + '.' + getFileExtension(file.name) };
}
export function getBase64EncodedSource(base64EncodeFileContent = '', type = 'image', extension = '') {
    const types = { pdf: 'application/pdf', svg: 'image/svg+xml', image: `image/${extension}` };
    return 'data:' + types[type] + ';base64, ' + base64EncodeFileContent;
}
export function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',').pop());
        reader.onerror = error => reject(error);
    });
}
export function getFileExtension(fileName = '') {
    return fileName.split('.').pop();
}
export function getSelectedOptionId(dropDown) {
    try {
        return dropDown.options[dropDown.selectedIndex].id;
    } catch (e) {
        return false;
    }
}
// Task Handling //
export function splitTasksByDate(tasks) {
    let dates = [];
    tasks.forEach(task => {
        task.intervals.forEach(interval => {
            const intervalStartNoTime = getDateNoTime(new Date(interval.start)).getTime();
            const filteredTask = JSON.parse(JSON.stringify(task));
            filteredTask.intervals = filteredTask.intervals.filter(inter => getDateNoTime(new Date(inter.start)).getTime() == intervalStartNoTime).sort(sortObjArray('start'));
            const prevDate = dates.find(date => date.date == intervalStartNoTime);
            if (!prevDate) {
                dates.push({ date: intervalStartNoTime, tasks: [filteredTask] });
            } else {
                prevDate.tasks = pushIfNotInArray(prevDate.tasks, filteredTask);
            }
        });
    });
    dates = dates.map(date => {
        date.tasks = sortTasksByInterval(date.tasks, true);
        return date;
    });
    return dates;
}
export function getTaskDailyAverage(tasks) {
    return getAverageInterval(getIntervalsByDate(tasks));
}
export function sortTasksByInterval(tasks, start = true) {
    const sortedTasks = tasks.map(task => {
        task.needleValue = getHighestLowest(task.intervals.map(interval => setTimesToSameDay(interval[start ? 'start' : 'stop']).getTime()), !start);
        return task;
    }).sort(sortObjArray('needleValue'));
    return sortedTasks.map(task => {
        delete task.needleValue;
        return task;
    });
}
export function splitTasksByTeamMember(tasks) {
    let filteredTasks = [];
    tasks.forEach(task => {
        let teamMembers = [];
        task.intervals.forEach(interval => { teamMembers = pushIfNotInArray(teamMembers, interval.teamMember, 'id') });
        teamMembers.forEach(teamMember => {
            const newTask = JSON.parse(JSON.stringify(task));
            newTask.teamMember = teamMember;
            newTask.intervals = task.intervals.filter(interval => interval.teamMember.id == teamMember.id);
            filteredTasks.push(newTask);
        });
    });
    return filteredTasks;
}
export function getTasksIntervalTeamMembers(tasks) {
    let teamMembers = [];
    tasks.forEach(task => {
        task.intervals.forEach(interval => {
            teamMembers = pushIfNotInArray(teamMembers, interval.teamMember);
        });
    });
    return teamMembers;
}
export function getTasksProjects(tasks) {
    let projects = [];
    tasks.forEach(task => {
        projects = pushIfNotInArray(projects, task.project, 'id');
    });
    return projects;
}
export function getTasksTeamMembers(tasks) {
    let teamMembers = [];
    tasks.forEach(task => {
        task.teamMembers.forEach(teamMember => {
            teamMembers = pushIfNotInArray(teamMembers, teamMember, 'id');
        })
    });
    return teamMembers;
}
export function filterTasksbyTeamMember(tasks, teamMemberId) {
    let filterdTasks = [];
    tasks.forEach(task => {
        task.intervals.forEach(interval => {
            if (interval.teamMember.id == teamMemberId) {
                filterdTasks = pushIfNotInArray(filterdTasks, task);
            }
        });
    });
    return filterdTasks;
}
export function getTaskIntervalStartStopArray(tasks, start = true) {
    return splitTasksByDate(tasks).map(date => date.tasks).map(task => getHighestLowest(sortTasksByInterval(task, start)[start ? 0 : (sortTasksByInterval(task, false).length - 1)].intervals.map(interval => setTimesToSameDay(interval[start ? 'start' : 'stop'])), !start).getTime())
}
// END Task Handling //
// Interval Handling //
export function sumTaskIntervals(tasks, roundUpPercentage = false) {
    let totalTime = 0;
    tasks.forEach(task => {
        totalTime += roundUpPercentage ? roundUpHours(addIntervals(task.intervals), roundUpPercentage) : addIntervals(task.intervals);
    });
    return totalTime;
}
export function clearAllIntervals() {
    for (let i = 0, l = window.setInterval("", 9999); i < l; i++) {
        clearInterval(i);
    }
}
export function addIntervals(intervals = []) {
    return intervals.length > 0 ? intervals.reduce((total = 0, interval) => {
        if (interval.stop) {
            total += interval.stop - interval.start;
        } else {
            total += new Date().getTime() - interval.start;
        }
        return total;
    }, 0) : 0;
}
export function parseIntervalArray(intervalArray) {
    return intervalArray.map(interval => parseIntervalDates(interval));
}
export function parseIntervalDates(interval) {
    interval.start = new Date(interval.start);
    interval.stop = interval.stop ? new Date(interval.stop) : false;
    return interval;
}
export function computeTaskTotalChargeAmmount(tasks, roundUpPercentage = false) {
    let totalCahrgeAmmount = 0;
    tasks.forEach(task => {
        task.intervals.forEach(interval => {
            totalCahrgeAmmount += (roundUpPercentage ? roundUpHours(addIntervals([interval]), roundUpPercentage) : addIntervals([interval])) * task.rate;
        });
    });
    return totalCahrgeAmmount;
}
export function getAverageInterval(intervals) {
    return average(intervals.map(interval => addIntervals(interval)));
}
export function getIntervalsByDate(tasks) {
    return splitTasksByDate(tasks).map(date => date.tasks).map(tasksByDate => tasksByDate.map(taskByDate => taskByDate.intervals).flat());
}
// END Interval Handling //
export function setInputMaxlength(input, maxLength) {
    input.maxLength = maxLength;
    return input;
}
export function setInputMaxMinNumberValue(input, max, min = 0) {
    input.max = max;
    input.min = min;
    return input;
}
export function selectAllOnClick(input) {
    setEventListener(input, (e) => e.target.setSelectionRange(0, e.target.value.length));
    return input;
}
export function printContents(node) {
    const mywindow = window.open('', 'PRINT', 'height=400,width=600');
    mywindow.document.write('<html><head>');
    mywindow.document.write('<style>' + getFullStyleSheet(document.styleSheets[0].cssRules) + '</style>');
    mywindow.document.write('</head><body >');
    mywindow.document.write(node.innerHTML);
    mywindow.document.write('</body></html>');
    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/
    mywindow.print();
    mywindow.close();
}
export function newTabPDF(base64EncodeFileContent, title = '') {
    const mywindow = window.open('', '_blank', '');
    mywindow.document.write('<html><head><title>' + title + '</title>');
    mywindow.document.write('</head><body >');
    mywindow.document.write('<iframe style="width:100vw;height:100vh" src="' + getBase64EncodedSource(base64EncodeFileContent, 'pdf') + '"></iframe>');
    mywindow.document.write('</body></html>');
    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/
}
// Date Handling //
export function getDateFromDateInputValue(dateInputValue) {
    const dateElementArray = dateInputValue.split('-');
    return new Date([dateElementArray[1], dateElementArray[2], dateElementArray[0]].join('-'));
}
export function getDateNoTime(date = new Date()) {
    return new Date(date.getFullYear().toString(), date.getMonth().toString(), date.getDate().toString());
}
export function addDays(currentDay, daysToAdd = 1) {
    return new Date(new Date(currentDay).setDate(currentDay.getDate() + daysToAdd));
}
export function getDateOnLastOrFirstSecond(date = new Date(), onLastSecond = true) {
    return new Date(addDays(getDateNoTime(date), onLastSecond ? 1 : -1).setSeconds(getDateNoTime(date).getSeconds() + (onLastSecond ? - 1 : 1)));
}
export function changeMonth(day, months = 1) {
    return new Date(
        day.getFullYear().toString(),
        (day.getMonth() + months) > 12 ? 1 : (day.getMonth() + months),
        1
    );
}
export function changeYear(day, years = 1) {
    return new Date(
        (day.getFullYear() + years).toString(),
        day.getMonth(),
        day.getDate()
    );
}
export function getFirstDayOfMonth(date) {
    return new Date(date.getFullYear().toString(), date.getMonth().toString(), 1);
}
export function getLastDayOfMonth(date) {
    return getDateOnLastOrFirstSecond(addDays(changeMonth(date, 1), -1));
}
export function getTime(date, withSeconds = false) {
    const dateObj = getDateObjWithTime(date);
    return `${dateObj.hour}:${dateObj.minutes}${withSeconds ? `:${dateObj.seconds}` : ''} ${dateObj.meridiem}`;
}
export function getTimeWithSeconds(date) {
    const dateObj = getDateObjWithTime(date);
    return `${dateObj.hour}:${dateObj.minutes}:${dateObj.seconds}`;
}
export function getFullDate(date) {
    const dateObj = getDateObjWithTime(date);
    return `${dateObj.hour}:${dateObj.minutes}:${dateObj.seconds}${dateObj.meridiem}` + ' ' + `${dateObj.dayOfWeek}` + ' ' + `${dateObj.dayOfMonth}` + ' of ' + `${dateObj.month}` + ', ' + `${dateObj.year}`;
}
export function formatDate(date, formatIndex = 0) {
    if (isNaN(date.getDate())) {
        return 'N/A';
    }
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const formats = [
        MONTHS[monthIndex] + ' ' + day + ', ' + year,
        `${day}-${MONTHS[monthIndex]}-${year}`,
        `${day}-${MONTHS[monthIndex]}-${year}`,
        `${SHORT_MONTHS[monthIndex]}-${day}-${year}`
    ];
    return formats[formatIndex];
}
export function getDateObjWithTime(date = new Date()) {
    const
        dayOfWeek = WEEKDAYS[date.getDay()],
        shortDayOfWeek = SHORT_WEEKDAYS[date.getDay()],
        domEnder = getNumberDomender(date),
        day = date.getDate(),
        dayOfMonth = (date.getDate() < 10) ? '0' + date.getDate() + domEnder : date.getDate() + domEnder,
        month = MONTHS[date.getMonth()],
        shortMonth = SHORT_MONTHS[date.getMonth()],
        year = date.getFullYear(),
        hour = getTwoDigitNumber((date.getHours() > 12 ? date.getHours() - 12 : date.getHours())),
        minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
        seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds(),
        meridiem = date.getHours() >= 12 ? 'PM' : 'AM';
    return { hour, minutes, seconds, meridiem, dayOfWeek, shortDayOfWeek, day, dayOfMonth, month, shortMonth, year };
}
export function getNumberDomender(date) {
    let a = date;
    if (/1/.test(parseInt((a + '').charAt(0)))) {
        return 'th'
    };
    a = parseInt((a + '').charAt(1));
    return 1 == a ? 'st' : 2 == a ? 'nd' : 3 == a ? 'rd' : 'th';
}
export function getUTCDate(date = new Date()) {
    if (typeof date.getMonth != 'function') { date = new Date(date); }
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());;
}
export function formatTimerValue(miliSeconds) {
    const hours = miliSeconds / 3600000;
    const minutes = (miliSeconds / 60000) - (Math.trunc(hours) * 60);
    const seconds = (miliSeconds / 1000) - (Math.trunc(miliSeconds / 60000) * 60);
    return `${Math.trunc(hours)}:${getTwoDigitNumber(Math.trunc(minutes))}:${getTwoDigitNumber(Math.trunc(seconds))}`;
}
export function getMilitaryHour(hour, meridiem) {
    let militaryHour = 0;
    const isPM = meridiem.toLowerCase() == 'pm';
    const is12 = hour == 12;
    if ((isPM && is12) || (!isPM && !is12)) {
        militaryHour = hour;
    }
    if (isPM && !is12) {
        militaryHour = 12 + parseInt(hour);
    }
    return militaryHour;
}
export function roundUpHours(milis, hourPercentage = 25) {
    const minutesInHour = 60;
    const minutes = Math.ceil(milis / 60000);
    const factor = (minutesInHour * hourPercentage) / 100;
    return ((Math.ceil(minutes / factor) * factor) / minutesInHour).toFixed(2);
}
export function getSunday(anyDay = new Date()) {
    return addDays(anyDay, -(anyDay.getDay()));
}
export function bulidDateWithTimeInterval(date, timeObj) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(timeObj.hour), parseInt(timeObj.minutes), parseInt(timeObj.seconds));
}
// End Date Handling //
export function getFullStyleSheet(cssRules = document.styleSheets[0].cssRules) {
    let cssArray = [];
    Array.from(cssRules).forEach(rule => {
        // if (rule.cssText.trim().substring(0, 1) != '@') { cssArray.push(rule.cssText); }// Condition to avoid including @import
        if (rule.cssText.trim().substring(0, 2) != '@i') { cssArray.push(rule.cssText); }// Condition to avoid including @import
        if (rule.styleSheet) {
            cssArray = cssArray.concat(getFullStyleSheet(rule.styleSheet.cssRules));
        }
    })

    return cssArray.join(' ');
}
export function getCSSClassVariables(className) {
    const classVariables = [];
    getFullStyleSheet().split(className + ' {')[1].split('}')[0].split('--').forEach(style => {
        const key = style.split(':')[0].trim();
        const value = style.split(':')[1];
        if (key && value) {
            // classVariables.push({ [key]: value.split(';')[0].trim() });
            classVariables.push({ property: key, value: value.split(';')[0].trim() });
        }
    });
    return classVariables;
}
export function getCustomizableStyleVariables(darkMode = false) {
    return getCSSClassVariables(darkMode ? '.darkMode' : ':root').filter(style => CUSTOMIZABLE_STYLES.map(st => st.property).includes(style.property)).map(s => { s.isColor = CUSTOMIZABLE_STYLES.find(cS => cS.property == s.property).isColor; return s });
}
export function getCustomizableStyleVariablesObj(darkMode = false) {
    const cssPropertyArray = [];
    getCustomizableStyleVariables(darkMode).forEach(style => {
        cssPropertyArray.push({ property: style.property, value: style.value, isColor: style.isColor, mayBeImage: style.mayBeImage, isImage: style.isImage })
    });
    return cssPropertyArray;
}
export function setCSSRootVariable(property, value) {
    document.documentElement.style.setProperty('--' + property, value);
}
export function formatCurrency(amount, decimalCount = 2, decimal = ".", thousands = ",") {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
        console.log(e)
    }
}
// Animations //
export function exitToSide(node, side = 0) {
    const margin = ['exitLeft', 'exitRight'];
    node.classList.add(margin[side]);
    setTimeout(() => {
        flattenNode(node);
    }, 500);
    setTimeout(() => {
        node.parentNode.removeChild(node);
    }, 1000);
}
export function flattenNode(node) {
    node.style.height = getStyles(node, 'height');
    setTimeout(() => {
        node.style.height = '0rem';
        node.style.marginTop = '-' + getStyles(node, 'margin-top');
        node.classList.add('flatten');
    }, 0);
}
export function animatedAppend(animation = 0, parent, ...children) {
    const delayFactor = 50;
    let delay = delayFactor;
    const maxDelay = 500;
    setTimeout(() => {
        children.forEach(child => {
            parent.appendChild(child);
            if (child.classList) {
                child.classList.add(ANIMATIONS[animation]);
                setTimeout(() => {
                    child.classList.remove(ANIMATIONS[animation]);
                }, delay);
            }
            delay = delay < maxDelay ? delay += delayFactor : maxDelay;
        });
    }, maxDelay);
    return parent;
}
export function animatedClearElearElement(element, animation = 0) {
    const delayFactor = 50;
    let delay = delayFactor;
    const maxDelay = 500;
    const children = [];
    for (let i = 0, l = element.children.length; i < l; i++) {
        setTimeout(() => {
            if (element.children[i] && element.children[i].classList) { element.children[i].classList.add(ANIMATIONS[animation]); }
            children.push(element.children[i]);
        }, delay);
        delay = delay < maxDelay ? delay += delayFactor : maxDelay;
    }
    setTimeout(() => {
        removeChildren(element, ...children);
    }, delay);
    return element;
}
export function makeColorTranslucent(color = rgb(0, 0, 0), alpha = .2) {
    return 'rgba(' + color.split('rgb(')[1].split(')')[0] + ',' + alpha + ')';
}
// End Animations //
// Computations //
export function average(numbers = []) {
    return numbers.length > 0 ? numbers.reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue)) / numbers.length : 0;
}
export function getAverageTime(dateArray) {
    return average(dateArray.map(date => {
        return setTimesToSameDay(date).getTime();
    }));
}
export function getHighestLowest(numberArray, high = true) {
    let needle = numberArray[0];
    numberArray.forEach(number => {
        needle = (number > needle) === high ? number : needle;
    });
    return needle;
}
export function setTimesToSameDay(date) {
    date = makeSureIsDate(date);
    date.setFullYear(2015, 10, 15);
    return date;
}
export function makeSureIsDate(date) {
    if (!date.getTime) {
        return new Date(date);
    }
    return date;
}
// End Computations //