import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { LoadingController, ToastController } from '@ionic/angular';
import { Usuario } from '../interfaces/usuario';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private auth: AngularFireAuth,private database: AngularFirestore , private loading: LoadingController, private toastController:ToastController) { }
  createDoc(data: any, path: string, id: string) {
    const collection = this.database.collection(path);
    return collection.doc(id).set(data);
  }

  getDoc<tipo>(path: string, id: string) {
    const collection = this.database.collection<tipo>(path);
    return collection.doc(id).valueChanges();
  }

  deleteDoc(path: string, id: string) {
    const collection = this.database.collection(path);
    return collection.doc(id).delete();
  }

  updateDoc(data: any, path: string, id: string) {
    const collection = this.database.collection(path);
    return collection.doc(id).update(data);
  }

  getId() {
    return this.database.createId();
  }

  getCollection<tipo>(path: string) {
    const collection = this.database.collection<tipo>(path);
    return collection.valueChanges();
  }


  async mensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1500,
      //position: 'top' | 'middle' | 'bottom'
    });

    await toast.present();
  }

  loadingAux: any;

  async cargarLoading(mensaje: string) {
    this.loadingAux = await this.loading.create({
      cssClass: 'my-custom-class',
      message: mensaje,
      //duration: 2000
    });

    await this.loadingAux.present();
  }

  async cerrarLoading() {
    await this.loadingAux.dismiss();
  }

  async logout(){
    await this.auth.signOut();
    
  }

  async login(email: string, pass: string){
    const { user } =await this.auth.signInWithEmailAndPassword(email,pass);
    await this.verification();
    return user;
  }

  async registrar(email: string, pass: string){
    const { user } =await this.auth.createUserWithEmailAndPassword(email,pass);
    await this.verification();
    return user;
  }

  async verification(){
    return (await this.auth.currentUser).sendEmailVerification();
  }

  async recuperar(email){
    return this.auth.sendPasswordResetEmail(email);
  }

  async obtenerEmail(){
    return (await this.auth.currentUser).email;
  }

  async obtenerUsuario(){
    const aux: Usuario = await this.auth.currentUser;
    return aux;
  }
}
