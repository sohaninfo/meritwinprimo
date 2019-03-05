import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3'
import { MsgComponent } from '../components/msg/msg.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    d3.select('p#p1').style('color', 'blue');
    }
}
