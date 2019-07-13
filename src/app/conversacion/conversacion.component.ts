import { Component, OnInit } from '@angular/core';
import { MercadolibreService } from '../mercadolibre.service';
import { UserService } from '../user.service';
import { Router } from "@angular/router";
import { trigger, state, style, animate, transition } from '@angular/animations';

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

  constructor(public user: UserService,
              public meli: MercadolibreService,
              private router: Router) {
  }

  ngOnInit() {
    if(!this.user.token)
      this.router.navigate(["/"])

    if (this.meli.pregunta) {
      this.usuarioPregunta = "USUARIO"
      this.respuesta = ""
      this.isLoading = false

      this.meli.dameNombreUsuario(this.meli.pregunta.from)
      .subscribe((respuesta: {nickname}) => {
         this.usuarioPregunta = respuesta.nickname
      }, (err) => {
          console.log(err)
      });

      console.log(this.meli.pregunta.preguntas_previas)
    }
  }

  responder() {
    this.meli.responderPregunta( {
                                    user_id_ml: this.meli.pregunta.seller_id,
                                    question_id: this.meli.pregunta.question_id,
                                    text: this.respuesta
                                  })
    .subscribe((respuesta) => {
       this.respuesta = ""
       this.meli.removerPregunta()
       this.router.navigate(["/preguntas"])
    }, (err) => {
      	console.log(err)
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
