import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { MercadolibreService } from '../mercadolibre.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {

  isLoading: boolean
  url = null
  hidden: false

  constructor(public user: UserService,
              public meli: MercadolibreService,
              private router: Router) {}
  ngOnInit() {
    var accountInfo = { user: this.user._user}

    this.meli.urlIniML(accountInfo).subscribe((data: {url}) => {
            this.url = data.url
          });

    if(!this.user.token)
      this.router.navigate(["/"])

  	this.isLoading = true
    this.user.actualizarCuentas({})
	    .subscribe(res => {
	        this.isLoading = false
	      });
  }

  agregarCuenta() {

    window.location.replace(this.url);
  }

  removerCuenta(cuenta) {
    this.meli.removerCuentaML({
      user_id_ml: cuenta.id_ml,
      nickname: cuenta.nickname
    })
  }

  irAPreguntas() {
    this.router.navigate(["/preguntas"])
  }

  verUsuario(id) {
    var url = "http://www.mercadolibre.com.ar/jm/profile?id="+id;
    window.open(url);
  }


}
