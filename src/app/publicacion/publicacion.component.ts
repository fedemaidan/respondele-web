import { Component, OnInit } from '@angular/core';
import { MercadolibreService } from '../mercadolibre.service';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent implements OnInit {

   constructor(public meli: MercadolibreService) {}

  ngOnInit() {
  }

}
