
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../user.service';
import { MercadolibreService } from '../mercadolibre.service';


@Component({
  selector: 'app-navegador',
  templateUrl: './navegador.component.html',
  styleUrls: ['./navegador.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class NavegadorComponent implements OnInit {

  isIn = false;   // store state

  constructor(public user: UserService,
            public meli: MercadolibreService
  	) { }

  ngOnInit() {
  }

  logout() {
  	this.user.logout();
  }

  sincronizarTodo() {
    this.meli.sincronizarPreguntas({})
  }


  toggleState() { // click handler
        let bool = this.isIn;
        this.isIn = bool === false ? true : false;
    }
}
