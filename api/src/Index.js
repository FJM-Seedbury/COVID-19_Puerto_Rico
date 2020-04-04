/**
 * Index.js
 * @author Francisco J. Medina <francisco@seedburysquare.com>
 * @copyright Seedbury Square, LLC. All Rights Reserved.
 * 
 * @version 2020-04-04 Initial Version 
 */

import { elementFromHTMLString } from './utilities/renderer.js'
import { httpRequest, sortObjArray, setElementClassList, appendChildren, parseDate } from './utilities/helpers.js';
import { Graph } from './containers/graph/Graph.js';

export class Index {
    constructor() {
        this.view = appendChildren(elementFromHTMLString('<span class=index__view></span>'),
            elementFromHTMLString('<h1 class=index__header>COVID-19 | Puerto Rico</h1>')
        );
        Promise.all([
            httpRequest('http://covidtracking.com/api/states/daily?state=NY', 'GET'),
            httpRequest('https://corona.lmao.ninja/states', 'GET')
        ])
            .then(responseArray => {
                this.historicalData = responseArray[0].sort(sortObjArray('date'));
                this.currentDayData = responseArray[1].find(res => res.state == 'Puerto Rico');
                this.graphView = new Graph(this.historicalData, this.currentDayData);
                this.view.appendChild(setElementClassList(this.graphView.view, 'index__graph'));
            })

    }
}