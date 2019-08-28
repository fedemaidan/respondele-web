import { Component, OnInit } from '@angular/core';
import { MercadolibreService } from '../mercadolibre.service';
import { UserService } from '../user.service';
import { Router } from "@angular/router";
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-conversacion',
  templateUrl: './conversacion.component.html',
  styleUrls: ['./conversacion.component.scss'],
  animations: [
    trigger('preguntaState', [
      state('inactive', style({
        height: '0',
        transform: 'scale(0)'
      })),
      state('active',   style({
        transform: 'scale(1)'
      })),
      transition('inactive => active', animate('200ms ease-in')),
      transition('active => inactive', animate('200ms ease-out'))
    ])
  ]
})
export class ConversacionComponent implements OnInit {

  respuesta: string
  isLoading: boolean
  usuarioPregunta: string
  enviarPrefijo: boolean
  enviarSufijo: boolean
  prefijo: string
  sufijo: string

  constructor(public user: UserService,
              public meli: MercadolibreService,
              private router: Router,
              public notifier: NotifierService) { }

  ngOnInit() {
    if(!this.user.token)
      this.router.navigate(["/"])

    if (this.meli.pregunta) {
      this.usuarioPregunta = "USUARIO"
      this.respuesta = ""
      this.isLoading = false

      this.meli.dameNombreUsuario(this.meli.pregunta.from)
      .subscribe((respuesta: { nickname }) => {
         this.usuarioPregunta = respuesta.nickname
         this.prefijo = `Hola ${this.usuarioPregunta}.`
         this.sufijo = " // Podes realizar la compra mediante Mercado Libre o mediante ------ @youtec.arg ------- InstG -----  tambien por nuestra Web Youtec /// Abonando por Transferencia Bancaria te podemos BONIFICAR 5% y Efec. 10% // Muchas gracias! - Somos @youtec.arg"
         this.enviarPrefijo = true
         this.enviarSufijo = true
      }, (err) => {
          console.log(err)
      });

    }
  }

  responder() {
    
    if (this.enviarPrefijo)
      this.respuesta = `${this.prefijo} ${this.respuesta}`
    if (this.enviarSufijo)
      this.respuesta = `${this.respuesta} ${this.sufijo}`

    this.notifier.notify( 'info' , "Enviando .. " );
    this.meli.responderPregunta( {
                                    user_id_ml: this.meli.pregunta.seller_id,
                                    question_id: this.meli.pregunta.question_id,
                                    text: this.respuesta
                                  })
    .subscribe((respuesta) => {
       this.respuesta = ""
       this.meli.removerPregunta()
       this.notifier.notify( 'success' , respuesta["msg"] );
       this.router.navigate(["/preguntas"])
    }, (err) => {
      this.notifier.notify( 'error' , err );
    });
  }

  seleccionarPregunta(question_id, actualizar) {
    if (actualizar)
      this.meli.setPreguntaPorId(question_id)
  }

  dameFechaArgentina(fecha) {
    var date = new Date(fecha)
    date.setHours(date.getHours() + 2)
    return date
  }

  verPublicacion(item) {
    var url = item.permalink;
    window.open(url);
  }

  verUsuario(from) {
    var url = "http://www.mercadolibre.com.ar/jm/profile?id="+from.id;
    window.open(url);
  }
}
