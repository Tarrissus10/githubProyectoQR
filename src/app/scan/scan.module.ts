import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScanPageRoutingModule } from './scan-routing.module';

import { ScanPage } from './scan.page';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScanPageRoutingModule,
    NgxQRCodeModule
  ],
  declarations: [ScanPage],
  providers: [BarcodeScanner]
})
export class ScanPageModule {}
