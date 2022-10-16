import { Component, OnInit } from '@angular/core';
import { AlumnosService } from 'src/app/alumnos/alumnos.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profesor-detalle',
  templateUrl: './profesor-detalle.page.html',
  styleUrls: ['./profesor-detalle.page.scss'],
})
export class ProfesorDetallePage implements OnInit {

  profesores: any = []
  usuario : any;

  constructor(private servicio:AlumnosService, private fire: FirebaseService, private alerta: AlertController, private router: Router) { }

  ngOnInit() {
    this.cargarData();
    this.validacion();
  }
  ionViewWillEnter(){
    this.validacion();
  }

  cargarData(){
    this.servicio.obtenerProfesor().subscribe(
      (res) =>{
        this.profesores = res
      },
      (err) => {

      }
    )
  }
  obtenerPersonaje(){
    this.fire.getCollection<ProfesorDetallePage>('profesor').subscribe(
      (res) => {
        this.profesores =res;
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
