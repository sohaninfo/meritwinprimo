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
        this.addTpe(domainId, slotNo, 'tpe12', 12, cX, 115);
        }

  }
  render(id, w, h) {
        //var w = this.w;
        //var h = this.h;

        var p = this.props;
        this.g = d3.select('#'+id).append('svg').attr('width', w).attr('height', h).attr('viewBox', '0 0 130 130').append('g')
        .attr('id', id+'_tpes');
        var g = this.g;
        g.append('rect').attr('width', '100%').attr('height', '100%').style('stroke', p.stroke).style('fill', p.col1);

        this.drawSlot('slot1', 1, 0, 0);
        this.drawSlot('slot2', 2, 20, 0);
        this.drawSlot('slot3', 3, 40, 0);
        this.drawSlot('slot4', 4, 60, 0);
        this.drawSlot('slot5', 5, 80, 0);
        this.drawSlot('slot6', 6, 100, 0);
        this.drawSlot('slot7', 7, 120, 0);

        this.fillTpe(id);
  }

  renderNodes(id) {
        var w = this.w;
        var h = this.h;

        var g = d3.select('#'+id).append('svg')
            .attr('width', w)
            .attr('height', h).attr('viewBox', '0 0 100 210').append('g')

        var node1Id = id+'_node1';
        var node2Id = id+'_node2';
        g.append('g')
          .attr('id', node1Id)
          .attr('transform', 'translate('+0+', '+0+')')

        g.append('g')
          .attr('id', node2Id)
          .attr('transform', 'translate('+0+', '+110+')')

        this.render(node1Id, 100, 100);
        this.render(node2Id, 100, 100);
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

  getPaths(inp) {
    var r = [];
    var l1 = inp.l1;
    var l2 = inp.l2;
    var e = inp.e;
    var w = e.w;
    var h = e.h;
    console.log("w:", w);
    console.log("h:", h);

    var str = e.t1;
    var nt1 = str.replace( /^\D+/g, '');
    console.log("tpe 1:", nt1);
    str = e.s1;
    var ns1 = str.replace( /^\D+/g, '');
    console.log("slot 1:", ns1);
    var dis1 = (w*35/100)-(nt1*5)+(ns1*20);
    var p1x = l1.x - (w*35/100)+(nt1*5)-(ns1*20);

    str = e.t2;
    var nt2 = str.replace( /^\D+/g, '');
    console.log("tpe 2:", nt2);
    str = e.s2;
    var ns2 = str.replace( /^\D+/g, '');
    console.log("slot 2:", ns2);
    var dis2 = (w*35/100)-(nt2*5)+(ns2*20);
    var p2x = l2.x - (w*35/100)+(nt2*5)-(ns2*20);

    var srcX = p1x;
    var srcY = l1.y;
    var destX = p2x;
    var destY = l2.y;
    var lines = e.lines;

    var leftYCrossing = (x, y) => {
        var cross = [];

        for(var i = 0; i < lines.length; i++) {
            var ln = lines[i];
            if(ln.y1 < y && ln.y2 > y && ln.x1 < x && ln.x2 > destX) {
                cross.push(ln);
            }
        }

        return cross;
    }

    var rightYCrossing = (x, y) => {
        var cross = [];

        for(var i = 0; i < lines.length; i++) {
            var ln = lines[i];
            if(ln.y1 < y && ln.y2 > y && ln.x1 > x && ln.x2 < destX) {
                cross.push(ln);
            }
        }

        return cross;
    }

    var upXCrossing = (x, y) => {
        var cross = [];
        for(var i = 0; i < lines.length; i++) {
            var ln = lines[i];
            if(ln.x1 < x && ln.x2 > x && ln.y1 < y && ln.y2 > destY) {
                cross.push(ln);
            }
        }

        return cross;
    }

    var downXCrossing = (x, y) => {
        var cross = [];
        for(var i = 0; i < lines.length; i++) {
            var ln = lines[i];
            if(ln.x1 < x && ln.x2 > x && ln.y1 > y && ln.y2 < destY) {
                cross.push(ln);
            }
        }

        return cross;
    }

    var maxXinCrossings = (x, y, crossings) => {
        var sln = null;
        if (crossings.length > 0) {
            sln = crossings[0];
            for(var i = 0; i < crossings.length; i++) {
                var ln = crossings[i];
                if (ln.x1  > sln.x1) sln = ln;
            }
        }

        return sln;
    }

    var minXinCrossings = (x, y, crossings) => {
        var sln = null;
        if (crossings.length > 0) {
            sln = crossings[0];
            for(var i = 0; i < crossings.length; i++) {
                var ln = crossings[i];
                if (ln.x1  < sln.x1) sln = ln;
            }
        }

        return sln;
    }

    var maxYinCrossings = (x, y, crossings) => {
        var sln = null;
        if (crossings.length > 0) {
            sln = crossings[0];
            for(var i = 0; i < crossings.length; i++) {
                var ln = crossings[i];
                if (ln.y1  > sln.y1) sln = ln;
            }
        }

        return sln;
    }

    var minYinCrossings = (x, y, crossings) => {
        var sln = null;
        if (crossings.length > 0) {
            sln = crossings[0];
            for(var i = 0; i < crossings.length; i++) {
                var ln = crossings[i];
                if (ln.y1  < sln.y1) sln = ln;
            }
        }

        return sln;
    }

    var  getMinY = (x, y) => {
        var cross = [];
        var my = destY;

        for(var i = 0; i < lines.length; i++) {
            var ln = lines[i];
            if(ln.x1 < x && ln.x2 > x && ln.y1 > y && ln.y2 < destY) {
                cross.push(ln);
            }
        }

        if (cross.length > 0) {
            for(var i = 0; i < lines.length; i++) {
                var ln = cross[i];
                if(ln.y < my) my = ln.y
            }

        }

        //What would be the next move
        if (isRight(x, my)) {
            //
            var crossings = rightYCrossing(x, my);
            var sln = minXinCrossings(x, my, crossings);
            if (sln) {
               var ny = sln.y1 < sln.y2 ? sln.y1 : sln.y2;
               if (ny > y) my = ny-dis1;
               else {
                 ny = sln.y1 > sln.y2 ? sln.y1 : sln.y2;
                 if (ny > y) my = ny+dis1;
               }

            }

        } else if(isLeft(x, my)) {
            //If left move, ensure there is no blocking on left side. If it is decreas/increase accordingly
            var crossings = leftYCrossing(x, my);
            var sln = maxXinCrossings(x, my, crossings);
            if (sln) {
               var ny = sln.y1 < sln.y2 ? sln.y1 : sln.y2;
               if (ny > y) my = ny-dis1;
               else {
                 ny = sln.y1 > sln.y2 ? sln.y1 : sln.y2;
                 if (ny > y) my = ny+dis1;
               }
            }
        }

        return my;
    }

    var  getMaxY = (x, y) => {
        var cross = [];
        var my = destY;

        for(var i = 0; i < lines.length; i++) {
            var ln = lines[i];
            if(ln.x1 < x && ln.x2 > x && ln.y1 > y && ln.y2 < destY) {
                cross.push(ln);
            }
        }
        if (cross.length > 0) {
            for(var i = 0; i < lines.length; i++) {
                var ln = cross[i];
                if(ln.y > my) my = ln.y
            }

        }

        //What would be the next move
        if (isRight(x, my)) {
            //
            var crossings = rightYCrossing(x, my);
            var sln = minXinCrossings(x, my, crossings);
            if (sln) {
               var ny = sln.y1 > sln.y2 ? sln.y1 : sln.y2;
               if (ny > y) my = ny + dis1;
               else {
                 ny = sln.y1 < sln.y2 ? sln.y1 : sln.y2;
                 if (ny > y) my = ny - dis1;
               }
            }

        } else if(isLeft(x, my)) {
            //If left move, ensure there is no blocking on left side. If it is decreas/increase accordingly
            var crossings = leftYCrossing(x, my);
            var sln = maxXinCrossings(x, my, crossings);
            if (sln) {
               var ny = sln.y1 > sln.y2 ? sln.y1 : sln.y2;
               if (ny < y) my = ny+dis1;
               else {
                 ny = sln.y1 < sln.y2 ? sln.y1 : sln.y2;
                 if (ny < y) my = ny-dis1;
               }
            }
        }

        return my;
    }

    var  getMinX = (x, y) => {
        var cross = [];
        var mx = destX;

        for(var i = 0; i < lines.length; i++) {
            var ln = lines[0];
            if(ln.y1 < y && ln.y2 > y && ln.x1 > x && ln.x2 < destX) {
                cross.push(ln);
            }
        }
        if (cross.length > 0) {
            var ln = cross[0];
            for(var i = 0; i < lines.length; i++) {
                var ln = cross[i];
                if(ln.x1 < mx) mx = ln.x1
            }

        }

        //What would be the next move
        if (isUp(mx, y)) {
            //
            var crossings = upXCrossing(mx, y);
            var sln = maxYinCrossings(mx, y, crossings);
            if (sln) {
               var nx = sln.x1 < sln.x2 ? sln.x1 : sln.x2;
               if (nx > x) mx = nx;
               else {
                 nx = sln.x1 > sln.x2 ? sln.x1 : sln.x2;
                 if (nx > x) mx = nx;
               }
            }

        } else if(isDown(mx, y)) {
            var crossings = downXCrossing(mx, y);
            var sln = minYinCrossings(mx, y, crossings);
            if (sln) {
               var nx = sln.x1 < sln.x2 ? sln.x1 : sln.x2;
               if (nx > x) mx = nx;
               else {
                 nx = sln.x1 > sln.x2 ? sln.x1 : sln.x2;
                 if (nx > x) mx = nx;
               }
            }
        }

        return mx;
     }

    var  getMaxX = (x, y) => {
        var cross = [];
        var mx = destX;

        for(var i = 0; i < lines.length; i++) {
            var ln = lines[i];
            if(ln.y1 < y && ln.y2 > y && ln.x1 > x && ln.x2 < destX) {
                cross.push(ln);
            }
        }
        if (cross.length > 0) {
            for(var i = 0; i < lines.length; i++) {
                var ln = cross[i];
                if(ln.x > mx) mx = ln.x
            }

        }

        //What would be the next move
        if (isUp(mx, y)) {
            //
            var crossings = upXCrossing(mx, y);
            var sln = maxYinCrossings(mx, y, crossings);
            if (sln) {
               var nx = sln.x1 > sln.x2 ? sln.x1 : sln.x2;
               if (nx > x) mx = nx;
               else {
                 nx = sln.x1 < sln.x2 ? sln.x1 : sln.x2;
                 if (nx > x) mx = nx;
               }
            }

        } else if(isDown(mx, y)) {
            var crossings = downXCrossing(mx, y);
            var sln = minYinCrossings(mx, y, crossings);
            if (sln) {
               var nx = sln.x1 > sln.x2 ? sln.x1 : sln.x2;
               if (nx > x) mx = nx;
               else {
                 nx = sln.x1 < sln.x2 ? sln.x1 : sln.x2;
                 if (nx > x) mx = nx;
               }
            }
        }

        return mx;
     }

    var isDown  = (x, y) => {
        if (y < destY) return true;
        return false;
    }

    var isUp  = (x, y) => {
        if (y > destY) return true;
        return false;
    }

    var isRight  = (x, y) => {
        if (x < destX) return true;
        return false;
    }

    var isLeft  = (x, y) => {
        if (x > destX) return true;
        return false;
    }

    var cx = srcX;
    var cy = srcY;
    var count = 0;
    r.push([cx, cy]);
    while(count < 50) {
        if (cx == destX && cy == destY)break;
        console.log("Count:", count);
        count++;
        console.log("cx:", cx, ", cy:", cy);
        if(isDown(cx, cy)) {
           //Move down
            console.log("Moving down....");
            cy = getMinY(cx, cy);
            r.push([cx, cy]);
        }else if(isUp(cx, cy) || (count == 1 && isRight(cx, cy)) || (count == 1 && isLeft(cx, cy))) {
           //Move up
            console.log("Moving up....");
            cy = getMaxY(cx, cy);
            r.push([cx, cy]);
        }

        if (cx == destX && cy == destY)break;
        if(isRight(cx, cy)) {
           //Move right
            console.log("Moving right....");
            cx = getMinX(cx, cy);
            r.push([cx, cy]);
        }else if(isLeft(cx, cy)) {
           //Move left
            console.log("Moving left....");
            cx = getMaxX(cx, cy);
            r.push([cx, cy]);
        }

    }

    return r;
  }

  genPathData(inp) {
    var l1 = inp.l1;
    var l2 = inp.l2;
     var e = inp.e;
    var w = e.w;
    var h = e.h;
    console.log("w:", w);
    console.log("h:", h);

    var str = e.t1;
    var nt1 = str.replace( /^\D+/g, '');
    console.log("tpe 1:", nt1);

    str = e.s1;
    var ns1 = str.replace( /^\D+/g, '');
    console.log("slot 1:", ns1);

    var p1x = l1.x - (w*35/100)+(nt1*5)-(ns1*20);
    console.log('p1x: ', p1x);

    //var d = 'M'+loc.x+' '+loc.y+' C '+(loc.x - 80)+' '+loc.y+', '+(loc2.x-80)+' '+loc2.y+', '+loc2.x+' '+loc2.y;

/*
    var d = 'M'+l1.x+' '+l1.y
    var x1 = p1x;
    var y1 = l1.y;
    d = d+'C'+l1.x+' '+l1.y+', '+l1.x+' '+l1.y+', '+(x1)+' '+l1.y;

    var p2y = y1+(h*2) - (50);
    console.log("p2y:", p2y);
    var x2 = x1;
    var y2 = p2y;
    d = d + ' S'+x1+' '+y1+', '+x2+' '+y2

    var x3 = l2.x;
    var y3 = l2.y
    d = d + ' S'+x2+' '+y2+', '+x3+' '+y3
*/
    var d = 'M'+l1.x+' '+l1.y
    var paths = this.getPaths(inp);
    if (paths.length > 0 ){
        d = d+'C '+l1.x+' '+l1.y+', '+paths[0][0]+' '+paths[0][1]+', '+paths[0][0]+' '+paths[0][1];
        for (var i = 0; i < paths.length; i++) {
          d = d+'S '+paths[i][0]+' '+paths[i][1]+', '+paths[i][0]+' '+paths[i][1];
        }
        d = d+'S '+l2.x+' '+l2.y+', '+l2.x+' '+l2.y;
    } else {
        d = d+'C '+l1.x+' '+l1.y+', '+l2.x+' '+l2.y+', '+l2.x+' '+l2.y;
    }
    console.log("paths:", paths);

    console.log("d:", d);
    return d;

  }

  link(elem, l) {
    console.log('Links.............');
    var svg = d3.select(elem).select('svg#top');

    var id1 = '#'+l.d1;
    var id2 =  id1+'_'+l.n1;
    var id3 =  id2+'_tpes';
    console.log('Ids:', id1, id2, id3);
    var g2 = d3.select(id1).select(id2).select(id3).select('#'+l.s1).select('#'+l.t1).select('circle');
    var loc1 = this.getLocation(svg, g2);

    console.log('x', g2.attr('x'));

    id1 = '#'+l.d2;
    id2 =  id1+'_'+l.n1;
    id3 =  id2+'_tpes';
    console.log('tpe2 :Ids:', id1, id2, id3);
    var tpe2 = d3.select(id1).select(id2).select(id3).select('#'+l.s2).select('#'+l.t2).select('circle');
    var loc2 = this.getLocation(svg, tpe2);


    var  inp = {"e":l, "l1":loc1, "l2":loc2}
    svg.select('g#links').append('path')
    .attr('d', this.genPathData(inp))
    .attr('fill', 'none')
     .attr("stroke-width", 1)
    .attr('stroke', 'blue')
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
