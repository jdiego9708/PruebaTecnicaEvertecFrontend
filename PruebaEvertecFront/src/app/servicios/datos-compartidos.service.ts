import { Injectable } from '@angular/core';
import { RespuestaInicioSesion } from '../formulario-login/formulario-login.component';

@Injectable({
  providedIn: 'root'
})
export class DatosCompartidosService {

  respuestaInicioSesion: RespuestaInicioSesion = {
    mensaje: '',
    accessToken: '',
    fechaLogin: ''
  };

  constructor() { }
}
