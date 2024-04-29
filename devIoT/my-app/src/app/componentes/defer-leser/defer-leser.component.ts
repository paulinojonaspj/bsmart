import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-defer-leser',
  standalone: true,
  imports: [],
  templateUrl: './defer-leser.component.html',
  styleUrl: './defer-leser.component.css'
})
export class DeferLeserComponent {

  listas = [
    {
      "id": 1,
      "nome": "Paulino"
    }
  ];

  inserirDados():void{
    for (var i = 0; i < 1000; i++) {
      this.listas.push({
        "id": this.listas.length,
        "nome": "Dados - "+i
      });
    }
  }

  ngOnInit(): void {
    this.inserirDados();
  }

}
