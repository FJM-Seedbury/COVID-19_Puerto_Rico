/**
 * Graph.js
 * @author Francisco J. Medina <francisco@seedburysquare.com>
 * @copyright Seedbury Square, LLC. All Rights Reserved.
 * 
 * @version 2020-04-04 Initial Version 
 */

import { elementFromHTMLString } from '../../utilities/renderer.js';
import { appendChildren, scaleFactorConverter, getTemplateAreasColumns } from '../../utilities/helpers.js';

export class Graph {
    constructor(historicalData, currentDayData) {
        this.historicalData = historicalData;
        this.currentDayData = currentDayData;
        this.numberOfColumns = this.historicalData.length + 2;
        this.highestNumber = this.findHighestValue();
        this.numberOfRows = Math.ceil(this.highestNumber / 100) * 100;
        console.log(historicalData, currentDayData, this.numberOfColumns, this.highestNumber);
        this.view = elementFromHTMLString('<span class=graph__view></span>');
        this.renderLine();
    }
    renderLine() {
        this.yAxis = new YAxis(this.numberOfRows);
        this.xAxis = new XAxis(this.numberOfColumns, this.historicalData);
        this.view.style.gridTemplateAreas = getTemplateAreasColumns(this.numberOfColumns) + getTemplateAreasColumns(this.numberOfColumns, 'xAxis');
        this.view.style.gridTemplateColumns = 'repeat(' + this.numberOfColumns + ', 1fr)';
        const currentDataElement = new DataPointElement('.', this.currentDayData.cases, this.numberOfRows, this.highestNumber).view;
        appendChildren(this.view,
            this.yAxis.view,
            ...this.historicalData.map(dataPoint => {
                const dataElement = new DataPointElement('.', dataPoint.positive, this.numberOfRows, this.highestNumber).view;
                return dataElement;
            }),
            currentDataElement,
            this.xAxis.view
        );
    }
    findHighestValue() {
        let highestNumber = 0;
        this.historicalData.forEach(hData => {
            if (hData.positive > highestNumber) {
                highestNumber = hData.positive;
            }
        });
        if (this.currentDayData.cases > highestNumber) {
            highestNumber = this.currentDayData.cases;
        }
        return highestNumber;
    }
}
class DataPointElement {
    constructor(character = '.', numberValue, numberOfRows, highestNumber) {
        const convertionFactor = highestNumber / numberOfRows;
        console.log(convertionFactor);
        this.view = elementFromHTMLString(`<h3 class=graph__dataPoint>${numberValue}</h3>`);
        this.view.style.marginBottom = scaleFactorConverter(numberValue, convertionFactor) + 'rem';
        this.view.title = numberValue;
    }
}
class YAxis {
    constructor(numberOfItems) {
        const numberOfRows = (numberOfItems / 100);
        const gridArea = 'yAxis__r';
        let gridAreas = '';
        this.view = appendChildren(elementFromHTMLString(`<span class=graph__yAxis></span>`),
            ...Array.apply(null, Array(numberOfRows)).map((n, index) => {
                const rowElement = elementFromHTMLString(`<h3 class=yAxis__row>${numberOfRows * ((numberOfRows - (index)) / numberOfRows) * 100}</h3>`);
                rowElement.style.gridArea = gridArea + index;
                gridAreas += `"${gridArea + index} "`;
                return rowElement;
            })
        );
        this.view.style.gridTemplateAreas = gridAreas;
        this.view.style.gridTemplateRows = 'repeat(' + numberOfRows + ', 1fr)';
    }
}
class XAxis {
    constructor(numberOfColumns, historicalData) {
        this.historicalDataEdit = historicalData.map(data => new Date(data.dateChecked).getDate());
        this.historicalDataEdit.unshift('');
        this.historicalDataEdit.push(new Date().getDate());
        this.view = appendChildren(elementFromHTMLString(`<span class=graph__xAxis></span>`),
            ...this.historicalDataEdit.map(hData => elementFromHTMLString(`<h4 class=xAxis__column>${hData}</h4>`))
        );
        // this.view.style.gridTemplateAreas = getTemplateAreasColumns(numberOfColumns, 'xAxis__col');
        // this.view.style.gridTemplateColumns = 'repeat(' + numberOfColumns + ', 1fr)';
    }
}