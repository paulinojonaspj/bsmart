import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts/highstock';
import { LoginServiceService, rAuth } from '../login/login-service.service';
import { NavigationEnd, Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { ResumoComponent } from '../resumo/resumo.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [HeaderComponent, HighchartsChartModule,RouterModule,RouterOutlet,RouterLink,ResumoComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export default class AdminComponent{


  rotaAtual: string;

  constructor(private router: Router) {
    this.rotaAtual = this.router.url;
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.rotaAtual = this.router.url;
        console.log( this.router.url);

      }
    });
  }

}
