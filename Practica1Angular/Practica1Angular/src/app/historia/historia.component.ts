import { Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'app-historia',
  templateUrl: './historia.component.html',
  styleUrls: ['./historia.component.css']
})
export class HistoriaComponent {
  public title="Título";

  constructor() {
    this.title = 'La loca historia de las narajas';
  }

  
}
