import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    baseUrl: string

    constructor(
        private _http: HttpClient
    ) {
        this.baseUrl = environment.url;
    }

    postInicioSesion(model) {
        return this._http.post(this.getUrl('ProcessLogin'), model);
    }

    postInsertarUsuario(model) {
        return this._http.post(this.getUrl('InsertUsuarios'), model);
    }

    public getUrl(endpoint) {
        return this.baseUrl + (endpoint || '');
    }
}