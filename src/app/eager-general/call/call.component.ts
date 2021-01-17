// Core Modules
import { Component, Input, OnInit } from '@angular/core';

// AIDA Services
import { RegistriesService } from '@features/registries/service/registries.service';
import { CallingServiceService } from '@shared/services/call/calling-service.service';
import { ToastMessage } from '@shared/services/toast-message';
// rxjs Operators
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss']
})
export class CallComponent implements OnInit {
  isCalling: boolean = true;
  isPhoneValid: boolean = false;
  phone: string = '';
  phoneInput: string = 'xx';
  subscription: Subscription;
  subscription2: Subscription
  token = 0;
  
  @Input() phoneNumber: any;

  constructor(
    private registriesService: RegistriesService,
    private toast: ToastMessage,
    private callService: CallingServiceService
  ) {}


  /**
   * Angular Life cycle Hook
   */
  ngOnInit(): void {
    const self = this;
    console.log('phone Number is ', this.phoneNumber)
    this.callService.setupDevice(this.phoneNumber);
  }

  /**
   * To check input value is a legal Phone Number
   * @param {String} word: input value 
   */
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

  /**
   * Clear input 
   */
  clearAll() {
    this.phoneInput = '';
    this.phone = '';
    this.isPhoneValid = false;
  }

  /**
   * End Call
   */
  callEnd() {
    this.callService.endCall();
  }

  /**
   * Angular LifeCycle Hook
   */
  ngOnDestroy(): void {
    console.log('both unsubscribe');
  }
}
