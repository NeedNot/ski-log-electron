import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AgCharts } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import { SkiSet } from '../../../../types';

@Component({
  selector: 'app-score-chart',
  imports: [AgCharts],
  templateUrl: './score-chart.html',
})
export class ScoreChart implements OnInit {
  @Input() sets!: SkiSet[];
  public chartOptions: AgChartOptions = {};

  ngOnInit(): void {
    const dataMap = new Map<string, number>();
    let min = Number.MAX_SAFE_INTEGER;
    this.sets.forEach((set) => {
      const day = set.date.toISOString();
      if (dataMap.has(day)) {
        dataMap.set(day, (dataMap.get(day)! + set.score) / 2);
      } else {
        dataMap.set(day, set.score);
      }
      min = Math.min(min, set.score);
    });
    this.chartOptions = {
      padding: {
        left: 0,
        right: 14,
        top: 0,
        bottom: 0,
      },
      title: {
        text: 'Average set score by day',
      },
      axes: {
        x: {
          type: 'time',
        },
        y: {
          min: Math.max(0, min - 10),
        },
      },
      // Data: Data to be displayed in the chart
      data: Array.from(dataMap)
        .map(([day, score]) => ({ date: new Date(day), value: score }))
        .reverse(),
      // Series: Defines which chart type and data to use
      series: [
        {
          type: 'line',
          label: {
            enabled: true,
          },
          xKey: 'date',
          yKey: 'value',
          yName: 'Avg Score',
        },
      ],
    };
  }
}
