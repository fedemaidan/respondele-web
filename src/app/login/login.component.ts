import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from "@angular/router";
import { ViewChild } from '@angular/core';
//import { ReCaptchaComponent } from 'angular2-recaptcha';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	//@ViewChild(ReCaptchaComponent) captcha: ReCaptchaComponent;

	account: {name: string, password: string, response_captcha: String} = {
    	name: 'fede',
    	password: 'fede',
    	response_captcha: null
  	};

  	constructor(
  		private user: UserService,
  		private router: Router
  		) { }

  	ngOnInit() {
  		if(this.user._user) {
	      	this.router.navigate(["/preguntas"])
	    }
  	}

  	resolveCaptcha() {
  		console.log("resolvi")
  	}

  	submit() {
  	//this.account.response_captcha = this.captcha.getResponse();
    this.user.login(this.account).subscribe((resp: {success,token,msg }) => {
		  if (resp.success == true){
		  	this.router.navigate(["/preguntas"])
		  }
		  else
		    {
		    	//this.mensajero.mostrarMensajeError(resp.msg)
		  //  	this.captcha.reset();
		    }
		}, (err) => {
		//  this.captcha.reset();
		  //this.mensajero.mostrarMensajeError("Falló en el servidor")
		});
	}

}
