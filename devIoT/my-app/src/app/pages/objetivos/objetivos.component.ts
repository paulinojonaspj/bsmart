import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ObjetivoService } from './objetivo.service';
import { BaseService } from '../../base.service';
import { Objetivo } from './objetivo';

@Component({
  selector: 'app-objetivos',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './objetivos.component.html',
  styleUrl: './objetivos.component.css'
})
export class ObjetivosComponent implements OnInit {

  tipo: string = "";
  ano: number = 2024;
  objetivos: Objetivo[] = [];
  notificacao: Objetivo[] = [];
  filtroObjetivosAgua?: Objetivo;
  filtroObjetivosEnergia?: Objetivo;
  totalEnergia = 0;
  totalAgua = 0;

  precoConsumoEnergia = 0;
  precoFixoEnergia = 0;
  precoConsumoAgua = 0;
  precoFixoAgua = 0;

  @ViewChild('btnFechar') btnFechar!: ElementRef;

  private serviceBase = inject(BaseService);
  form!: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.getObjetivos();

  }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [0, Validators.required],
      ano: [0, Validators.required],
      tipo: ["", Validators.required],
      janeiro: [0, Validators.required],
      fevereiro: [0, Validators.required],
      marco: [0, Validators.required],
      abril: [0, Validators.required],
      maio: [0, Validators.required],
      junho: [0, Validators.required],
      julho: [0, Validators.required],
      agosto: [0, Validators.required],
      setembro: [0, Validators.required],
      outubro: [0, Validators.required],
      novembro: [0, Validators.required],
      dezembro: [0, Validators.required]
    });


    this.serviceBase.contratoService.getUtilizador().subscribe(res => {
      this.precoConsumoEnergia = (res.precoP1Energia + res.precoP2Energia + res.precoP3Energia) / 3;
      this.precoFixoEnergia = res.precoFixoEnergia;
      this.precoConsumoAgua = res.precoAgua;
      this.precoFixoAgua = res.precoFixoAgua;

    })

    this.serviceBase.objetivoService.getNotificacao().subscribe(res => {
      this.notificacao = res;

    })

  }


  getNotificacao(tipo: string) {
    return this.notificacao.filter(e => e.ano == this.ano && e.tipo === tipo)[0];
  }
  getObjetivos() {
    this.serviceBase.objetivoService.getObjetivos().subscribe(res => {
      this.objetivos = res;
      this.filtroObjetivosAgua = this.objetivos.filter(item => item.ano == this.ano && item.tipo === "AGUA")[0] ?? [];
      this.filtroObjetivosEnergia = this.objetivos.filter(item => item.ano == this.ano && item.tipo === "ENERGIA")[0] ?? [];



      this.totalEnergia += this.filtroObjetivosEnergia?.janeiro || 0; // Adiciona o valor de janeiro ao totalEnergia, se existir, caso contrário, adiciona zero.
      this.totalEnergia += this.filtroObjetivosEnergia?.fevereiro || 0; // Adiciona o valor de fevereiro ao totalEnergia, se existir, caso contrário, adiciona zero.
      this.totalEnergia += this.filtroObjetivosEnergia?.marco || 0; // Adiciona o valor de março ao totalEnergia, se existir, caso contrário, adiciona zero.
      this.totalEnergia += this.filtroObjetivosEnergia?.abril || 0; // Adiciona o valor de abril ao totalEnergia, se existir, caso contrário, adiciona zero.
      this.totalEnergia += this.filtroObjetivosEnergia?.maio || 0; // Adiciona o valor de maio ao totalEnergia, se existir, caso contrário, adiciona zero.
      this.totalEnergia += this.filtroObjetivosEnergia?.junho || 0; // Adiciona o valor de junho ao totalEnergia, se existir, caso contrário, adiciona zero.
      this.totalEnergia += this.filtroObjetivosEnergia?.julho || 0; // Adiciona o valor de julho ao totalEnergia, se existir, caso contrário, adiciona zero.
      this.totalEnergia += this.filtroObjetivosEnergia?.agosto || 0; // Adiciona o valor de agosto ao totalEnergia, se existir, caso contrário, adiciona zero.
      this.totalEnergia += this.filtroObjetivosEnergia?.setembro || 0; // Adiciona o valor de setembro ao totalEnergia, se existir, caso contrário, adiciona zero.
      this.totalEnergia += this.filtroObjetivosEnergia?.outubro || 0; // Adiciona o valor de outubro ao totalEnergia, se existir, caso contrário, adiciona zero.
      this.totalEnergia += this.filtroObjetivosEnergia?.novembro || 0; // Adiciona o valor de novembro ao totalEnergia, se existir, caso contrário, adiciona zero.
      this.totalEnergia += this.filtroObjetivosEnergia?.dezembro || 0; // Adiciona o valor de dezembro ao totalEnergia, se existir, caso contrário, adiciona zero.



      this.totalAgua += this.filtroObjetivosAgua?.janeiro || 0; // Adiciona o valor de janeiro ao totalAgua, se existir, caso contrário, adiciona zero.
      this.totalAgua += this.filtroObjetivosAgua?.fevereiro || 0; // Adiciona o valor de fevereiro ao totalAgua, se existir, caso contrário, adiciona zero.
      this.totalAgua += this.filtroObjetivosAgua?.marco || 0; // Adiciona o valor de março ao totalAgua, se existir, caso contrário, adiciona zero.
      this.totalAgua += this.filtroObjetivosAgua?.abril || 0; // Adiciona o valor de abril ao totalAgua, se existir, caso contrário, adiciona zero.
      this.totalAgua += this.filtroObjetivosAgua?.maio || 0; // Adiciona o valor de maio ao totalAgua, se existir, caso contrário, adiciona zero.
      this.totalAgua += this.filtroObjetivosAgua?.junho || 0; // Adiciona o valor de junho ao totalAgua, se existir, caso contrário, adiciona zero.
      this.totalAgua += this.filtroObjetivosAgua?.julho || 0; // Adiciona o valor de julho ao totalAgua, se existir, caso contrário, adiciona zero.
      this.totalAgua += this.filtroObjetivosAgua?.agosto || 0; // Adiciona o valor de agosto ao totalAgua, se existir, caso contrário, adiciona zero.
      this.totalAgua += this.filtroObjetivosAgua?.setembro || 0; // Adiciona o valor de setembro ao totalAgua, se existir, caso contrário, adiciona zero.
      this.totalAgua += this.filtroObjetivosAgua?.outubro || 0; // Adiciona o valor de outubro ao totalAgua, se existir, caso contrário, adiciona zero.
      this.totalAgua += this.filtroObjetivosAgua?.novembro || 0; // Adiciona o valor de novembro ao totalAgua, se existir, caso contrário, adiciona zero.
      this.totalAgua += this.filtroObjetivosAgua?.dezembro || 0; // Adiciona o valor de dezembro ao totalAgua, se existir, caso contrário, adiciona zero.

    });
  }
  editNot = 0;
  edit(objetivo: number = 0) {
    this.editNot = objetivo;
    if (objetivo == 0) {
      this.form.patchValue(
        {
          id: this.tipo === "ENERGIA" ? this.filtroObjetivosEnergia?.id : this.filtroObjetivosAgua?.id,
          ano: this.ano,
          tipo: this.tipo,
          janeiro: this.tipo === "ENERGIA" ? this.filtroObjetivosEnergia?.janeiro : this.filtroObjetivosAgua?.janeiro,
          fevereiro: this.tipo === "ENERGIA" ? this.filtroObjetivosEnergia?.fevereiro : this.filtroObjetivosAgua?.fevereiro,
          marco: this.tipo === "ENERGIA" ? this.filtroObjetivosEnergia?.marco : this.filtroObjetivosAgua?.marco,
          abril: this.tipo === "ENERGIA" ? this.filtroObjetivosEnergia?.abril : this.filtroObjetivosAgua?.abril,
          maio: this.tipo === "ENERGIA" ? this.filtroObjetivosEnergia?.maio : this.filtroObjetivosAgua?.maio,
          junho: this.tipo === "ENERGIA" ? this.filtroObjetivosEnergia?.junho : this.filtroObjetivosAgua?.junho,
          julho: this.tipo === "ENERGIA" ? this.filtroObjetivosEnergia?.julho : this.filtroObjetivosAgua?.julho,
          agosto: this.tipo === "ENERGIA" ? this.filtroObjetivosEnergia?.agosto : this.filtroObjetivosAgua?.agosto,
          setembro: this.tipo === "ENERGIA" ? this.filtroObjetivosEnergia?.setembro : this.filtroObjetivosAgua?.setembro,
          outubro: this.tipo === "ENERGIA" ? this.filtroObjetivosEnergia?.outubro : this.filtroObjetivosAgua?.outubro,
          novembro: this.tipo === "ENERGIA" ? this.filtroObjetivosEnergia?.novembro : this.filtroObjetivosAgua?.novembro,
          dezembro: this.tipo === "ENERGIA" ? this.filtroObjetivosEnergia?.dezembro : this.filtroObjetivosAgua?.dezembro,
        });
    } else {
      this.form.patchValue(
        {
          id: this.tipo === "ENERGIA" ? this.getNotificacao("ENERGIA").id : this.getNotificacao("AGUA").id,
          ano: this.ano,
          tipo: this.tipo,
          janeiro: this.tipo === "ENERGIA" ? this.getNotificacao("ENERGIA").janeiro : this.getNotificacao("AGUA").janeiro,
          fevereiro: this.tipo === "ENERGIA" ? this.getNotificacao("ENERGIA").fevereiro : this.getNotificacao("AGUA").fevereiro,
          marco: this.tipo === "ENERGIA" ? this.getNotificacao("ENERGIA").marco : this.getNotificacao("AGUA").marco,
          abril: this.tipo === "ENERGIA" ? this.getNotificacao("ENERGIA").abril : this.getNotificacao("AGUA").abril,
          maio: this.tipo === "ENERGIA" ? this.getNotificacao("ENERGIA").maio : this.getNotificacao("AGUA").maio,
          junho: this.tipo === "ENERGIA" ? this.getNotificacao("ENERGIA").junho : this.getNotificacao("AGUA").junho,
          julho: this.tipo === "ENERGIA" ? this.getNotificacao("ENERGIA").julho : this.getNotificacao("AGUA").julho,
          agosto: this.tipo === "ENERGIA" ? this.getNotificacao("ENERGIA").agosto : this.getNotificacao("AGUA").agosto,
          setembro: this.tipo === "ENERGIA" ? this.getNotificacao("ENERGIA").setembro : this.getNotificacao("AGUA").setembro,
          outubro: this.tipo === "ENERGIA" ? this.getNotificacao("ENERGIA").novembro : this.getNotificacao("AGUA").novembro,
          dezembro: this.tipo === "ENERGIA" ? this.getNotificacao("ENERGIA").dezembro : this.getNotificacao("AGUA").dezembro,
        });
    }
  }

  atualizar() {
    this.totalAgua=0;
    this.totalEnergia=0;
    const values: Objetivo = <Objetivo>this.form.value;
    if (this.editNot == 0) {
      this.serviceBase.objetivoService.UpdateObjetivos(values).subscribe(res => {
        if (res) {
          this.getObjetivos();
          this.btnFechar.nativeElement.click();
        }
      });
    } else {
      this.serviceBase.objetivoService.UpdateNotificacao(values).subscribe(res => {
        if (res) {
          this.serviceBase.objetivoService.getNotificacao().subscribe(res => {
            this.notificacao = res;

            this.getObjetivos();
            this.btnFechar.nativeElement.click();
          })

        }
      });
    }

  }


}
