import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecaptchaModule } from 'ng-recaptcha';
import { UserService } from './user.service';
import { ApiService } from './api.service'
import { MercadolibreService } from './mercadolibre.service'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { RegistracionComponent } from './registracion/registracion.component';
import { RecuperarContrasenaComponent } from './recuperar-contrasena/recuperar-contrasena.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { NavegadorComponent } from './navegador/navegador.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { ConversacionComponent } from './conversacion/conversacion.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { PublicacionComponent } from './publicacion/publicacion.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NotifierModule } from 'angular-notifier';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistracionComponent,
    RecuperarContrasenaComponent,
    PreguntasComponent,
    NavegadorComponent,
    ConfiguracionComponent,
    ConversacionComponent,
    PublicacionComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    RecaptchaModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    NotifierModule
  ],
  providers: [UserService, ApiService, MercadolibreService, {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
