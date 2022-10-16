import { Component, OnInit, ɵunregisterLocaleData } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, BooleanValueAccessor } from '@ionic/angular';
import { Alumnos } from '../alumnos/alumnos';
import { AlumnosService } from '../alumnos/alumnos.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage implements OnInit {

  alumno = []
  idAlumno: any;
  constructor(private servicio: AlumnosService, private fire: FirebaseService, private alerta: AlertController, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.obtenerPersonaje();
  }
  ionViewWillEnter(){
    this.obtenerPersonaje();
  }

  obtenerPersonaje(){
    this.fire.getCollection<Alumnos>('Alumno').subscribe(
      (res) => {
        this.alumno =res;
        console.log(res)
      },
      (err) => {

      }
    )
  }

  async eliminar(){
    const alert = await this.alerta.create({
      header: 'Eliminar!',
      message: 'Seguro?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.fire.deleteDoc('Alumno',this.fire.getId())
          },
        },
      ],
    });
    await alert.present();
  }

  async presentAlert(){
    const alert = await this.alerta.create({
      header: 'Ingresa info',
      buttons: [
        {
          text: 'cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: data =>{
            const per: Alumnos = {
              id: this.fire.getId(),
              rut: data.txtRut,
              nombre: data.txtNombre,
              apellido: data.txtApellido,
              imagen: data.txtImagen,
              tipo: data.txtTipo,
              pass: data.txtPass
            }
            this.fire.createDoc(per,'Alumno',per.id)
          },
        },

      ],
      inputs: [
        {
          placeholder: 'rut',
          name: 'txtRut'
        },
        {
          placeholder: 'Nombre',
          name: 'txtNombre'
        },
        {
          placeholder: 'apellido',
          name: 'txtApellido'
        },
        {
          placeholder: 'tipo',
          name: 'txtTipo'
        },
        {
          placeholder: 'imagen',
          name: 'txtImagen'
        },
        {
          placeholder: 'pass',
          name: 'txtPass'
        },
      ],
    });
    await alert.present();
  }
}
