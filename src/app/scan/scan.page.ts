import { Component, OnInit } from '@angular/core';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {

  qrData = null;
  createdCode = null;
  scannedCode = null; 
  constructor(private barcodeScanner: BarcodeScanner) {

   }

   
   scanCode(){
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
    })
  }

  ngOnInit() {
  }

}
