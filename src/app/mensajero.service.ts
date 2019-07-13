import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable()
export class MensajeroService {
	
	private mensaje: string = ""
  private tipo: string = "alert alert-info"
	public show: boolean = false	
  
  constructor(private user: UserService) {
   /*   if (this.user.socket) {
        this.configurarMensajeSocket()
      }*/
  }

  configurarMensajeSocket() {
 /*       this.user.socket.on('error_mensaje', (mensaje) => {
            this.mostrarMensajeError(mensaje)
        })
        this.user.socket.on('exito', (mensaje) => {
            this.mostrarMensajeExito(mensaje)
        })*/
  }
  mostrarMensajeInfo(mensaje) {
    this.mostrarMensaje(mensaje, "alert alert-info")
  }

  mostrarMensajeExito(mensaje) {
    this.mostrarMensaje(mensaje, "alert alert-success")
  }

  mostrarMensajeError(mensaje) {
    this.mostrarMensaje(mensaje, "alert alert-danger")
  }

  ocultar() {
    this.mensaje = ""
    this.show = false
  }

  private mostrarMensaje(mensaje, tipo = "alert alert-info") {
    this.mensaje = mensaje
    this.show = true
    this.tipo = tipo
  }

}
