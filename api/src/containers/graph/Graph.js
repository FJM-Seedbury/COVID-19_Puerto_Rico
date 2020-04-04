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
        this.xAxis = new XAxis(this.numberOfColumns, this.historicalData);
        this.view.style.gridTemplateAreas = getTemplateAreas(this.numberOfColumns) + getTemplateAreas(this.numberOfColumns, 'xAxis');
        this.view.style.gridTemplateColumns = 'repeat(' + this.numberOfColumns + ', 1fr)';
        const currentDataElement = new DataPointElement('.', this.currentDayData.cases).view;
        appendChildren(this.view,
            this.yAxis.view,
            ...this.historicalData.map(dataPoint => {
                const dataElement = new DataPointElement('.', dataPoint.positive).view;
                return dataElement;
            }),
            currentDataElement,
            this.xAxis.view
        );
    }
}
class DataPointElement {
    constructor(character = '.', numberValue) {
        this.view = elementFromHTMLString(`<h3 class=graph__dataPoint>${character}</h3>`);
        this.view.style.marginBottom = scaleFactorConverter(numberValue) + 'rem';
        this.view.title = numberValue;
    }
}
class YAxis {
    constructor(numberOfItems) {
        console.log(numberOfItems);
        this.view = elementFromHTMLString(`<h3 class=graph__yAxis></h3>`);
    }
}
class XAxis {
    constructor(numberOfColumns,historicalData) {
        console.log(historicalData);
        this.historicalData = historicalData;
        
        this.view = appendChildren(elementFromHTMLString(`<span class=graph__xAxis></span>`),
            ...Array.apply(null, Array(numberOfColumns)).map(() => appendChildren(elementFromHTMLString('<h4 class=xAxis__column>|</h4>'),
            elementFromHTMLString('<h4 class=xAxis__dayNumber>numOfDay</h4>')
            ))
        );
        this.view.style.gridTemplateAreas = getTemplateAreas(numberOfColumns, 'xAxis__col');
        this.view.style.gridTemplateColumns = 'repeat(' + numberOfColumns + ', 1fr)';
    }
}