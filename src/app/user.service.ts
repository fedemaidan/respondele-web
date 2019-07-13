import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { ApiService } from './api.service';
import { Cuenta } from './model/cuenta';
import { environment } from '../environments/environment';
////import * as SocketIO from 'socket.io-client';

@Injectable()
export class UserService {
  _user: any
  token: string

 // socket: any

  url: string = environment.api;
  urlSocket: string = environment.socketApi;

  public cuentas: Cuenta[]

  constructor(public http: HttpClient, 
              public api: ApiService
              ) {

    if (localStorage.getItem('_user')) {
      this.cargarUsuario(localStorage.getItem('_user'), localStorage.getItem('token'))
    }
    
  }

  dameNickname(id) {

    var aux = "a"

    this.cuentas.forEach((cuenta) => {
      if (cuenta.id_ml == id)
        aux = cuenta.nickname
    })

    return aux
  }

  cargarUsuario(user, token) {
    this._user = user
    this.token = token
    this.actualizarCuentas({})

    localStorage.setItem('_user', this._user);
    localStorage.setItem('token', this.token);
    
    //this.socket = SocketIO(this.urlSocket).connect();
    //this.socket.emit("hola", this._user)

    //this.socket.on('actualizar', (mensaje) => {
    //    this.actualizarCuentas({})
    //})
  }

  getApi() {
    return this.url
  }

  login(accountInfo: any) {
    accountInfo = this.cargarHeadersAutorizations(accountInfo)
    let obs = this.api.post(this.url, 'authenticate_web', accountInfo)
    obs.subscribe((res: {success,token }) => {
        if(res.success == true) {
          var self = this
          console.log("MI usuario loco")
          self.cargarUsuario(accountInfo.name, res.token)
        }
        else {
          console.log(res)
          console.log("TODO - Falla LOGIN")
        }
      });
    return obs
  }

  recuperarContrasena(accountInfo: any) {
    accountInfo = this.cargarHeadersAutorizations(accountInfo)
    return this.api.post(this.url, 'recuperarContrasena', accountInfo);
  }

  signup(accountInfo: any) {
    accountInfo = this.cargarHeadersAutorizations(accountInfo)
    let seq = this.api.post(this.url,'signup', accountInfo)
    seq.subscribe((res: { status }) => {
        if(res.status == 'success') {
          this.login(accountInfo)
        }
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }

  actualizarCuentas(accountInfo: any) {
    accountInfo = this.cargarHeadersAutorizations(accountInfo)
    console.log(accountInfo)
    let seq = this.api.get(this.url,'cuentas',{},  accountInfo)
    seq.subscribe((res: {success, data, msg}) => {
        
        if(res.success == true) {
          this.cuentas = <Cuenta[]>res.data
          console.log(this.cuentas)
/*           this.socket.on('actualizarCuentas', (resource) => {
             this.actualizarCuentas(resource);
           })
*/
        } else {
          console.error('ERROR ACTUALIZANDO CUENTAS', res);
          return res.msg
        }
      }, err => {
        console.error('ERROR', err);
        return err.msg
      });

    return seq;
  }

  dameToken(ml_id) {
    if (this.cuentas != null) {
      this.cuentas.forEach((cuenta) => {
        if (cuenta.id_ml == ml_id) {
          return cuenta.token.valueOf()
        }
      })
    }
    return null;
  }

  logout() {
    this._user = null
    this.token = null
    localStorage.removeItem('_user')
    localStorage.removeItem('token')
  }

  cargarHeadersAutorizations(options) {
    if (!options) {
        options = {}
    }
    if (this.token) {
         options.headers = new HttpHeaders({Authorization: this.token});
    }

    return options
  } 

  cantidadDeCuentas() {
    if (this.cuentas) {
      return this.cuentas.length
    }

    return 0
  }
}