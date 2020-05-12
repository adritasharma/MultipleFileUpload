import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ControlContainer, FormGroupDirective, AbstractControl } from '@angular/forms';
import { UtilityService } from '../../../services/utility.service';

@Component({
  selector: 'input-password',
  templateUrl: './custom-input-password.component.html',
  styleUrls: ['./custom-input-password.component.css'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})
export class CustomInputPasswordComponent implements OnInit {

  @Input() controlName: string;
  @Input() placeHolder: string;
  @Input() disabled: boolean;
  @Input() focus: boolean
  @Input() showEye: boolean;
  @Input() label?: string;
  @Input() validationMessage?: any;

  @Output() blur = new EventEmitter();


  show = false;
  inputType = 'password'

  inputValue: any
  inputError: string = ''
  formControl: AbstractControl;

  isRequired: boolean = false

  @ViewChild('ref') ref: ElementRef;

  constructor(private parent: FormGroupDirective, private _validate: UtilityService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    if (!this.label) {
      this.label = this.controlName
    }
    if (!this.placeHolder) {
      this.placeHolder = this.label
    }

    this.formControl = this.parent.form.get(this.controlName)
    if (this.focus) {
      this.ref.nativeElement.focus();
    }
    if (this.formControl.validator) {
      const validator = this.formControl.validator({} as AbstractControl);
      if (validator && validator.required) {
        this.isRequired = true
      }
    }

    this.formControl.valueChanges.subscribe(value => {
      this.inputValue = value;
      this.logControlError();
    })
  }

  logControlError() {
    console.log(this.validationMessage)

    setTimeout(() => {
      console.log(this.formControl.errors)
      this.inputError = this._validate.logControlError(this.formControl, this.label, this.validationMessage)
      console.log(this.inputError)

    }, 10);
  }

  onBlur() {
    this.logControlError();
    this.blur.emit();
  }
  onClick() {
    if (this.inputType === 'password') {
      this.inputType = 'text';
      this.show = true;
    } else {
      this.inputType = 'password';
      this.show = false;
    }
  }

}

