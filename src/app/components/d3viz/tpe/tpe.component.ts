import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { NetworkvizService } from '../../../services/networkviz.service'

@Component({
  selector: 'app-tpe',
  templateUrl: './tpe.component.html',
  styleUrls: ['./tpe.component.css']
})
export class TpeComponent implements OnInit {
  outerWidth:number;
  outerHeight:number;
  width:number;
  height:number;

  constructor(private ns:NetworkvizService) {
    //this.outerWidth = 2200;
    this.outerWidth = 1200;
    this.outerHeight = 2000;
    this.width = 100;
    this.height = 210;
    //this.width = 200;
    //this.height = 420;
  }

  ngOnInit() {
    this.draw('#tpe')
  }

  networkviz() {
    var d = this.ns.createDomain(200, 200);
  }


  addTpe(){
    //var g = this.g;

  }

  drawTpe(id, w, h) {

        var c = {};
        var g = d3.select(id).append('svg').attr('width', w).attr('height', h).attr('viewBox', '0 0 100 100').append('g');
        g.append('rect').attr('width', 100).attr('height', 100).style('stroke', 'red').style('fill', 'none');

       // g.append('circle').attr('cx', 0).attr('cy', 50).attr('r', 5).style('stroke', 'red').style('fill', 'none');
        //g.append('circle').attr('cx', 90).attr('cy', 10).attr('r', 5).style('stroke', 'red').style('fill', 'none');
        //g.append('circle').attr('cx', 10).attr('cy', 90).attr('r', 5).style('stroke', 'red').style('fill', 'none');
        //g.append('circle').attr('cx', 90).attr('cy', 90).attr('r', 5).style('stroke', 'red').style('fill', 'none');
        //g.append('circle').attr('cx', 50).attr('cy', 50).attr('r', 5).style('stroke', 'red').style('fill', 'none');

        c['x1'] = (w/100*10);
        c['y1'] = (h/100*10);
        c['x2'] = (w/100*50);
        c['y2'] = (h/100*50);
        c['x3'] = (w/100*10);
        c['y3'] = (h/100*90);
        return c;
  }

