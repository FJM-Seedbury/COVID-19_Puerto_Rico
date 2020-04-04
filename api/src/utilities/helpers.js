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