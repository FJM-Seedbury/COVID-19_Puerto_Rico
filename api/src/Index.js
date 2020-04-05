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
            // elementFromHTMLString('<h1 class=index__sS-header>Powered by</h1>'),
            elementFromHTMLString('<img src="./api/src/img/Seedbury-Square-LogoHoriz.png" class=index__sS-image></img>'),

        );
        Promise.all([
            // httpRequest('http://covidtracking.com/api/states/daily?state=NY', 'GET'),
            httpRequest('http://covidtracking.com/api/states/daily?state=PR', 'GET'),
            httpRequest('https://corona.lmao.ninja/states', 'GET')
        ])
            .then(responseArray => {
                this.historicalData = responseArray[0].sort(sortObjArray('date'));
                console.log(getDateNoTime(new Date(this.historicalData[this.historicalData.length - 1].dateChecked)), getDateNoTime());
                if (getDateNoTime(new Date(this.historicalData[this.historicalData.length - 1].dateChecked)).getTime() != getDateNoTime().getTime()) {
                    this.historicalData.push({ positive: responseArray[1].find(res => res.state == 'Puerto Rico').cases, dateChecked: new Date() });
                }
                // this.currentDayData = responseArray[1].find(res => res.state == 'Puerto Rico');
                this.graphView = new Graph(this.historicalData);
                this.view.appendChild(setElementClassList(this.graphView.view, 'index__graph'));
            });
    }
}