import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../Core/Servicios/usuario.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { DatosCompartidosService } from '../servicios/datos-compartidos.service';
import { FormularioUsuarioComponent } from '../formulario-usuario/formulario-usuario.component';
import { RouterModule } from '@angular/router';

export interface RespuestaInicioSesion {
  mensaje: string;
  accessToken: string;
  fechaLogin: string;
}

@Component({
  selector: 'app-formulario-login',
  templateUrl: './formulario-login.component.html',
  styleUrls: ['./formulario-login.component.scss']
})
export class FormularioLoginComponent implements OnInit {

  usuario: string
  password: string
  rememberMe: boolean;

  constructor(private usuarioService: UsuarioService,
    private router: Router,
    private datosCompartidosService: DatosCompartidosService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    const usuario = form.value.usuario;
    const password = form.value.password;
    const fechaLogin = new Date().toISOString();

    const model = { usuario, password, fechaLogin };
    this.usuarioService.postInicioSesion(model)
      .pipe(
        map((response: any) => {
          const data: RespuestaInicioSesion = {
            mensaje: response.mensaje,
            accessToken: response.accessToken,
            fechaLogin: response.fechaLogin
          };
          return data;
        })
      )
      .subscribe(
        response => {
          console.log('Respuesta del servicio OK');
          console.log(response);
          this.datosCompartidosService.respuestaInicioSesion = response;
          console.log("Navegar a registro");
          this.router.navigateByUrl('/registro');
        },
        error => {
          console.error(error);
        }
      );
  }

}
