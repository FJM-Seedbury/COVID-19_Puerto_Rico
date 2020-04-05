/**
 * Index.js
 * @author Francisco J. Medina <francisco@seedburysquare.com>
 * @copyright Seedbury Square, LLC. All Rights Reserved.
 * 
 * @version 2020-04-04 Initial Version 
 */

import { elementFromHTMLString } from './utilities/renderer.js'
import { httpRequest, sortObjArray, setElementClassList, appendChildren, getDateNoTime } from './utilities/helpers.js';
import { Graph } from './containers/graph/Graph.js';

export class Index {
    constructor() {
        this.view = appendChildren(elementFromHTMLString('<span class=index__view></span>'),
            elementFromHTMLString('<img src="./api/src/img/Covid-dark.png" class=index__covid-image></img>'),
            elementFromHTMLString('<h1 class=index__header>COVID-19 | Puerto Rico</h1>'),
            elementFromHTMLString('<img src="./api/src/img/Seedbury-Square-LogoHoriz.png" class=index__sS-image></img>'),

        );
        Promise.all([
            // httpRequest('http://covidtracking.com/api/states/daily?state=NY', 'GET'),
            httpRequest('http://covidtracking.com/api/states/daily?state=PR', 'GET'),
            httpRequest('https://corona.lmao.ninja/states', 'GET')
        ])
            .then(responseArray => {
                this.historicalData = responseArray[0].sort(sortObjArray('date'));
                const puertoRico = responseArray[1].find(res => res.state == 'Puerto Rico');
                console.log(getDateNoTime(new Date(this.historicalData[this.historicalData.length - 1].dateChecked)), getDateNoTime());
                if (getDateNoTime(new Date(this.historicalData[this.historicalData.length - 1].dateChecked)).getTime() != getDateNoTime().getTime()) {
                    this.historicalData.push({ positive: puertoRico.cases, dateChecked: new Date() });
                    this.historicalDataForTable = [{ positive: puertoRico.cases, death: puertoRico.deaths, todayCases: puertoRico.todayCases, todayDeaths: puertoRico.todayDeaths }];
                } else {
                    this.historicalDataForTable = [{ positive: responseArray[0].positive, death: responseArray[0].death, todayCases: responseArray[0].positiveIncrease, todayDeaths: responseArray[10].deathIncrease }];
                }
                this.view.appendChild(setElementClassList(new Graph(this.historicalData).view, 'index__graph'));
                this.view.appendChild(new Table(this.historicalDataForTable).view)
            });
    }
}
class Table {
    constructor(historicalData) {
        console.log(historicalData);
        this.lastItemOfArray = historicalData.slice(-1).pop();
        this.view = appendChildren(elementFromHTMLString('<span class=table__view></span>'),
            elementFromHTMLString('<span class=table__confirmedToday>Confirmados Hoy</span>'),
            elementFromHTMLString(`<span class=table__confirmedNumberToday>${this.lastItemOfArray.todayCases}</span>`),
            elementFromHTMLString('<span class=table__deathToday>Muertos Hoy</span>'),
            elementFromHTMLString(`<span class=table__deathNumberToday>${this.lastItemOfArray.todayDeaths}</span>`),
            elementFromHTMLString('<span class=table__confirmed>Total Confirmados</span>'),
            elementFromHTMLString(`<span class=table__confirmedNumber>${this.lastItemOfArray.positive}</span>`),
            elementFromHTMLString('<span class=table__death>Total de Muertos</span>'),
            elementFromHTMLString(`<span class=table__deathNumber>${this.lastItemOfArray.death}</span>`),
        )
    }
}