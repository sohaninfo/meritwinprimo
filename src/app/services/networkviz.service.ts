import { Injectable } from '@angular/core';
import * as d3 from 'd3'

export class Tpe {
}

export class Domain {
    w:any;
    h:any;
    g:any;
    props:any;
    //c10:any = d3.scale.category10();

    constructor(width, height) {
        this.w = width;
        this.h = height;
        console.log('w:', this.w)
        console.log('h:', this.h)

        this.props = {
            "stroke": "red",
            "slotbg": "#F8DEBD",
            "heading": "#CA6F1E",
            "col1": "#F8F8F2",
        }
    }

   getColor(n) {
     var colores_g = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"];
     return colores_g[n % colores_g.length];
   }

  addTpe(domainId, slotNo, tpeId,tpeNo,x,y) {
    console.log('slotNo', slotNo);
    var sNo = slotNo;
    var g = d3.select('#'+domainId).select('svg').select('g#'+domainId+'_tpes').select('g#slot'+slotNo);
    if(g) {
        console.log('Drawing tpe...');
        var p = this.props;
        var tp = g.append('g')
                .attr('id', tpeId)
                .attr('transform', 'translate('+x+', '+y+')')
        tp.append('circle').attr('cx', 0).attr('cy', 10).attr('r', 3).style('stroke', 'none').style('fill', this.getColor(tpeNo));
    }

  }

  drawSlot(slotId, slotNo, x, y) {
    var g = this.g;
    if(g) {
        var p = this.props;
        var slot = g.append('g')
                .attr('id', slotId)
                .attr('transform', 'translate('+x+', '+y+')')

        slot.append('rect').attr('width', 10).attr('height', '100%').style('stroke', 'none')
        .style('fill', p.slotbg);


            slot.append('g').attr('id', 'slotno')
            .append('text')
            .attr('x', 2)
            .attr('y', 7)
            .text(slotNo)
            .style('fill', 'blue')
            .style('font-size', '10px')
    }

  }

  fillTpe(domainId) {

        for(var i = 0; i < 7; i++) {
        var cX = 5;
        var domainId;
        var slotNo = i+1;
        var colorName = this.getColor(i);
        this.addTpe(domainId, slotNo, 'tpe1', 1, cX, 5);
        this.addTpe(domainId, slotNo, 'tpe2', 2, cX, 15);
        this.addTpe(domainId, slotNo, 'tpe3', 3, cX, 25);
        this.addTpe(domainId, slotNo, 'tpe4', 4, cX, 35);
        this.addTpe(domainId, slotNo, 'tpe5', 5, cX, 45);
        this.addTpe(domainId, slotNo, 'tpe6', 6, cX, 55);
        this.addTpe(domainId, slotNo, 'tpe7', 7, cX, 65);
        this.addTpe(domainId, slotNo, 'tpe8', 8, cX, 75);
        this.addTpe(domainId, slotNo, 'tpe9', 9, cX, 85);
        this.addTpe(domainId, slotNo, 'tpe10', 10, cX, 95);
        this.addTpe(domainId, slotNo, 'tpe11', 11, cX, 105);
        }

  }
  render(id) {
        var w = this.w;
        var h = this.h;

        var p = this.props;
        var dId = id.replace(/^\#+|\#+$/g, '');
        console.log('dId:', dId);

        this.g = d3.select(id).append('svg').attr('width', w).attr('height', h).attr('viewBox', '0 0 130 130').append('g')
        .attr('id', dId+'_tpes');
        var g = this.g;
        g.append('rect').attr('width', '100%').attr('height', '100%').style('stroke', p.stroke).style('fill', p.col1);

        this.drawSlot('slot1', 1, 0, 0);
        this.drawSlot('slot2', 2, 20, 0);
        this.drawSlot('slot3', 3, 40, 0);
        this.drawSlot('slot4', 4, 60, 0);
        this.drawSlot('slot5', 5, 80, 0);
        this.drawSlot('slot6', 6, 100, 0);
        this.drawSlot('slot7', 7, 120, 0);

        this.fillTpe(dId);
  }


}

export class Fre {

}

@Injectable({
  providedIn: 'root'
})
export class NetworkvizService {

    directions:any;

  constructor() {
    this.directions = {
        "Top": 1,
        "TopRight": 2,
        "Right": 3,
        "RightBottom": 4,
        "Bottom": 5,
        "BottomLeft": 6,
        "Left": 7,
        "LeftTop": 8
    }
  }

  createDomain(w, h) {
    var d = new Domain(w, h);
    return d;
  }



