import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormularioLoginComponent} from './formulario-login/formulario-login.component';
import { FormularioUsuarioComponent } from './formulario-usuario/formulario-usuario.component';


const routes: Routes = [
  { path: '', redirectTo: '/registro', pathMatch: 'full' },
  { path: 'login', component: FormularioLoginComponent },
  { path: 'registro', component: FormularioUsuarioComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
