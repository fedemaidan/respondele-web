import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-registracion',
  templateUrl: './registracion.component.html',
  styleUrls: ['./registracion.component.css']
})
export class RegistracionComponent implements OnInit {

  	account: {name: string, mail: string, password: string,  response_captcha: String} = {
		name: '',
    	mail: '',
    	password: '',
      response_captcha: null
  	};

  	constructor(
  		private user: UserService,
  		private router: Router
  		) { }

  ngOnInit() {
  }

  registrar() {
    //this.account.response_captcha = this.captcha.getResponse();
	this.user.signup(this.account).subscribe((resp: {success}) => {
      if (resp.success == true) {
            this.user.login(this.account).subscribe((resp: {success}) => {
      				  if (resp.success == true) {
      				    this.router.navigate(["/preguntas"])
      				  }
      				  else
    				    {
                  //this.captcha.reset();
    				      //this.mensajero.mostrarMensajeError(resp.json().msg)
    				    }
      				}, (err) => {
      				  console.log(err)
               // this.captcha.reset();
      				  //this.mensajero.mostrarMensajeError("Falló en el servidor")
      				});
	      }
	      else
	      {
	        //this.mensajero.mostrarMensajeError(resp.json().msg)
	      }
	    }, (err) => {
	      console.log(err.message)
	      //this.mensajero.mostrarMensajeError("Falló en el servidor")
	    });
	}
}
