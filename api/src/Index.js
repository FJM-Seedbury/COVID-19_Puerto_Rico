/**
 * Index.js
 * @author Francisco J. Medina <francisco@seedburysquare.com>
 * @copyright Seedbury Square, LLC. All Rights Reserved.
 * 
 * @version 2020-04-04 Initial Version 
 */

import { elementFromHTMLString } from './utilities/renderer.js'
import { httpRequest, sortObjArray, setElementClassList, appendChildren, getDateNoTime } from './utilities/helpers.js';
import { LineGraph } from './containers/graph/LineGraph.js';

export class Index {
    constructor() {
        this.view = appendChildren(elementFromHTMLString('<span class=index__view></span>'),
            elementFromHTMLString('<img src="./api/src/img/Covid-dark.png" class=index__covid-image></img>'),
            elementFromHTMLString('<h1 class=index__header>COVID-19 | Puerto Rico</h1>'),
            elementFromHTMLString('<img src="./api/src/img/Seedbury-Square-LogoHoriz.png" class=index__sS-image></img>'),

        );
        Promise.all([
            // httpRequest('http://covidtracking.com/api/states/daily?state=NY', 'GET'),
            httpRequest('https://covidtracking.com/api/v1/states/pr/daily.json', 'GET'),
            httpRequest('https://corona.lmao.ninja/v2/states', 'GET')
        ])
            .then(responseArray => {
                this.historicalData = responseArray[0].sort(sortObjArray('date'));
                const puertoRico = responseArray[1].find(res => res.state == 'Puerto Rico');
                if (getDateNoTime(new Date(this.historicalData[this.historicalData.length - 1].dateChecked)).getTime() != getDateNoTime().getTime()) {
                    this.historicalData.push({ positive: puertoRico.cases, dateChecked: new Date() });
                    this.historicalDataForTable = [{ positive: puertoRico.cases, death: puertoRico.deaths, todayCases: puertoRico.todayCases, todayDeaths: puertoRico.todayDeaths }];
                } else {
                    this.historicalDataForTable = [{ positive: this.historicalData[this.historicalData.length - 1].positive, death: this.historicalData[this.historicalData.length - 1].death, todayCases: this.historicalData[this.historicalData.length - 1].positiveIncrease, todayDeaths: this.historicalData[this.historicalData.length - 1].deathIncrease }];
                }
                const graph = new LineGraph();
                this.view.appendChild(setElementClassList(graph.view, 'index__graph'));
                this.view.appendChild(new Table(this.historicalDataForTable, this.historicalData).view);
                graph.setView(this.parseGraphData(this.historicalData));
            });
    }
    parseGraphData(historicalData) {
        // console.log(historicalData);
        return {
            xAxisLabel: 'Dates',
            yAxisLabel: 'Confirmed',
            points: historicalData.map(data => {
                return {
                    x: new Date(data.dateChecked),
                    y: data.positive
                }
            })
        };
    }
}
class Table {
    constructor(historicalDataForTable, historicalData) {
        const changeAverage = this.getChangeAverage(historicalData);
        this.lastItemOfArray = historicalDataForTable.slice(-1).pop();
        this.view = appendChildren(elementFromHTMLString('<span class=table__view></span>'),
            elementFromHTMLString('<span class=table__historicalChange>Promedio de Contagio</span>'),
            elementFromHTMLString(`<span class=table__historicalNumber>${changeAverage}%</span>`),
            elementFromHTMLString('<span class=table__confirmedToday>Confirmados Hoy</span>'),
            elementFromHTMLString(`<span class=table__confirmedNumberToday>${this.lastItemOfArray.todayCases}</span>`),
            elementFromHTMLString('<span class=table__deathToday>Muertes Hoy</span>'),
            elementFromHTMLString(`<span class=table__deathNumberToday>${this.lastItemOfArray.todayDeaths}</span>`),
            elementFromHTMLString('<span class=table__confirmed>Total Confirmados</span>'),
            elementFromHTMLString(`<span class=table__confirmedNumber>${this.lastItemOfArray.positive}</span>`),
            elementFromHTMLString('<span class=table__death>Total de Muertes</span>'),
            elementFromHTMLString(`<span class=table__deathNumber>${this.lastItemOfArray.death}</span>`),
        )
    }
    getChangeAverage(historicalData) {
        const filteredHistoricalData = this.getLastNDays(historicalData, 10);
        // console.log(filteredHistoricalData);
        return Math.round(filteredHistoricalData.reduce((accumulator = 0, currentValue, currentIndex, array) => {
            accumulator += (currentValue.positiveIncrease ? currentValue.positiveIncrease : 0) / currentValue.positive;
            return accumulator;
        }, 0) / filteredHistoricalData.length * 100);
    }
    getLastNDays(historicalData, n = 10) {
        const newArray = [];
        const startIndex = historicalData.length - n < 0 ? 0 : historicalData.length - n;
        for (let i = startIndex, l = historicalData.length; i < l; i++) {
            newArray.push(historicalData[i]);
        }
        return newArray;
    }
}