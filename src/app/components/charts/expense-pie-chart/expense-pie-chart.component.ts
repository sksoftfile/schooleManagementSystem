import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import { EXPENSES } from '../charts-data/store-expenses';

@Component({
  selector: 'app-expense-pie-chart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './expense-pie-chart.component.html',
  styleUrls: ['./expense-pie-chart.component.scss'],
})
export class ExpensePieChartComponent implements OnInit {
  title = 'Monthly Expenses:';

  private margin = { top: 20, right: 20, bottom: 30, left: 500 };
  private width: number = 350;
  private height: number = 350;
  private radius: number = Math.min(this.width, this.height) / 2;

  private arc: any;
  private labelArc: any;
  private pie: any;
  private color: any;
  private svg: any;

  private hoverArc = d3
    .arc()
    .innerRadius(0)
    .outerRadius(this.radius + 50);

  constructor() {}

  ngOnInit(): void {
    this.initSvg();
    this.drawPie();
  }

  private initSvg() {
    this.color = d3Scale
      .scaleOrdinal()
      .range([
        '#6d4b4b',
        '#503f3f',
        '#333333',
        '#3c4e4b',
        '#466964',
        '#599e94',
      ]);

    this.arc = d3Shape.arc().outerRadius(this.radius).innerRadius(30);

    this.labelArc = d3Shape
      .arc()
      .outerRadius(this.radius - 50)
      .innerRadius(this.radius - 50);

    this.pie = d3Shape
      .pie()
      .sort(null)
      .value((d: any) => d.value);

    this.svg = d3
      .select('#expense-pie-chart')
      .append('g')
      .attr(
        'transform',
        'translate(' + this.width / 2 + ',' + this.height / 2 + ')'
      );
  }
  private drawPie() {
    let g = this.svg
      .selectAll('.arc')
      .data(this.pie(EXPENSES))
      .enter()
      .append('g')
      .attr('class', 'arc');

    g.append('path')
      .attr('d', this.arc)
      .style('fill', (d: any) => this.color(d.data.expense));

    g.append('text')
      .attr(
        'transform',
        (d: any) => 'translate(' + this.labelArc.centroid(d) + ')'
      )
      .attr('dy', '.35em')
      .style('text-anchor', 'middle')
      .attr('class', 'expense-pie-chart-label')
      .text((d: any) => d.data.expense)
      .append('tspan')
      .attr('x', 0)
      .attr('dy', '1.2em')
      .style('font-size', '0.9em')
      .text((d: any) => d.data.value + '$');
  }
}
