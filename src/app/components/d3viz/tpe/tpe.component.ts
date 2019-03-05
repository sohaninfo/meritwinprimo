import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { NetworkvizService } from '../../../services/networkviz.service'

@Component({
  selector: 'app-tpe',
  templateUrl: './tpe.component.html',
  styleUrls: ['./tpe.component.css']
})
export class TpeComponent implements OnInit {

  constructor(private ns:NetworkvizService) { }

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

       var width = 1100, height = 1100;
       var svg = d3.select(elem).append('svg').attr('id', 'top').attr('width', width).attr('height', height);

       var g = svg.append('g')
                .attr('id', 'd1')
                .attr('transform', 'translate('+450+', '+50+')')

        svg.append('g')
                .attr('id', 'd1sim2')
                .attr('transform', 'translate('+450+', '+200+')')

       var g2 = svg.append('g')
                .attr('id', 'd2')
                .attr('transform', 'translate('+800+', '+300+')')
        svg.append('g')
                .attr('id', 'd2sim2')
                .attr('transform', 'translate('+800+', '+600+')')

        svg.append('g')
                .attr('id', 'd3sim1')
                .attr('transform', 'translate('+450+', '+600+')')

        svg.append('g')
                .attr('id', 'd3sim2')
                .attr('transform', 'translate('+450+', '+800+')')


        svg.append('g')
                .attr('id', 'd4')
                .attr('transform', 'translate('+100+', '+300+')')

        svg.append('g')
                .attr('id', 'd4sim2')
                .attr('transform', 'translate('+100+', '+500+')')


       var g3 = svg.append('g')
                .attr('id', 'links');


        var d = this.ns.createDomain(100, 100);
        d.render('#d1')
        var d1sim2 = this.ns.createDomain(100, 100);
        d1sim2.render('#d1sim2')

        var d2 = this.ns.createDomain(100, 100);
        d2.render('#d2')
        var d2sim2 = this.ns.createDomain(100, 100);
        d1sim2.render('#d2sim2')

        var d3sim1 = this.ns.createDomain(100, 100);
        d3sim1.render('#d3sim1')

        var d3sim2 = this.ns.createDomain(100, 100);
        d3sim2.render('#d3sim2')

        var dom4 = this.ns.createDomain(100, 100);
        dom4.render('#d4')

        var d4sim2 = this.ns.createDomain(100, 100);
        d4sim2.render('#d4sim2')

        var l = {
            "d1": "d3sim1",
            "s1": "slot1",
            "t1": "tpe1",
            "d2": "d2",
            "s2": "slot1",
            "t2": "tpe1"
        }
        for (var i = 1; i <= 10; i++){
            l.t1 = 'tpe'+i
            l.t2 = 'tpe'+i
            this.ns.createRight1(elem, l);
        }
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
        for (var i = 1; i <= 10; i++){
            l.t1 = 'tpe'+i
            l.t2 = 'tpe'+i
            this.ns.createRightBottomLink(elem, l);
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


  }

}
