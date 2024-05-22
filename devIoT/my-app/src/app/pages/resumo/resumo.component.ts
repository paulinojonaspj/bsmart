import { Component, ElementRef, NgModule, OnInit, ViewChild, inject } from '@angular/core';
import { LoginServiceService } from '../login/login-service.service';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Objetivo } from '../objetivos/objetivo';
import { BaseService } from '../../base.service';
import { Consumo, Interruptor, InterruptorPost, ResumoService } from './resumo.service';
import { replaceDecimalSeparator } from '../../pipe';
import { CommonModule } from '@angular/common';
import { IUtilizador } from '../contratos/IUtilizador';

@Component({
  selector: 'app-resumo',
  standalone: true,
  imports: [HighchartsChartModule, HighchartsChartModule, FormsModule, replaceDecimalSeparator, CommonModule, ReactiveFormsModule],
  templateUrl: './resumo.component.html',
  styleUrl: './resumo.component.css'
})
export class ResumoComponent implements OnInit {
  barras: typeof Highcharts = Highcharts;
  form!: FormGroup;
  registar = 0;
  ano = 2024;
  mes = this.obterMesAtual();
  // Obtém a data atual
  dataAtual = new Date();
  // Obtém o dia do mês
  diaAtual = this.dataAtual?.getDate();

  ultimaDataDoMes = new Date(this.ano, this.mesParaNumeroInteiro(this.mes), 0);
  // Obtém o dia do mês da última data
  diasMes = this.ultimaDataDoMes.getDate();


  objetivos: Objetivo[] = [];
  notificacao: Objetivo[] = [];
  filtroObjetivosAgua?: Objetivo;
  filtroObjetivosEnergia?: Objetivo;
  consumoAguaTable: Consumo[] = [];
  consumoEnergiaTable: Consumo[] = [];
  realizacaoAgua = 0;
  realizacaoEnergia = 0;
  previstoAgua = 0;
  previstoEnergia = 0;
  objetivoAgua = 0;
  objetivoEnergia = 0;

  faturacaoAgua = 0;
  faturacaoEnergia = 0;

  precoConsumoAgua = 0;
  precoConsumoEnergia = 0;
  precoConsumoEnergiaMdia = 0;

  precoFixoAgua = 0;
  precoFixoEnergia = 0;
  iRemover = 0;

  chartOptions: Highcharts.Options = {};

  interruptor: Interruptor[] = [];

  @ViewChild('chartAnual', { static: true }) chartAnual!: ElementRef;
  @ViewChild('chartDiarioMensal', { static: true }) chartDiarioMensal!: ElementRef;
  @ViewChild('chartGaugeAgua', { static: true }) chartGaugeAgua!: ElementRef;
  @ViewChild('chartGaugeEnergia', { static: true }) chartGaugeEnergia!: ElementRef;
  @ViewChild('chartGaugePrevistoAgua', { static: true }) chartGaugePrevistoAgua!: ElementRef;
  @ViewChild('chartGaugePrevistoEnergia', { static: true }) chartGaugePrevistoEnergia!: ElementRef;

  authservice = inject(LoginServiceService);
  private serviceBase = inject(BaseService);
  private resumoService = inject(ResumoService);

  constructor(private formBuilder: FormBuilder) {

    this.serviceBase.objetivoService.getNotificacao().subscribe(res => {
      this.notificacao = res;

    })



  }


