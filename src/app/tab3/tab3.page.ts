import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import { Chart } from 'chart.js/auto';
import {FileSharer} from '@byteowls/capacitor-filesharer';
import {ResultService} from '../services/result.service';
import regression from 'regression';
import {ViewDidEnter} from "@ionic/angular";

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements AfterViewInit,ViewDidEnter{
  @ViewChild('lineCanvas') private lineCanvas: ElementRef;
  @ViewChild('content') private invento: ElementRef;
  lineChart: Chart;
  data;
  options;
  constructor( private readonly http: ResultService, private renderer: Renderer2, private el: ElementRef) {
  }
  chartInitialization(){
    if (this.http.lastResult){
      const results = this.http.lastResult.results.map((result) => [result.nElements,result.computedTime]);
      const linear = regression.linear(results);
      const exponential = regression.exponential(results);
      const logarithmic = regression.logarithmic(results);
      const power = regression.power(results);
      const bestFitting = [linear,exponential,logarithmic,power].sort((a,b) => b.r2 - a.r2)[0];
      const labels = results.map((result) => result[0]);
      const data = results.map((result) => result[1]);
      const predicted = results.map((point) => bestFitting.predict(point[0]));
      this.data = {
        labels,
        datasets: [
          {
            label: 'Tiempo de ejecución',
            data,
            fill: false,
            borderColor: '#FF0000',
            borderWidth: 1
          },
          {
            label: 'Ajuste',
            data: predicted,
            fill: false,
            borderColor: '#00FF00',
            borderWidth: 1
          }
        ]
      };
      this.options = {
        responsive: true,
        maintainAspectRatio: false
      };
    }
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit');
    this.chartInitialization();
    this.lineChartMethod();
  }

  lineChartMethod() {
    const div = document.getElementById("contenido");
    console.log(div);
    div.innerHTML='';
/*try {
  this.lineChart = new Chart(this.lineCanvas.nativeElement, {
    type: 'line',
    data: this.data, options: this.options
  });
}catch (e) {}*/

    const canvas = document.createElement("canvas");
    div.appendChild(canvas);
    try{
    this.lineChart = new Chart(canvas, {
      type: 'line',
      data: this.data ,options: this.options
    });
    }catch (e) {}


  }
  shareImage2() {
    FileSharer.share({
        filename: 'chart.png',
        contentType: 'image/png',
        base64Data: this.lineChart.toBase64Image().replace(/^data:image\/[a-z]+;base64,/, ''),
    }).then(() => {
        // do sth
    }).catch(error => {
        console.error('File sharing failed', error.message);
    });
  }

  ionViewDidEnter(): void {
    console.log('ionViewDidEnter');
    this.chartInitialization();
    this.lineChartMethod();
  }
}
