import { AsyncPipe, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-two-way-binding',
  standalone: true,
  imports: [AsyncPipe,JsonPipe],
  templateUrl: './two-way-binding.component.html',
  styleUrl: './two-way-binding.component.css'
})
export class TwoWayBindingComponent {

  @Input({required:true})
  titulo="";

  url="https://dummyjson.com/products";
  retornoApi$:Observable<any>;

  constructor(http: HttpClient){
    this.retornoApi$=http.get(this.url);
  }
}
