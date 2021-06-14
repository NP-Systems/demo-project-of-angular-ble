import { Component } from '@angular/core';
import { BluetoothService } from '@nebulae/angular-ble';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private bluetoothService: BluetoothService
  ) {}

  //stablish a connection between the browser and a bluetooth device
  connectToDevice() {
    console.log('connectToDevice() called');

    this.bluetoothService.connectDevice$(
      {
      acceptAllDevices: true,
      optionalServices:['0000fff0-0000-1000-8000-00805f9b34fb']
      }
      //{optionalServices:'123'}
    ).subscribe(
      res => {
        console.log(res,'connected');
      },
      error => {
        console.log('error');
        console.log(error);
        console.log(error.message);
      },
    ).add(() => {
      console.log('finally done');
    });
  }

  disconnectToDevice() {
    this.bluetoothService.disconnectDevice();
  }
  
  readDeviceValue(){
    //this.bluetoothService.readDeviceValue$('battery_service','battery_level').subscribe(result => {
    this.bluetoothService.readDeviceValue$('0000fff0-0000-1000-8000-00805f9b34fb','0000fff1-0000-1000-8000-00805f9b34fb').subscribe(result => {
      console.log('stream value22: ', result);
      console.log('a');
      console.log(typeof(result),'a2');
      console.log(result['buffer']);
      console.log(typeof(result['buffer']));
      console.log(result['buffer'].toString());
      console.log(new Int8Array(result['buffer']));
      let data = new Int8Array(result['buffer'])
      console.log(data,data[0]);


      //var str = String.fromCharCode.apply(null, uint8Arr);
      //console.log(String.fromCharCode.apply("", new Int8Array(result['buffer'])));
      console.log(result['buffer'][1]);
      console.log(result['buffer'][2]);
      console.log(result['buffer'][3]);

    });
  }

  writeDeviceValue(){
    //this.bluetoothService.readDeviceValue$('battery_service','battery_level').subscribe(result => {
    this.bluetoothService.writeDeviceValue$('0000fff0-0000-1000-8000-00805f9b34fb','0000fff1-0000-1000-8000-00805f9b34fb',this.uint32ToArrayBuffer(9)).subscribe(result => {
      console.log('stream value22: ', result);
      console.log('a');
    });
  }


  uint32ToArrayBuffer(n) {
    const view = new DataView(new ArrayBuffer(4));
    view.setUint32(0, n, false);
    return view.buffer;
  }

}