  getLocationDirection(loc1, loc2) {
     var xdiff = loc2.x - loc1.x;
     var ydiff = loc2.y - loc1.y;

     if (( xdiff > -200 || xdiff < 200) && ( ydiff > 300 )) {
        return this.directions.Bottom;
     }

     if (( xdiff > -200 || xdiff < 200) && ( ydiff < -300 )) {
        return this.directions.Top;
     }

     if (( ydiff > -200 || ydiff < 200) && ( xdiff > 300 )) {
        return this.directions.Right;
     }

     if (( ydiff > -200 || ydiff < 200) && ( xdiff < -300 )) {
        return this.directions.Left;
     }

     if (( xdiff > 0 ) && ( ydiff > 100 ) ){
        return this.directions.Left;
     }

  }

  genPathData(loc1, loc2) {
    var pathData = 'M '

  }

  createLink(elem, l) {
    var svg = d3.select(elem).select('svg#top');

    var g2 = d3.select('#'+l.d1).select('#'+l.d1+'_tpes').select('#'+l.s1).select('#'+l.t1).select('circle');
    var loc = this.getLocation(svg, g2);

    console.log('x', g2.attr('x'));

   // svg.append('circle').attr('cx', loc.x).attr('cy', loc.y).attr('r', 20).style('stroke', 'red')
    //.style('fill', 'none')

    var tpe2 = d3.select('#'+l.d2).select('#'+l.d2+'_tpes').select('#'+l.s2).select('#'+l.t2).select('circle');
    var loc2 = this.getLocation(svg, tpe2);
    //svg.append('circle').attr('cx', loc2.x).attr('cy', loc2.y).attr('r', 20).style('stroke', 'red')
    //.style('fill', 'none')

    svg.select('g#links').append('path')
    .attr('d', 'M'+loc.x+' '+loc.y+' C '+(loc.x - 80)+' '+loc.y+', '+(loc2.x-80)+' '+loc2.y+', '+loc2.x+' '+loc2.y)
    .attr('fill', 'none')
     .attr("stroke-width", 1)
    .attr('stroke', 'green')
  }

  createSingleDomainLink(elem, l){
    var svg = d3.select(elem).select('svg#top');

    var g2 = d3.select('#'+l.d1).select('#'+l.d1+'_tpes').select('#'+l.s1).select('#'+l.t1).select('circle');
    var loc = this.getLocation(svg, g2);

    console.log('x', g2.attr('x'));

   // svg.append('circle').attr('cx', loc.x).attr('cy', loc.y).attr('r', 20).style('stroke', 'red')
    //.style('fill', 'none')

    var tpe2 = d3.select('#'+l.d2).select('#'+l.d2+'_tpes').select('#'+l.s2).select('#'+l.t2).select('circle');
    var loc2 = this.getLocation(svg, tpe2);
    //svg.append('circle').attr('cx', loc2.x).attr('cy', loc2.y).attr('r', 20).style('stroke', 'red')
    //.style('fill', 'none')

    svg.select('g#links').append('path')
    //.attr('d', 'M'+loc.x+' '+loc.y+' C '+(loc.x - 80)+' '+loc.y+', '+(loc2.x-80)+' '+loc2.y+', '+loc2.x+' '+loc2.y)
    .attr('d', 'M'+loc.x+' '+loc.y+' C '+(loc.x + 80)+' '+(loc.y-20)+', '+(loc2.x-80)+' '+(loc2.y-20)+', '+loc2.x+' '+loc2.y)
    .attr('fill', 'none')
     .attr("stroke-width", 1)
    .attr('stroke', 'red')
  }

