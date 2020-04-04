/**
 * helpers.js
 * @author Francisco J. Medina <francisco@seedburysquare.com>
 * @copyright Seedbury Square, LLC. All Rights Reserved.
 * 
 * @version 2020-04-04 Initial Version 
 */

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
        element.removeChild(child);
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
export function sortObjArray(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    };
}
export function scaleFactorConverter(value, scaleFactor = 1) {
    scaleFactor = scaleFactor / 10;
    return value * scaleFactor;
}
export function getTemplateAreasColumns(numberOfColumns, columnName = 'columns') {
    return `"${Array.apply(null, Array(numberOfColumns)).map(() => columnName).join(' ')}"`;
}
export function getTemplateAreasRows(numberOfRows, rowName = 'rows') {
    return Array.apply(null, Array(numberOfRows)).map(() => '"' + rowName + '"').join(' ');
}
export function parseDate(date) {
    return new Date(date.substring(0, 4) + '-' + date.substring(4, 6) + '-' + date.substring(6, 8));
}