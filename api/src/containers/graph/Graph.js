/**
 * Graph.js
 * @author Francisco J. Medina <francisco@seedburysquare.com>
 * @copyright Seedbury Square, LLC. All Rights Reserved.
 * 
 * @version 2020-04-04 Initial Version 
 */

import { elementFromHTMLString } from '../../utilities/renderer.js';
import { appendChildren } from '../../utilities/helpers.js';

export class Graph {
    constructor(historicalData, currentDayData) {
        this.historicalData = historicalData;
        this.currentDayData = currentDayData;
        console.log(historicalData, currentDayData);
        this.view = elementFromHTMLString('<span class=graph__view></span>');
        this.renderLine();
    }
    renderLine() {
        this.numberOfColumns = this.historicalData.length + 2;
        this.view.style.gridTemplateColumns = 'repeat(' + this.numberOfColumns + ', 1fr)';
        appendChildren(this.view,
            elementFromHTMLString('<h3 class=graph__dataPoint>y</h3>'),
            ...this.historicalData.map(dataPoint => {
                const dataElement = elementFromHTMLString('<h3 class=graph__dataPoint>h</h3>');
                dataElement.style.marginBottom = ((dataPoint.positive * 2) / 10) + 'rem';
                return dataElement;
            }),
            elementFromHTMLString('<h3 class=graph__dataPoint>c</h3>')
        );
    }
}