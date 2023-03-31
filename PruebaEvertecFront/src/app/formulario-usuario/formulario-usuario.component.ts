import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../Core/Servicios/usuario.service';
import { DatosCompartidosService } from '../servicios/datos-compartidos.service';
import { RespuestaInicioSesion } from '../formulario-login/formulario-login.component';

@Component({
  selector: 'app-formulario-usuario',
  templateUrl: './formulario-usuario.component.html',
  styleUrls: ['./formulario-usuario.component.scss']
})
export class FormularioUsuarioComponent implements OnInit {
  respuestaInicioSesion: RespuestaInicioSesion;
  miFormulario: FormGroup;

  estadosCiviles = [
    {valor: 1, viewValue: 'Soltero/a'},
    {valor: 2, viewValue: 'Casado/a'},
    {valor: 3, viewValue: 'Divorciado/a'},
    {valor: 4, viewValue: 'Viudo/a'}
  ];

  constructor(private formBuilder: FormBuilder, 
    private serviceusuario: UsuarioService,
    private datosCompartidosService: DatosCompartidosService) { }

  ngOnInit(): void {
    this.miFormulario = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      fotoUsuario: ['', Validators.required],
      estadoCivil: ['', Validators.required],
      tieneHermanos: ['']
    })
    
    this.respuestaInicioSesion = this.datosCompartidosService.respuestaInicioSesion;
  }
  onFileSelected(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.miFormulario.get('fotoUsuario').setValue(reader.result);
      };
    }
  }
  
  enviarFormulario() {

    const formData = this.miFormulario.value;

    this.serviceusuario.postInsertarUsuario(formData)
      .subscribe(
        response => {
          console.error(response);
        },
        error => {
          console.error(error);
        }
      );
  }
}
