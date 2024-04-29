import { Component } from '@angular/core';

@Component({
  selector: 'app-testes',
  standalone: true,
  imports: [],
  templateUrl: './testes.component.html',
  styleUrl: './testes.component.css'
})
export default class TestesComponent {

 cont=0;
  lista=["a","b","c","d","e","f"];

  contador():number{
    return this.cont+=1;
  }

}
