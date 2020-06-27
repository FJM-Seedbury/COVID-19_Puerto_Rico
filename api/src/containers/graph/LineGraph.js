/**
* LineGraph.js
* @author Francisco J. Medina <francisco@seedburysquare.com>
* @copyright Seedbury Square, LLC. All Rights Reserved.
*
* @version 2020-06-19 Initial Version
*/

import { getElementContainer, getCanvas, getHeading } from '../../elements/baseElements/baseElements.js';
import { setElementClassList, appendChildren, formatDate, clearElement, getStyles, roundUpHours, getHighestLowest } from '../../utilities/helpers.js';

export class LineGraph {
    constructor() {
        this.yAxis = setElementClassList(getElementContainer(), 'graph__yAxis');
        this.yAxisLabel = setElementClassList(getElementContainer(2), 'graph__yAxisLabel');
        this.xAxis = setElementClassList(getElementContainer(), 'graph__xAxis');
        this.xAxisLabel = setElementClassList(getElementContainer(1), 'graph__xAxisLabel');
        this.canvas = setElementClassList(getCanvas(), 'graph__canvas');
        this.context = this.canvas.getContext('2d');
        this.context.lineWidth = 1;
        this.context.lineCap = 'round';
        this.context.lineJoin = 'round';
        this.view = appendChildren(setElementClassList(getElementContainer(), 'graph__view'),
            this.yAxisLabel,
            this.yAxis,
            this.canvas,
            this.xAxis,
            this.xAxisLabel
        );
    }
    setDimentionRatio() {
        const highlightColor = getStyles(this.canvas, 'color');
        const canvasHeight = Math.ceil(getStyles(this.canvas, 'height').slice(0, -2));
        const canvasWidth = Math.ceil(getStyles(this.canvas, 'width').slice(0, -2));
        // Set actual size in memory (scaled to account for extra pixel density).
        const scale = window.devicePixelRatio;
        this.canvas.width = Math.floor(canvasWidth * scale);
        this.canvas.height = Math.floor(canvasHeight * scale);
        // Normalize coordinate system to use css pixels.
        this.context.scale(scale, scale);
        this.context.strokeStyle = highlightColor;
    }
    setView(graphData) {
        console.log(graphData);
        setTimeout(() => {
            const yMax = getHighestLowest(graphData.points.map(point => point.y));
            const yAxisMid = yMax / 2;
            const firstDay = graphData.points[0] ? graphData.points[0].x : 0;
            const lastDay = graphData.points[graphData.points.length - 1] ? graphData.points[graphData.points.length - 1].x : 0;
            const xAxisCero = firstDay;
            const xAxixMid = (lastDay.getTime() + firstDay.getTime()) / 2;
            const numberOfPoints = graphData.points.length - 1;
            const canvasHeight = Math.ceil(getStyles(this.canvas, 'height').slice(0, -2));
            const canvasWidth = Math.ceil(getStyles(this.canvas, 'width').slice(0, -2));
            const remXPerPoint = Math.ceil(canvasWidth / numberOfPoints);
            const percentOfYPerPoint = (canvasHeight / yMax);
            this.context.clearRect(0, 0, canvasWidth, canvasHeight);
            appendChildren(clearElement(this.yAxisLabel), getHeading(graphData.yAxisLabel || '', 0));
            appendChildren(clearElement(this.xAxisLabel), getHeading(graphData.xAxisLabel || '', 0));
            appendChildren(clearElement(this.yAxis),
                setElementClassList(getHeading(yMax, 0), 'graph__yAxis__last'),
                setElementClassList(getHeading(yAxisMid, 0), 'graph__yAxis__mid'),
                setElementClassList((getHeading('', 0)), 'graph__yAxis__cero'),
            );
            appendChildren(clearElement(this.xAxis),
                setElementClassList((getHeading(xAxisCero ? formatDate(new Date(xAxisCero)) : '', 0)), 'graph__xAxis__cero'),
                setElementClassList((getHeading(xAxixMid ? formatDate(new Date(xAxixMid)) : '', 0)), 'graph__xAxis__mid'),
                setElementClassList((getHeading(lastDay ? formatDate(new Date(lastDay)) : '', 0)), 'graph__xAxis__last'),
            );
            const points = graphData.points.map((point, index) => {
                return {
                    x: (remXPerPoint * index) - 160,
                    // x: (remXPerPoint * index),
                    y: -(point.y * percentOfYPerPoint) + (canvasHeight)
                };
            });
            console.log('yMax', yMax);
            console.log('percentOfYPerPoint', percentOfYPerPoint);
            if (points[0]) {
                this.setDimentionRatio();
                let lastPoint = points[0];
                lastPoint = { x: 0, y: canvasHeight };
                points.forEach(point => {
                    this.draw(lastPoint, point);
                    lastPoint = point;
                });
                // this.test(canvasHeight);
            }
        }, 50);
    }
    draw(lastPoint, point) {
        console.log(point);
        this.context.beginPath();
        this.context.moveTo(lastPoint.x, lastPoint.y);
        this.context.lineTo(point.x, point.y);
        this.context.stroke();
    }
    test(canvasHeight) {
        this.context.beginPath();
        this.context.moveTo(0, canvasHeight);
        this.context.lineTo(10, 545);
        this.context.stroke();
    }
}