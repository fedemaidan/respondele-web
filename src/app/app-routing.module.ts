import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent }      from './login/login.component';
import { RegistracionComponent }      from './registracion/registracion.component';
import { PreguntasComponent }      from './preguntas/preguntas.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component'
import { ConversacionComponent } from './conversacion/conversacion.component'



const routes: Routes = [
	 { path: 'login', component: LoginComponent },
	 { path: 'registracion', component: RegistracionComponent },
	 { path: 'preguntas', component: PreguntasComponent },
	 { path: 'configuracion', component: ConfiguracionComponent },
	 { path: 'conversacion', component: ConversacionComponent },
	 { path: '',   redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