  draw(elem) {
       var margin = {"top": 50, "right": 50, "bottom": 50, "left": 50}
       var w = this.width;
       var h = this.height;

       var lines = [];
       var lc = (x1, y1) => {
          var o1 =  {"x1": x1, "y1": y1, "x2": x1+w, "y2": y1}
          var o2 =  {"x1": x1, "y1": y1, "x2": x1, "y2": y1+h}
          var o3 =  {"x1": x1+w, "y1": y1, "x2": x1+w, "y2": y1+h}
          var o4 =  {"x1": x1, "y1": y1+h, "x2": x1+w, "y2": y1+h}
          lines.push(o1);
          lines.push(o2);
          lines.push(o3);
          lines.push(o4);
       }


      // var width = 1100, height = 1100;
       var dis = (this.height - (this.width*2))*6;
       console.log("distance", dis);


       var svg = d3.select(elem).append('svg').attr('id', 'top').attr('width', this.outerWidth).attr('height', this.outerHeight);


       // SimA - node 1
       var s = (this.outerWidth/2)-(this.width + (dis/2));
       svg.append('g')
              .attr('id', 'd1node1')
              .attr('transform', 'translate('+s+', '+margin.top+')')

      lc(s, margin.top);

       // SimA - node 2
       var s2 = s + this.width + dis;
       svg.append('g')
                .attr('id', 'd1node2')
                .attr('transform', 'translate('+(s2)+', '+margin.top+')')
      lc(s2, margin.top);


       // SimB -node 1
       var s3 = s2+this.width+(dis*2);
       var sBy = this.height+margin.top+dis;
       svg.append('g')
                .attr('id', 'd2node1')
                .attr('transform', 'translate('+(s3)+', '+(sBy)+')')
      lc(s3, sBy);

       // SimB -node 2
       var s3 = s2+this.width+(dis*2);
       var sBx = s3+w+dis;
       var sBy = this.height+margin.top+dis;

       svg.append('g')
                .attr('id', 'd2node2')
                .attr('transform', 'translate('+(sBx)+', '+sBy+')')
      lc(sBx, sBy);

       // SimC -node 1
       var s4y = margin.top + (this.height*2) + (dis*2);
       svg.append('g')
                .attr('id', 'd3node1')
                .attr('transform', 'translate('+(s)+', '+(s4y)+')')
      lc(s, s4y);

       // SimC -node 2
       var sCx = s+this.width+dis;
       svg.append('g')
                .attr('id', 'd3node2')
                .attr('transform', 'translate('+(sCx)+', '+(s4y)+')')
      lc(sCx, s4y);

       // SimD -node 1
       var sDx = s  - (this.width*2) - (dis*2) - dis;
       svg.append('g')
                .attr('id', 'd4node1')
                .attr('transform', 'translate('+(sDx)+', '+(sBy)+')')
      lc(sDx, sBy);

       var sDx2 = sDx + this.width + dis;
       svg.append('g')
                .attr('id', 'd4node2')
                .attr('transform', 'translate('+(sDx2)+', '+(sBy)+')')
      lc(sDx2, sBy);



       var g3 = svg.append('g')
                .attr('id', 'links');


        var d = this.ns.createDomain(this.width, this.height);
        d.renderNodes('d1node1')

        var d2node2 = this.ns.createDomain(this.width, this.height);
        d2node2.renderNodes('d1node2')

        var d2 = this.ns.createDomain(this.width, this.height);
        d2.renderNodes('d2node1')
        var d2node1 = this.ns.createDomain(this.width, this.height);
        d2node1.renderNodes('d2node2')

        var d3node1 = this.ns.createDomain(this.width, this.height);
        d3node1.renderNodes('d3node1')
        var d3node2 = this.ns.createDomain(this.width, this.height);
        d3node2.renderNodes('d3node2')

        var d4node1 = this.ns.createDomain(this.width, this.height);
        d4node1.renderNodes('d4node1')
        var d4node2 = this.ns.createDomain(this.width, this.height);
        d4node2.renderNodes('d4node2')

        var l = {
            "d1": "d1node1",
            "n1": "node1",
            "s1": "slot1",
            "t1": "tpe1",
            "d2": "d2node1",
            "n2": "node2",
            "s2": "slot1",
            "t2": "tpe1",
            "w": this.width,
            "h": this.height,
            "lines": lines
        }
        for (var i = 1; i <= 10; i++){
            l.t1 = 'tpe'+i
            l.t2 = 'tpe'+i
            this.ns.link(elem, l);
        }
console.log(lines);
/*
        l.d1 = 'd1'
        l.d2 = 'd3sim1'
        for (var i = 1; i <= 10; i++){
            l.t1 = 'tpe'+i
            l.t2 = 'tpe'+i
            this.ns.createLink(elem, l);
        }

        l.d1 = 'd4'
        l.d2 = 'd1'
        for (var i = 1; i <= 10; i++){
            l.t1 = 'tpe'+i
            l.t2 = 'tpe'+i
            this.ns.createRightTopLink(elem, l);
        }

        l.d1 = 'd1'
        l.d2 = 'd2'
        l.s1 = 'slot1'
        for (var i = 1; i <= 10; i++){
            l.t1 = 'tpe'+i
            l.t2 = 'tpe'+i
            this.ns.link(elem, l);
        }

        l.d1 = 'd4'
        l.d2 = 'd3sim1'
        for (var i = 1; i <= 10; i++){
            l.t1 = 'tpe'+i
            l.t2 = 'tpe'+i
            this.ns.createLeft1(elem, l);
        }

        l.t1 = 'tpe4'
        l.s1 = 'slot2'
        l.d2 = 'd1'
        l.s2 = 'slot6'
        l.t2 = 'tpe1'
        this.ns.createSingleDomainLink(elem, l);

        //this.ns.createSingleDomainLink(elem, l);

       // var c1 = this.drawTpe('#d1', 200, 200)
        //var c2 = this.drawTpe('#d2', 100, 100)
       // console.log('c1[x1]:', c1['x1']);
        //svg.append('circle').attr('cx', 60).attr('cy', 60).attr('r', 5).style('stroke', 'red').style('fill', 'blue');
        //svg.append('circle').attr('cx', 140).attr('cy', 140).attr('r', 5).style('stroke', 'red').style('fill', 'blue');
        //svg.append('line').attr('x1', c1['x1']+50).attr('y1', c1['y1']+50).attr('x2', c2['x1']+600).attr('y2', c2['y1']+50).style('stroke', 'red').style('fill', 'blue');
        //svg.append('line').attr('x1', c1['x2']+50).attr('y1', c1['y2']+50).attr('x2', c2.x2+600).attr('y2', c2.y2+50).style('stroke', 'blue').style('fill', 'blue');
        //svg.append('line').attr('x1', c1.x3+50).attr('y1', c1.y3+50).attr('x2', c2.x3+600).attr('y2', c2.y3+50).style('stroke', 'blue').style('fill', 'blue');
*/

  }

}