  createRightBottomLink(elem, l){
    var svg = d3.select(elem).select('svg#top');

    var g2 = d3.select('#'+l.d1).select('#'+l.d1+'_tpes').select('#'+l.s1).select('#'+l.t1).select('circle');
    var loc = this.getLocation(svg, g2);

    console.log('x', g2.attr('x'));

   // svg.append('circle').attr('cx', loc.x).attr('cy', loc.y).attr('r', 20).style('stroke', 'red')
    //.style('fill', 'none')

    var tpe2 = d3.select('#'+l.d2).select('#'+l.d2+'_tpes').select('#'+l.s2).select('#'+l.t2).select('circle');
    var loc2 = this.getLocation(svg, tpe2);
    //svg.append('circle').attr('cx', loc2.x).attr('cy', loc2.y).attr('r', 20).style('stroke', 'red')
    //.style('fill', 'none')

    svg.select('g#links').append('path')
    .attr('d', 'M'+loc.x+' '+loc.y+' C '+(loc.x - 380)+' '+(loc.y+350)+', '+(loc2.x-80)+' '+(loc2.y-150)+', '+loc2.x+' '+loc2.y)
    .attr('fill', 'none')
     .attr("stroke-width", 1)
    .attr('stroke', 'red')
  }
  createRightTopLink(elem, l){
    var svg = d3.select(elem).select('svg#top');

    var g2 = d3.select('#'+l.d1).select('#'+l.d1+'_tpes').select('#'+l.s1).select('#'+l.t1).select('circle');
    var loc = this.getLocation(svg, g2);

    console.log('x', g2.attr('x'));

   // svg.append('circle').attr('cx', loc.x).attr('cy', loc.y).attr('r', 20).style('stroke', 'red')
    //.style('fill', 'none')

    var tpe2 = d3.select('#'+l.d2).select('#'+l.d2+'_tpes').select('#'+l.s2).select('#'+l.t2).select('circle');
    var loc2 = this.getLocation(svg, tpe2);
    //svg.append('circle').attr('cx', loc2.x).attr('cy', loc2.y).attr('r', 20).style('stroke', 'red')
    //.style('fill', 'none')

    svg.select('g#links').append('path')
    .attr('d', 'M'+loc.x+' '+loc.y+' C '+(loc.x - 280)+' '+(loc.y-250)+', '+(loc2.x-80)+' '+(loc2.y+50)+', '+loc2.x+' '+loc2.y)
    .attr('fill', 'none')
     .attr("stroke-width", 1)
    .attr('stroke', 'red')
  }

  createLeft1(elem, l){
    var svg = d3.select(elem).select('svg#top');

    var g2 = d3.select('#'+l.d1).select('#'+l.d1+'_tpes').select('#'+l.s1).select('#'+l.t1).select('circle');
    var loc = this.getLocation(svg, g2);

    console.log('x', g2.attr('x'));

   // svg.append('circle').attr('cx', loc.x).attr('cy', loc.y).attr('r', 20).style('stroke', 'red')
    //.style('fill', 'none')

    var tpe2 = d3.select('#'+l.d2).select('#'+l.d2+'_tpes').select('#'+l.s2).select('#'+l.t2).select('circle');
    var loc2 = this.getLocation(svg, tpe2);
    //svg.append('circle').attr('cx', loc2.x).attr('cy', loc2.y).attr('r', 20).style('stroke', 'red')
    //.style('fill', 'none')

    svg.select('g#links').append('path')
    .attr('d', 'M'+loc.x+' '+loc.y+' C '+(loc.x - 280)+' '+(loc.y+450)+', '+(loc2.x-80)+' '+(loc2.y-150)+', '+loc2.x+' '+loc2.y)
    .attr('fill', 'none')
     .attr("stroke-width", 1)
    .attr('stroke', 'red')
  }

  createRight1(elem, l){
    var svg = d3.select(elem).select('svg#top');

    var g2 = d3.select('#'+l.d1).select('#'+l.d1+'_tpes').select('#'+l.s1).select('#'+l.t1).select('circle');
    var loc = this.getLocation(svg, g2);

    console.log('x', g2.attr('x'));

   // svg.append('circle').attr('cx', loc.x).attr('cy', loc.y).attr('r', 20).style('stroke', 'red')
    //.style('fill', 'none')

    var tpe2 = d3.select('#'+l.d2).select('#'+l.d2+'_tpes').select('#'+l.s2).select('#'+l.t2).select('circle');
    var loc2 = this.getLocation(svg, tpe2);
    //svg.append('circle').attr('cx', loc2.x).attr('cy', loc2.y).attr('r', 20).style('stroke', 'red')
    //.style('fill', 'none')

    svg.select('g#links').append('path')
    .attr('d', 'M'+loc.x+' '+loc.y+' C '+(loc.x - 280)+' '+(loc.y-250)+', '+(loc2.x-80)+' '+(loc2.y+150)+', '+loc2.x+' '+loc2.y)
    .attr('fill', 'none')
     .attr("stroke-width", 1)
    .attr('stroke', 'red')
  }

  getLocation(svg, elem) {
    var node = elem.node().getBoundingClientRect();
    var pt = svg.node().createSVGPoint();

    pt.x = node.x + (node.width/2);
    pt.y = node.y + (node.height/2);
    var svgP = pt.matrixTransform(svg.node().getScreenCTM().inverse());
    console.log('svgP', svgP)
    return svgP
  }

}
