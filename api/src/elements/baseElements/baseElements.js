import { nodeElement, elementFromHTMLString } from '../../utilities/renderer.js';
import { appendChildren } from '../../utilities/helpers.js';

export function getTextNode(text) {
    return document.createTextNode(text);
}
export function getHeading(text = '', size = 1) {
    const sizes = ['small', 'mid', 'big'];
    return appendChildren(elementFromHTMLString(`<h1 class='heading heading-${sizes[size]}'></h1>`), getTextNode(text));
}
export function getElementContainer(...selectedBorders) {
    const container = nodeElement('span', 'elementContainer');
    const borders = ['borderNone', 'borderTop', 'borderRight', 'borderBottom', 'borderLeft', 'borderAll'];
    selectedBorders.forEach(border => container.classList.add('elementContainer-' + borders[border]));

    return container;
}
export function getCanvas() {
    return nodeElement('canvas');
}