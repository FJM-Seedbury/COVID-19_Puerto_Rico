/**
 * Index.js
 * @author Francisco J. Medina <francisco@seedburysquare.com>
 * @copyright Seedbury Square, LLC. All Rights Reserved.
 * 
 * @version 2020-04-04 Initial Version 
 */

import { elementFromHTMLString } from './utilities/renderer.js'
import { httpRequest, sortObjArray } from './utilities/helpers.js';
import { Graph } from './containers/graph/Graph.js';

export class Index {
    constructor() {
        this.view = elementFromHTMLString('<span class=index__view></span>');
        Promise.all([
            httpRequest('http://covidtracking.com/api/states/daily?state=PR', 'GET'),
            httpRequest('https://corona.lmao.ninja/states', 'GET')
        ])
            .then(responseArray => {
                this.historicalData = responseArray[0].sort(sortObjArray('date'));
                this.currentDayData = responseArray[1].find(res => res.state == 'Puerto Rico');
                this.graphView = new Graph(this.historicalData, this.currentDayData);
                this.view.appendChild(this.graphView.view);
            })

    }
}