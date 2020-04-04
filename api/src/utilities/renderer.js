/**
 * renderer.js
 * @author Francisco J. Medina <francisco@seedburysquare.com>
 * @copyright Seedbury Square, LLC. All Rights Reserved.
 * 
 * @version 2020-04-04 Initial Version 
 */

export const elementFromHTMLString = (htmlString, test) => {
    const node = document.createElement('div');
    node.innerHTML = htmlString;
    return node.firstChild;
}
export const nodeElement = (type = 'span', className = false, id = false) => {
    const node = document.createElement(type);
    if (className) { node.classList.add(className); }
    if (id) { node.id = id; }
    return node;
}