  getNotificacao(tipo: string) {
    const notificacao = this.notificacao.find(e => e.ano == this.ano && e.tipo === tipo);

    if (!notificacao) {
      return 0;
    }

    const meses = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const mesIndex = new Date().getMonth();


    switch (meses[mesIndex]) {
      case "Janeiro":
        return notificacao.janeiro;
      case "Fevereiro":
        return notificacao.fevereiro;
      case "Março":
        return notificacao.marco; // Note que o nome da propriedade deve ser corrigido conforme o padrão de nomenclatura da sua base de dados
      case "Abril":
        return notificacao.abril;
      case "Maio":
        return notificacao.maio;
      case "Junho":
        return notificacao.junho;
      case "Julho":
        return notificacao.julho;
      case "Agosto":
        return notificacao.agosto;
      case "Setembro":
        return notificacao.setembro;
      case "Outubro":
        return notificacao.outubro;
      case "Novembro":
        return notificacao.novembro;
      case "Dezembro":
        return notificacao.dezembro;
      default:
        return 0;
    }
  }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      id: [0, Validators.required],
      localizacao: ["", Validators.required]

    });
    HighchartsMore(Highcharts);

    setInterval(() => {
      this.filtrar();
    }, 4000)


  }

  find(id: number) {
    this.resumoService.find(id).subscribe(res => {
      this.form.setValue({
        id: res.id,
        localizacao: res.localizacao
      });
      console.log(res);
    });
  }
  guardar() {
    const values: InterruptorPost = <InterruptorPost>this.form.value;
    this.resumoService.guardar(values).subscribe(res => {
      console.log(res);
    });
  }
  remover(id: number) {
    this.resumoService.remover(id).subscribe(res => {

    });
  }


  ligar(id: number, valor: number) {
    this.serviceBase.resumoService.ligar(id, valor).subscribe(res => {
      this.serviceBase.resumoService.getInterruptor().subscribe(res => {
        this.interruptor = res;
      });
    });

  }
  alertaAgua = 1000000000;
  alertaEnergia = 1000000000;
  async filtrar() {

    this.alertaAgua = this.getNotificacao("AGUA");
    this.alertaEnergia = this.getNotificacao("ENERGIA");
    const meses = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const mesIndex = new Date().getMonth();


    this.serviceBase.resumoService.getInterruptor().subscribe(res => {
      this.interruptor = res;
    });

    this.serviceBase.contratoService.getUtilizador().subscribe(res => {
      this.precoConsumoEnergia = this.calcularPrecoEnergia(res);
      this.precoFixoEnergia = res.precoFixoEnergia;
      this.precoConsumoAgua = res.precoAgua;
      this.precoFixoAgua = res.precoFixoAgua;

      var reenviar = true;

      if (this.calcularTotalConsumoEnergia > this.alertaEnergia / this.precoConsumoEnergiaMdia) {

        if (localStorage.getItem('tokenEnergia') == null && meses[mesIndex] == this.mes) {
          this.resumoService.enviarSms("" + res.telemovel + "", "Controlar o consumo da energia. B-Smart");
          localStorage.setItem('tokenEnergia', "energia");
        }
        reenviar = false;
        console.log("Notificar consumo Energia");
      }

      if (this.calcularTotalConsumoAgua/1000 > this.alertaAgua / this.precoConsumoAgua * 1000) {

        if ((localStorage.getItem('tokenAgua') == null) && meses[mesIndex] == this.mes) {
          this.resumoService.enviarSms("" + res.telemovel + "", "Controlar o consumo da agua. B-Smart");
          localStorage.setItem('tokenAgua', "agua");
        }
        reenviar = false;
        console.log("Notificar consumo Água");
      }

      if (reenviar) {
        this.logoutSms();
      }

      this.serviceBase.objetivoService.getObjetivos().subscribe(res => {
        this.objetivos = res;
        this.filtroObjetivosAgua = this.objetivos.filter(item => item.ano == this.ano && item.tipo === "AGUA")[0] ?? [];
        this.filtroObjetivosEnergia = this.objetivos.filter(item => item.ano == this.ano && item.tipo === "ENERGIA")[0] ?? [];

        this.serviceBase.resumoService.getConsumo(this.ano + "-" + this.mesParaNumero(this.mes)).subscribe(res => {
          this.objetivoAgua = this.getObjetivoAgua();
          this.objetivoEnergia = this.getObjetivoEnergia();

          this.consumoAguaTable = res.filter(objeto => objeto.tipo === 'AGUA');
          this.consumoEnergiaTable = res.filter(objeto => objeto.tipo === 'ENERGIA');

          this.initChart();

        });

      });
    });
  }

  logoutSms() {
    localStorage.removeItem("tokenAgua");
    localStorage.removeItem("tokenEnergia")
  }
  getObjetivoAgua() {
    if (this.mes === "Janeiro") {
      return this.filtroObjetivosAgua?.janeiro || 0;
    }

    if (this.mes === "Fevereiro") {
      return this.filtroObjetivosAgua?.fevereiro || 0;
    }

    if (this.mes === "Março") {
      return this.filtroObjetivosAgua?.marco || 0;
    }
    if (this.mes === "Abril") {
      return this.filtroObjetivosAgua?.abril || 0;
    }
    if (this.mes === "Maio") {
      return this.filtroObjetivosAgua?.maio || 0;
    }
    if (this.mes === "Junho") {
      return this.filtroObjetivosAgua?.junho || 0;
    }
    if (this.mes === "Julho") {
      return this.filtroObjetivosAgua?.julho || 0;
    }
    if (this.mes === "Agosto") {
      return this.filtroObjetivosAgua?.agosto || 0;
    }
    if (this.mes === "Setembro") {
      return this.filtroObjetivosAgua?.setembro || 0;
    }
    if (this.mes === "Outubro") {
      return this.filtroObjetivosAgua?.outubro || 0;
    }
    if (this.mes === "Novembro") {
      return this.filtroObjetivosAgua?.novembro || 0;
    }
    if (this.mes === "Dezembro") {
      return this.filtroObjetivosAgua?.dezembro || 0;
    }

    return 0;
  }


  getObjetivoEnergia() {
    if (this.mes === "Janeiro") {
      return this.filtroObjetivosEnergia?.janeiro || 0;
    }

    if (this.mes === "Fevereiro") {
      return this.filtroObjetivosEnergia?.fevereiro || 0;
    }

    if (this.mes === "Março") {
      return this.filtroObjetivosEnergia?.marco || 0;
    }
    if (this.mes === "Abril") {
      return this.filtroObjetivosEnergia?.abril || 0;
    }
    if (this.mes === "Maio") {
      return this.filtroObjetivosEnergia?.maio || 0;
    }
    if (this.mes === "Junho") {
      return this.filtroObjetivosEnergia?.junho || 0;
    }
    if (this.mes === "Julho") {
      return this.filtroObjetivosEnergia?.julho || 0;
    }
    if (this.mes === "Agosto") {
      return this.filtroObjetivosEnergia?.agosto || 0;
    }
    if (this.mes === "Setembro") {
      return this.filtroObjetivosEnergia?.setembro || 0;
    }
    if (this.mes === "Outubro") {
      return this.filtroObjetivosEnergia?.outubro || 0;
    }
    if (this.mes === "Novembro") {
      return this.filtroObjetivosEnergia?.novembro || 0;
    }
    if (this.mes === "Dezembro") {
      return this.filtroObjetivosEnergia?.dezembro || 0;
    }

    return 0;
  }

  initChart(): void {
    this.chartOptions = this.opcoesGauge("<span style='font-size:10pt'>ÁGUA</span>", this.objetivoAgua, (this.calcularTotalConsumoAgua / 1000 / 1000 * this.precoConsumoAgua + this.precoFixoAgua));
    Highcharts.chart(this.chartGaugeAgua.nativeElement, this.chartOptions);



    this.chartOptions = this.opcoesGauge("<span style='font-size:10pt'>ENERGIA</span>", this.objetivoEnergia, (this.calcularTotalConsumoEnergia * this.precoConsumoEnergia + this.precoFixoEnergia));
    Highcharts.chart(this.chartGaugeEnergia.nativeElement, this.chartOptions);


    this.chartOptions = this.opcoesGauge("<span style='font-size:10pt'>ÁGUA</span>", this.objetivoAgua, (((this.calcularTotalConsumoAgua / 1000 / 1000 * this.precoConsumoAgua) / this.diaAtual) * this.diasMes) + this.precoFixoAgua);
    Highcharts.chart(this.chartGaugePrevistoAgua.nativeElement, this.chartOptions);


    this.chartOptions = this.opcoesGauge("<span style='font-size:10pt'>ENERGIA</span>", this.objetivoEnergia, (((this.calcularTotalConsumoEnergia * this.precoConsumoEnergia) / this.diaAtual) * this.diasMes) + this.precoFixoEnergia);
    Highcharts.chart(this.chartGaugePrevistoEnergia.nativeElement, this.chartOptions);


    //Highcharts.chart(this.chartDiarioMensal.nativeElement, this.opcoesDiario("Consumo diário"));


    // this.chartOptions = this.opcoes();
    // Highcharts.chart(this.chartAnual.nativeElement, this.chartOptions);

  }

  opcoesGauge(titulo: string, objetivo: number, faturacao: number): any {
    return {
      chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false,
        height: '80%'
      },

      title: {
        text: titulo
      },
      pane: {
        startAngle: -90,
        endAngle: 89.9,
        background: null,
        center: ['50%', '75%'],
        size: '110%'
      },

      // the value axis
      yAxis: {
        min: 0,
        max: 200,
        tickPixelInterval: 72,
        tickPosition: 'inside',
        tickColor: Highcharts.defaultOptions.chart?.backgroundColor || '#FFFFFF',
        tickLength: 20,
        tickWidth: 2,
        minorTickInterval: null,
        labels: {
          distance: 20,
          style: {
            fontSize: '14px'
          }
        },
        lineWidth: 0,
        plotBands: [{
          from: 0,
          to: 100,
          color: '#55BF3B', // green
          thickness: 20
        }, {
          from: 100,
          to: 150,
          color: '#DDDF0D', // yellow
          thickness: 20
        }, {
          from: 150,
          to: 200,
          color: '#DF5353', // red
          thickness: 20
        }]
      },
      series: [{
        name: titulo,
        data: [parseFloat(((faturacao * 100) / objetivo).toFixed(2))],
        tooltip: {
          valueSuffix: ' %'
        },
        dataLabels: {
          format: '{y} %',
          borderWidth: 0,
          color: (
            Highcharts.defaultOptions.title &&
            Highcharts.defaultOptions.title.style &&
            Highcharts.defaultOptions.title.style.color
          ) || '#333333',
          style: {
            fontSize: '16px'
          }
        },
        dial: {
          radius: '80%',
          backgroundColor: 'gray',
          baseWidth: 12,
          baseLength: '0%',
          rearLength: '0%'
        },
        pivot: {
          backgroundColor: 'gray',
          radius: 6
        }

      }]

    };
  }

  opcoes(): Highcharts.Options {
    return {
      chart: {
        type: 'column'
      },
      title: {
        align: 'left',
        text: 'Consumo Anual'
      },

      accessibility: {
        announceNewData: {
          enabled: true
        }
      },
      xAxis: {
        categories: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
          'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        accessibility: {
          description: 'Months of the year'
        }
      },
      yAxis: {
        title: {
          text: 'Total percent market share'
        }

      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '{point.y:.1f}%'
          }
        }
      },

      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
      },

      series: [
        {
          type: "column",
          name: 'ÁGUA',
          data: [10, 23, 44, 0, 0, 0, 0, 0, 0, 0, 0, 0]

        },
        {
          type: "column",
          name: 'ENERGIA',
          data: [4, 34, 22, 9, 8, 9, 9, 8, 9, 0, 9, 8]

        }
      ],

    }

  };


  opcoesDiario(titulo: string): any {
    return {
      chart: {
        type: 'spline'
      },
      title: {
        text: '<h3>Consumo Mensal Diário</h3>'
      },

      xAxis: {
        categories: ['1', '2', '3', '4', '5', '6',
          '7', '8', '9', '10', '11', '12'],
        accessibility: {
          description: 'Months of the year'
        }
      },
      yAxis: {
        title: {
          text: 'Total'
        },
        labels: {
          format: '{value} &euro;'
        }
      },
      tooltip: {
        crosshairs: true,
        shared: true
      },
      plotOptions: {
        spline: {
          marker: {
            radius: 4,
            lineColor: '#666666',
            lineWidth: 1
          }
        }
      },
      series: [{
        name: 'Água',
        marker: {
          symbol: 'square'
        },
        data: [5.2, 5.7, 8.7, 13.9, 18.2, 21.4, 25.0, {
          y: 26.4,
          marker: {
            symbol: 'url(https://www.highcharts.com/samples/graphics/sun.png)'
          },
          accessibility: {
            description: 'Sunny symbol, this is the warmest point in the chart.'
          }
        }, 22.8, 17.5, 12.1, 7.6]

      }, {
        name: 'Energia',
        marker: {
          symbol: 'diamond'
        },
        data: [{
          y: 1.5,
          marker: {
            symbol: 'url(https://www.highcharts.com/samples/graphics/snow.png)'
          },
          accessibility: {
            description: 'Snowy symbol, this is the coldest point in the chart.'
          }
        }, 1.6, 3.3, 5.9, 10.5, 13.5, 14.5, 14.4, 11.5, 8.7, 4.7, 2.6]
      }]
    }
  }

  obterMesAtual(): string {
    const meses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const dataAtual = new Date();
    const mesAtual = dataAtual.getMonth(); // Retorna o índice do mês (0-11)

    return meses[mesAtual];
  }

  mesParaNumero(mes: string): string | undefined {
    const meses: { [key: string]: string } = {
      'Janeiro': "01",
      'Fevereiro': "02",
      'Março': "03",
      'Abril': "04",
      'Maio': "05",
      'Junho': "06",
      'Julho': "07",
      'Agosto': "08",
      'Setembro': "09",
      'Outubro': "10",
      'Novembro': "11",
      'Dezembro': "12"
    };

    return meses[mes];
  }

  mesParaNumeroInteiro(mes: string): number {
    const meses: { [key: string]: number } = {
      'Janeiro': 1,
      'Fevereiro': 2,
      'Março': 3,
      'Abril': 4,
      'Maio': 5,
      'Junho': 6,
      'Julho': 7,
      'Agosto': 8,
      'Setembro': 9,
      'Outubro': 10,
      'Novembro': 11,
      'Dezembro': 12
    };

    return meses[mes];
  }

  get calcularTotalConsumoAgua(): number {
    return this.consumoAguaTable.reduce((total, consumo) => total + consumo.quantidade, 0);
  }

  get calcularTotalConsumoEnergia(): number {
    return this.consumoEnergiaTable.reduce((total, consumo) => total + consumo.quantidade, 0) / 3600;
  }

  calcularPrecoEnergia(conta: IUtilizador): number {
    const horaAtual = new Date();

    this.precoConsumoEnergiaMdia = (conta.precoP1Energia + conta.precoP2Energia + conta.precoP3Energia) / 3;

    if (horaAtual >= new Date(`2000-01-01T${conta.horarioDeP1Energia}`) &&
      horaAtual <= new Date(`2000-01-01T${conta.horarioAteP1Energia}`)) {
      return conta.precoP1Energia;
    } else if (horaAtual >= new Date(`2000-01-01T${conta.horarioDeP2Energia}`) &&
      horaAtual <= new Date(`2000-01-01T${conta.horarioAteP2Energia}`)) {
      return conta.precoP2Energia;
    } else {
      return conta.precoP3Energia;
    }
  }

}
