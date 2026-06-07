import { Component } from '@angular/core';
import { TemaServicio } from '../../../servicios/global/tema-servicio';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(public temaServicio: TemaServicio){}
}