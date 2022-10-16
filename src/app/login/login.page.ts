import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';
import { Alumnos } from '../alumnos/alumnos';
import { AlumnosService } from '../alumnos/alumnos.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private servicio: FirebaseService,private authServ: AlumnosService, private toastCtrl: ToastController,private router: Router) { }

  usuario : Alumnos={
    id: this.servicio.getId(),
    rut:'',
    nombre:'',
    apellido:'',
    imagen:'',
    tipo:'',
    pass: ''
  }

  ngOnInit() {
  }

  loginUser() {
    console.log(this.usuario);
    if (this.usuario.rut=="9705886-5" && this.usuario.tipo=="profesor" && this.usuario.pass=="12345") {
      this.router.navigate(['home-profesor']);
    }
    if(this.usuario.rut=="20455239-8" && this.usuario.tipo=="alumno" && this.usuario.pass=="12345") {
      this.router.navigate(['home']);
    }
    else{
      this.toastCtrl.create({
        message:"usuario o pass incorrecta",
        duration:3000,
        position:'middle'
      }).then((toast)=>{
        toast.present();
      });       
    }
  }

  async login(email,pass){
    const user = this.servicio.login(email.value, pass.value);
    if (user && this.usuario.tipo=="alumno") {
      this.router.navigate(['/home'])
    }
    if (user && this.usuario.tipo=="profesor") {
      this.router.navigate(['/home-profesor'])
    }
  }

  async registrar(email,pass){
    const user = this.servicio.registrar(email.value, pass.value);
    if (user) {
      this.toastCtrl.create({
        message:"Usuario registrado (❁´◡`❁)",
        duration:3000,
        position:'middle'
      }).then((toast)=>{
        toast.present();
      });  
    }
  }

}
