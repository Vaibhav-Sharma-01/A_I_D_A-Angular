import { ToastMessage } from '@shared/services/toast-message';
import { RegistriesService } from '@features/registries/service/registries.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

declare var Twilio: any;


@Injectable({
  providedIn: 'root'
})
export class CallingServiceService {

  setup: boolean = false;

  constructor(private registriesService: RegistriesService, private toast: ToastMessage) { }
  public phoneNumber = ''
  public setUpcall = new Subject<any>();

  public getNumber() {
    return this.phoneNumber;
  }

  public setupDevice(phoneNumber: any) {
    this.phoneNumber = phoneNumber
    if(!this.setup) {
      console.log('setupdevice');
      this.registriesService.getCapabilityToken().subscribe(
        (data: any) => {
          Twilio.Device.setup(data.token);
          this.setup = true;
          this.call(phoneNumber);
        }
      );
    } else {
      this.call(phoneNumber);
    }
    
  }

  public call(phoneNumber: any) {
    console.log('I called');
    Twilio.Device.disconnect(() => {
      this.registriesService.registriesSubject.next('closeCall');
      this.toast.open(`Call ended.`, 'error');
    });
    if(Twilio.Device.status() == 'offline'){
      Twilio.Device.ready(() => {
        console.log('go call');
        this.toast.open(`Connected`, 'success');
        // TODO: remove hard coded number
        Twilio.Device.connect({ number: phoneNumber });
        //"+918791234693"
      });
    } else {
      // Twilio.Device.ready(() => {
        console.log('go call');
        this.toast.open(`Connected`, 'success');
        // TODO: remove hard coded number
        Twilio.Device.connect({ number: phoneNumber });
        //"+918791234693"
      // });
    }
    
  }

  public endCall() {
    Twilio.Device.disconnectAll();
  }
}
