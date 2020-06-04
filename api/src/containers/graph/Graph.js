/**
 * Graph.js
 * @author Francisco J. Medina <francisco@seedburysquare.com>
 * @copyright Seedbury Square, LLC. All Rights Reserved.
 * 
 * @version 2020-04-04 Initial Version 
 */

import { elementFromHTMLString } from '../../utilities/renderer.js';
import { appendChildren, scaleFactorConverter, getTemplateAreasColumns, getMagnitude } from '../../utilities/helpers.js';

export class Graph {
    constructor(historicalData) {
        this.historicalData = historicalData;
        this.historicalData.forEach((hD, index) => {
            for (let i = 0; i < index; i++) {
                // hD.positive -= this.historicalData[i].positive;
            }
        });
        this.numberOfColumns = this.historicalData.length + 1;
        this.highestNumber = this.findHighestValue();
        // this.magnitude = getMagnitude(this.highestNumber);
        this.magnitude = 100;
        this.numberOfRows = Math.floor(this.highestNumber / this.magnitude) * this.magnitude;
        this.convertionFactor = this.numberOfRows / this.highestNumber;
        this.divisor = 6;
        this.view = elementFromHTMLString('<span class=graph__view></span>');
        this.view.style.height = (((Math.ceil(this.highestNumber / this.magnitude) * this.magnitude) / 10) / this.divisor) + 3 + 'rem';
        this.renderLine();
    }
    renderLine() {
        this.yAxis = new YAxis(this.numberOfRows, this.magnitude, this.divisor);
        this.xAxis = new XAxis(this.historicalData);
        this.view.style.gridTemplateAreas = getTemplateAreasColumns(this.numberOfColumns) + getTemplateAreasColumns(this.numberOfColumns, 'xAxis');
        this.view.style.gridTemplateColumns = 'repeat(' + this.numberOfColumns + ', 1fr)';
        appendChildren(this.view,
            this.yAxis.view,
            ...this.historicalData.map((dataPoint, index) => {
                let numberValue = dataPoint.positive;
                const dataElement = new DataPointElement(numberValue, this.numberOfRows, this.highestNumber, this.divisor).view;
                return dataElement;
            }),
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
        return highestNumber;
    }
}

class DataPointElement {
    constructor(numberValue, numberOfRows, highestNumber, divisor) {
        this.view = elementFromHTMLString('<img src="./api/src/img/Covid-dark.png" class=graph__dataPoint></img>');
        this.view.style.marginBottom = `${scaleFactorConverter(numberValue, this.convertionFactor) / divisor}rem`;
        this.view.title = numberValue;
    }
}
class YAxis {
    constructor(numberOfItems, magnitude, divisor) {
        const numberOfRows = (numberOfItems / magnitude);
        const gridArea = 'yAxis__r';
        let gridAreas = 'test';
        this.view = appendChildren(elementFromHTMLString(`<span class=graph__yAxis></span>`),
            ...Array.apply(null, Array(numberOfRows)).map((n, index) => {
                const value = numberOfRows * ((numberOfRows - (index)) / numberOfRows) * magnitude;
                const rowElement = elementFromHTMLString(`<h3 class=yAxis__row>${Math.trunc(value)}</h3>`);
                // rowElement.style.gridArea = gridArea + index;
                // rowElement.style.gridArea = gridArea;
                // gridAreas += `"${gridArea + index} "`;
                rowElement.style.bottom = scaleFactorConverter(value, this.convertionFactor) / divisor + 'rem';
                return rowElement;
            })
        );
        // this.view.style.gridTemplateAreas = gridAreas;
        this.view.style.gridTemplateAreas = gridAreas;
        // this.view.style.gridTemplateRows = 'repeat(' + numberOfRows + ', 1fr)';
    }
}
class XAxis {
    constructor(historicalData) {
        this.historicalDataEdit = historicalData.map(data => new Date(data.dateChecked).getDate());
        this.historicalDataEdit.unshift('');
        this.view = appendChildren(elementFromHTMLString(`<span class=graph__xAxis></span>`),
            ...this.historicalDataEdit.map(hData => elementFromHTMLString(`<h4 class=xAxis__column>${hData}</h4>`))
        );
        this.view.style.gridTemplateAreas = getTemplateAreasColumns(this.historicalDataEdit.length, 'xAxis_col');
        this.view.style.gridTemplateColumns = 'repeat(' + this.historicalDataEdit.length + ', 1fr)';
    }
}