import { Injectable } from '@angular/core';
//import { Http,  RequestOptions } from '@angular/http';
import { HttpClient,HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { ApiService } from './api.service';
import { UserService } from './user.service';
import { Pregunta } from './model/pregunta';
import { Cuenta } from './model/cuenta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MercadolibreService {

  urlML = "https://api.mercadolibre.com"
  urlIni: string
  preguntas: Pregunta[]
  pregunta: Pregunta
  cantidadPreguntas = null
  socketOn = false

  constructor(public http: HttpClient
  	, public api: ApiService
  	, public user: UserService)
   { 

  }

  urlIniML(params: any) {
    var accountInfo = this.user.cargarHeadersAutorizations(null)
    let seq = this.api.get(this.user.getApi(),'iniciarConML', params, accountInfo);
    return seq;
  }

  logoutML() {
      return "http://www.mercadolibre.com/jms/mla/lgz/logout";
  }

  removerCuentaML(body: any) {
    var headers = this.user.cargarHeadersAutorizations(body)
    
    let seq = this.api.post(this.user.getApi(),'removerUsuarioML', body, headers);

    seq.subscribe((res: {success}) => {
        if(res.success == true) {
            this.user.actualizarCuentas({})
        } else {
        }
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }
  
  
  responderPregunta( accountInfo: any) {
    accountInfo = this.user.cargarHeadersAutorizations(accountInfo)
    let seq = this.api.post(this.user.getApi(),'responder', {},accountInfo);

    seq.subscribe((res: {success}) => {
        if(res.success == true) {
          this.removerPregunta()
        } else {
        }
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }

  sincronizarPreguntas( body: any) {
    var headers = this.user.cargarHeadersAutorizations({})

    let seq = this.api.post(this.user.getApi(),'sincronizarNuevamentePreguntas', body, headers);

    seq.subscribe((res: {success}) => {
        if(res.success == true) {
          this.actualizarPreguntas({})
        } else {
          console.log(res)
        }
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }

  actualizarConversaciones() {
    if (this.preguntas) {
      this.preguntas.forEach( (pregunta) => {
        if (pregunta.preguntas_previas == null) {
          this.actualizarConveracionCon(pregunta)
        }
      })
    }
  }
  
  actualizarConveracionCon(pregunta) {
    
    if (this.user.cuentas != null) {
      
      this.user.cuentas.forEach((cuenta) => {
        
        if (cuenta.id_ml == pregunta.seller_id) {
          
          var token = cuenta.token
          
          let seq = this.api.get(this.urlML,
                                  'questions/search',
                                  {  
                                    item: pregunta.item_id, 
                                    from: pregunta.from.id,
                                    access_token: token,
                                    sort: 'date_created_asc'
                                  });
          
          seq.subscribe((res: {questions, msg}) => {
              if(res.questions != null) {
                pregunta.preguntas_previas = res.questions
                pregunta.cantidad_preguntas_previas = pregunta.preguntas_previas.length
              } else {
                console.error('ERROR ACTUALIZANDO CONVERSACION DE UNA PREGUNTA', res);
                return res.msg
              }
            }, err => {
              console.error('ERROR', err);
              return err.msg
            });

          
          return seq;
        }
      })
    }
  }

  dameNombreUsuario(from) {
    let seq = this.api.get(this.urlML,'users/'+from.id,{});
    return seq;
  }  

  setPregunta(pregunta: Pregunta) {
    this.pregunta = pregunta
    this.actualizarConveracionCon(this.pregunta)
  }

  setPreguntaPorId(question_id) {
    var pregunta =  this.preguntas.filter( (pregunta) => { 
          return pregunta.question_id == question_id
        } 
      )
    this.setPregunta(pregunta[0])
  }

  removerPregunta() {
    var index = this.preguntas.indexOf(this.pregunta);
    this.preguntas.splice(index, 1);
   }

   // cargarNuevaPregunta(resource) {
   //   this.actualizarPreguntas({})
   // }

   actualizarPreguntas(accountInfo: any) {
    
/*    if (!this.socketOn) {
        this.user.socket.on('actualizar', (mensaje) => {
          this.actualizarPreguntas({})
      })
    }*/

    accountInfo = this.user.cargarHeadersAutorizations({})
    
    let seq = this.api.get(this.user.getApi(),'preguntas',{},  accountInfo);

    seq.subscribe((res: {success, data, msg}) => {
        
        if(res.success == true) {

          this.preguntas = <Pregunta[]>res.data
          if (this.preguntas) {
            this.preguntas.forEach( (pregunta) => {
              this.actualizarConveracionCon(pregunta)
              pregunta.seller_name = this.user.dameNickname(pregunta.seller_id)

            })
            this.cantidadPreguntas = this.preguntas.length
          }
          
          
         
          
        } else {
          console.error('ERROR ACTUALIZANDO PREGUNTAS', res);
          return res.msg
        }
      }, err => {
        console.error('ERROR', err);
        return err.msg
      });

    return seq;
  }
}