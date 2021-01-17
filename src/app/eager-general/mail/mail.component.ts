// Core Modules
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// AIDA Services
import { RegistriesService } from '@features/registries/service/registries.service';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';


// Utils
import { regex } from '@utils/regex';


@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.scss']
})
export class MailComponent implements OnInit {
  emailForm: FormGroup;
  isLoading: boolean = false;
  preferredLanguage: String = 'en';
  ckeditorContent: string = '<p>Some html</p>';

  @Input() displaycc = false;
  @Input() displaybcc = false;  
  @Input() cc = true;
  @Input() bcc = true;

  /**
   * Constructor
   */
  constructor(
    private fb: FormBuilder,
    private registriesService: RegistriesService
  ) { }

  /**
   * Lifecycle hooks
   */
  ngOnInit(): void {
    this.emailFormInit();
  }

  /**
   * email form init
   */
  emailFormInit() {
    this.emailForm = this.fb.group({
      to: ['', [Validators.required, Validators.pattern(regex.EMAIL)]],
      cc: ['', [Validators.pattern(regex.EMAIL)]],
      bcc: ['', [Validators.pattern(regex.EMAIL)]],
      subject: ['', [Validators.required]],
      text: ['', [Validators.required]],
    });
  }

  /**
   * Is form valid
   */
  isFormValid() {
    return this.emailForm.valid;
  }

  /**
   * Is form dirty
   */
  isFormDirty() {
    return this.emailForm.dirty;
  }

  /**
   * To make form Pristine
   */
  makeFormPristine(){
    return this.emailForm.markAsPristine();
  }
  
  /**
   * 
   * To change display's to none and block
   * 
   */
  display(view:string){
    if(view == 'cc'){
      this.displaycc = true
      this.cc = false
    }
    else if(view == "bcc"){
      this.displaybcc = true
      this.bcc = false
    }
  }

  /**
   * Send mail
   */
  sendemail() {
    console.log(this.emailForm.value);

    if(!this.isFormDirty()) {
      return 
    }
    if(!this.isFormValid()) {
      return 
    }

    this.registriesService.sendEmail(this.emailForm.value).subscribe(
    (res: any) => {
      console.log(res)
      this.emailForm.reset();
      this.makeFormPristine();
    },
    (err: any) => {
      console.log(err)
      this.makeFormPristine()
    }
    )
  }

  public Editor = DecoupledEditor;

  public onReady( editor: any ) {
      editor.ui.getEditableElement().parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
      );
  }

}
