import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3'

@Component({
  selector: 'app-path',
  templateUrl: './path.component.html',
  styleUrls: ['./path.component.css']
})
export class PathComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    this.draw();
  }

  drawPath(data) {
   var g = data.g;
   g.append('path')
    .attr('d', "M " + data.x0 + ' ' + data.y0 + ' h 400 v 400 h -400 z')
    .style('stroke', 'blue')
    .style('fill', 'none')


   g.append('path')
    .attr('d', 'M ' + (data.x0+10)  + ' ' + 100
                + ' H ' + data.x + ' ' + data.y)
    .style('stroke', 'black')
    .style('fill', 'none');

   g.append('circle')
    .attr('cx', data.x1)
    .attr('cy', data.y1)
    .attr('r', 4)
    .style('fill', 'red')

   g.append('circle')
    .attr('cx', data.x2)
    .attr('cy', data.y2)
    .attr('r', 4)
    .style('fill', 'red')

   g.append('path')
    .attr('d', 'M ' + (data.x0+10)  + ' ' + 100
                + ' C ' + data.x1 + ' ' + data.y1
                + ', ' + data.x2 + ' ' + data.y2
                +', ' + data.x + ' ' + data.y)
    .style('stroke', 'blue')
    .style('fill', 'none')

  }

  draw() {

    var margin = {"top": 150, "right": 50, "bottom": 50, 'left': 50};
    var width = 1100, height = 800;
    var innerWidth = width - margin.left - margin.right;
    var innerHeight = height - margin.top - margin.bottom;

    var svg = d3.select('#vizid').append('svg').attr('width', width).attr('height', height);

    var g = svg.append('g')
        .attr('transform', "translate(" + margin.left + ", "+ margin.top + ")");

    g.append('rect')
        .attr('width', innerWidth)
        .attr('height', innerHeight)
        .style('stroke', 'red')
        .style('fill', 'none');
    var data = {}
    data['g'] = g;
    data['x0'] = 10;
    data['y0'] = 10;
    data['x1'] = 20;
    data['y1'] = 20;
    data['x2'] = 250;
    data['y2'] = 20;
    data['x'] = 250;
    data['y'] = 100;

    this.drawPath(data)

    //svg.append('g').append('circle').attr('cx', 100).attr('cy', 100).attr('r', 10).style('fill', 'red')
  }

}
