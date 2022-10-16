import { Component, OnInit } from '@angular/core';
import { NgxQrcodeElementTypes } from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'app-home-profesor',
  templateUrl: './home-profesor.page.html',
  styleUrls: ['./home-profesor.page.scss'],
})
export class HomeProfesorPage implements OnInit {

  constructor() { }
   obj ={ url: 'www.google.cl', name:'gian',token: 33}
   qrData = JSON.stringify(this.obj)
   elementType: NgxQrcodeElementTypes.CANVAS
  ngOnInit() {
  }

}
