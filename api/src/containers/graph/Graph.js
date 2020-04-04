/**
 * Graph.js
 * @author Francisco J. Medina <francisco@seedburysquare.com>
 * @copyright Seedbury Square, LLC. All Rights Reserved.
 * 
 * @version 2020-04-04 Initial Version 
 */

import { elementFromHTMLString } from '../../utilities/renderer.js';

export class Graph {
    constructor(historicalData, currentDayData) {
        console.log(historicalData, currentDayData);
        this.view = elementFromHTMLString('<span class=graph__view></span>');
    }
}