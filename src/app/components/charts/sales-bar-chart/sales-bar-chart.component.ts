import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SALES } from '../charts-data/sales';
import * as d3 from 'd3';
import * as d3Scale from 'd3-scale';
import * as d3Axis from 'd3-axis';

@Component({
  selector: 'app-sales-bar-chart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './sales-bar-chart.component.html',
  styleUrls: ['./sales-bar-chart.component.scss'],
})
export class SalesBarChartComponent implements OnInit {
  title = 'Sales to Date:';

  private width: number = 750;
  private height: number = 350;
  private margin = { top: 20, right: 20, bottom: 30, left: 60 };

  private x: any;
  private y: any;
  private svg: any;
  private g: any;

  constructor() {}

  ngOnInit(): void {
    this.initSvg();
    this.initAxis();
    this.drawAxis();
    this.drawBars();
  }

  initSvg() {
    this.svg = d3.select('#sales-bar-chart');

    this.width = +this.svg.attr('width') - this.margin.left - this.margin.right;
    this.height =
      +this.svg.attr('height') - this.margin.top - this.margin.bottom;

    this.g = this.svg
      .append('g')
      .attr(
        'transform',
        'translate(' + this.margin.left + ',' + this.margin.top + ')'
      );
  }

  initAxis() {
    this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);

    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);

    this.x.domain(SALES.map((d) => d.month));
    this.y.domain([0, d3.max(SALES, (d) => d.value)]);
  }

  drawAxis() {
    this.g
      .append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x))
      .append('text')
      .attr('class', 'axis-title')
      .attr('font-size', '14px')
      .attr('x', 330)
      .attr('y', 30)
      .attr('dx', '.65em')
      .text('Month/Year');

    this.g
      .append('g')
      .attr('class', 'axis axis--y')
      .call(d3Axis.axisLeft(this.y).ticks(10))
      .append('text')
      .attr('class', 'axis-title')
      .attr('transform', 'rotate(-90)')
      .attr('y', -45)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Sales (units)');
  }

  drawBars() {
    //draw the bars with a transition on initial load
    this.g
      .selectAll('.bar')
      .data(SALES)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d: any) => this.x(d.month))
      .attr('y', (d: any) => this.y(d.value))
      .attr('width', this.x.bandwidth())
      .transition()
      .ease(d3.easeLinear)
      .duration(500)
      .delay(function (d: any, i: any) {
        return i * 50;
      })
      .attr('height', (d: any) => this.height - this.y(d.value));

    // append the tooltip after the bars are drawn
    this.g
      .selectAll('.bar')
      .append('title')
      .text((d: any) => `${d.value} Units Sold in ${d.month}`);
  }
}
