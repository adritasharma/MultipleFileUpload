import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef, SkipSelf } from '@angular/core';
import { ControlContainer, FormGroupDirective, FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { UtilityService } from '../../../services/utility.service';


@Component({
  selector: 'input-text',
  templateUrl: './custom-input-text.component.html',
  styleUrls: ['./custom-input-text.component.css'],
  viewProviders: [
    {
      provide: ControlContainer,
      // useExisting: FormGroupDirective
      useFactory: (container: ControlContainer) => container,
      deps: [[new SkipSelf(), ControlContainer]]
    }
  ]
})
export class CustomInputTextComponent implements OnInit {

  @Input() controlName: string;
  @Input() formArrayPart: string;
  @Input() formArrayIndex: any;
  @Input() label: string;
  @Input() placeHolder: string;
  @Input() disabled: boolean;
  @Input() focus: boolean
  @Input() validationMessage?: any;

  @Output() blur = new EventEmitter();

  inputValue: any
  inputError: string = ''
  formControl: AbstractControl;

  isRequired: boolean = false

  @ViewChild('ref') ref: ElementRef;

  constructor(private parent: FormGroupDirective, private _validate: UtilityService) { }

  ngOnInit() {

    console.log(this.label)
    if (!this.label) {
      this.label = this.controlName
    }
    if (!this.placeHolder) {
      this.placeHolder = this.label
    }

    if (this.formArrayPart) {
      let formArray = this.parent.form.get(this.formArrayPart) as FormArray;
      this.formControl = formArray.at(this.formArrayIndex).get(this.controlName)
    } else {
      this.formControl = this.parent.form.get(this.controlName)
    }
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
    this.inputError = this._validate.logControlError(this.formControl, this.label, this.validationMessage)
  }

  onBlur() {
    this.logControlError();
    this.blur.emit();
  }
}