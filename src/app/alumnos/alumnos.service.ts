import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alumnos } from './alumnos';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  API="https://sleepy-plateau-36828.herokuapp.com/api/profesors"

  constructor(private cliente: HttpClient) { }
  obtenerProfesor() {
    return this.cliente.get("https://sleepy-plateau-36828.herokuapp.com/api/profesors?populate=imagen")
  }
  
  eliminarProfesor(id:string){
    return this.cliente.delete(`${this.API}/${id}`)
  }
}
