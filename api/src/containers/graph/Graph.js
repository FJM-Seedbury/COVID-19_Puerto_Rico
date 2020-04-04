/**
 * Graph.js
 * @author Francisco J. Medina <francisco@seedburysquare.com>
 * @copyright Seedbury Square, LLC. All Rights Reserved.
 * 
 * @version 2020-04-04 Initial Version 
 */

import { elementFromHTMLString } from '../../utilities/renderer.js';
import { appendChildren, scaleFactorConverter, getTemplateAreas } from '../../utilities/helpers.js';

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
        this.yAxis = new YAxis(this.numberOfColumns);
        this.xAxis = new XAxis(this.numberOfColumns);
        this.view.style.gridTemplateAreas = getTemplateAreas(this.numberOfColumns) + getTemplateAreas(this.numberOfColumns, 'xAxis');
        this.view.style.gridTemplateColumns = 'repeat(' + this.numberOfColumns + ', 1fr)';
        const currentDataElement = new DataPointElement('.').view;
        currentDataElement.style.marginBottom = scaleFactorConverter(this.currentDayData.cases) + 'rem';
        appendChildren(this.view,
            this.yAxis.view,
            ...this.historicalData.map(dataPoint => {
                const dataElement = new DataPointElement('.').view;
                dataElement.style.marginBottom = scaleFactorConverter(dataPoint.positive) + 'rem';
                return dataElement;
            }),
            currentDataElement,
            this.xAxis.view
        );
    }
}
class DataPointElement {
    constructor(character = '.') {
        this.view = elementFromHTMLString(`<h3 class=graph__dataPoint>${character}</h3>`);
    }
}
class YAxis {
    constructor(numberOfItems) {
        console.log(numberOfItems);
        this.view = elementFromHTMLString(`<h3 class=graph__yAxis></h3>`);
    }
}
class XAxis {
    constructor(numberOfItems) {
        console.log(numberOfItems);
        this.view = elementFromHTMLString(`<h3 class=graph__xAxis></h3>`);
    }
}