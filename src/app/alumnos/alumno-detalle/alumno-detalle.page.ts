import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Alumnos } from '../alumnos';
import { AlumnosService } from '../alumnos.service';

@Component({
  selector: 'app-alumno-detalle',
  templateUrl: './alumno-detalle.page.html',
  styleUrls: ['./alumno-detalle.page.scss'],
})
export class AlumnoDetallePage implements OnInit {

  alumno = []
  usuario : any;
  constructor(private servicio: AlumnosService, private fire: FirebaseService, private router: Router, private alerta: AlertController) { }

  ngOnInit() {
    this.validacion();
  }
  ionViewWillEnter(){
    this.validacion();
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

  validacion(){
    this.fire.obtenerUsuario().then(
      (resp) =>{
        if(resp.emailVerified){
        this.obtenerPersonaje();
        this.usuario = resp;
        } else {
          this.mensajeError();
        }
      },
      (err) =>{

      }
    )
  }
 
  async mensajeError(){
    const alert = await this.alerta.create({
      header: 'Error!',
      message: 'Para poder usar la app, debe validar el correo',
      buttons: [
        {
          text: 'Cerrar',
          handler: () => {
            this.router.navigate(['/login']);
          },
        },
      ],
    });
    await alert.present();
  }
}
