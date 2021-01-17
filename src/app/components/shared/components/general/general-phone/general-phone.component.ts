import { CallingServiceService } from './../../../services/call/calling-service.service';
import { Subscription } from 'rxjs';
// Core Module
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

// AIDA Services
import { RegistriesService } from '@features/registries/service/registries.service';
import { ToastMessage } from '@shared/services/toast-message';

declare var Twilio: any;

@Component({
  selector: 'app-general-phone',
  templateUrl: './general-phone.component.html',
  styleUrls: ['./general-phone.component.scss'],
})
export class GeneralPhoneComponent implements OnInit, OnDestroy {
  phone: string = '';
  subscription: Subscription;
  subscription2: Subscription
  phoneInput: string = 'xx';
  isCalling: boolean = true;
  isPhoneValid: boolean = false;
  token = 0;

  constructor(
    private registriesService: RegistriesService,
    private toast: ToastMessage,
    private callService: CallingServiceService
  ) {}

  @Input() phoneNumber: any;

  ngOnInit(): void {
    const self = this;
    this.getNumber();
    // // this.call("+918791234693");
    // this.subscribeChanges();
    // console.log('input ', this.phoneNumber);
    // if (this.phoneNumber) {
    //   this.setupDevice(this.phoneNumber);
    // }
  }

  subscribeChanges() {
    this.subscription = this.registriesService.registriesSubject.subscribe(
      (res: any) => {
        console.log(res);
        if(this.token===0){
          this.setupDevice(res.number);
        }
        this.call(res.number);
      }
    );
  }

  getNumber() {
    this.phoneInput = this.callService.getNumber();
    console.log(this.phoneInput)
  }

  num(word: string) {
    this.isPhoneValid = false;
    this.phone += word;
    this.phoneInput = this.phone;
    if (
      this.phoneInput.match(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
      )
    ) {
      this.isPhoneValid = true;
    }
  }

  setupDevice(phoneNumber: any) {
    console.log('setup device');
    this.registriesService.getCapabilityToken().subscribe(
      (data: any) => {
        this.token = 1;
        Twilio.Device.setup(data.token);
        // this.call(phoneNumber);
      }
    );
  }


  call(phoneNumber: any) {
    console.log('I called');
    Twilio.Device.disconnect(() => {
      this.registriesService.registriesSubject.next('closeCall');
      this.toast.open(`Call ended.`, 'error');
    });
    Twilio.Device.ready(() => {
      console.log('go call');
      this.toast.open(`Connected`, 'success');
      // TODO: remove hard coded number
      Twilio.Device.connect({ number: phoneNumber });
      //"+918791234693"
    });
    // this.subscription2 = this.registriesService.getCapabilityToken().subscribe((data: any) => {
    //   // TODO: setup only once.
    //   if (1) {
    //     this.token = 1;
    //     console.log('capability', data);
    //     // Twilio.Device.setup(data.token);
    //   }
    //   console.log('done')
      // Twilio.Device.disconnect(() => {
      //   this.registriesService.registriesSubject.next('closeCall');
      //   this.toast.open(`Call ended.`, 'error');
      // });

      // Twilio.Device.ready(() => {
      //   console.log('go call');
      //   this.toast.open(`Connected`, 'success');
      //   // TODO: remove hard coded number
      //   Twilio.Device.connect({ number: phoneNumber });
      //   //"+918791234693"
      // });
    // });
    // if (this.isPhoneValid) {
    // const data = {
    //   "url": "https://5d698d0557e2.ngrok.io/v1/api/call",
    //   "to": "+917042618988",
    //   "from": "+12566459370",
    //   "callTo": "+918800608262"
    // };
    // this.registriesService.callPhone(data).subscribe(res => {
    //   this.isCalling = true;
    //   this.toast.open(`Calling ${this.phoneInput}...`, 'success');
    // }, error => {
    //   this.toast.open(`Unable to make a call.`, 'error');
    // })
    // }
  }

  clearAll() {
    this.phoneInput = '';
    this.phone = '';
    this.isPhoneValid = false;
  }

  callEnd() {
    this.callService.endCall();
  }

  ngOnDestroy(): void {
    console.log('both unsubscribe');
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }
}
