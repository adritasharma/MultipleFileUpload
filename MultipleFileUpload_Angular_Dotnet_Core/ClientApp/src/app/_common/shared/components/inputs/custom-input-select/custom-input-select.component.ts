import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ViewChild, ElementRef, SkipSelf } from '@angular/core';
import { ControlContainer, FormGroupDirective, AbstractControl, FormArray } from '@angular/forms';
import { UtilityService } from '../../../services/utility.service';

@Component({
  selector: 'input-select',
  templateUrl: './custom-input-select.component.html',
  styleUrls: ['./custom-input-select.component.css'],
  viewProviders: [
    {
      provide: ControlContainer,
    //  useExisting: FormGroupDirective
      useFactory: (container: ControlContainer) => container,
      deps: [[new SkipSelf(), ControlContainer]]   
    }
  ]
})
export class CustomInputSelectComponent implements OnInit {


  @Input() controlName: string;
  @Input() itemList: any[]
  @Input() label?: string;
  @Input() placeHolder?: string;
  @Input() disabled: boolean;
  @Input() validationMessage?: any;
  @Input() focus: boolean

  @Input() displayProp: string
  @Input() valueProp: string

  @Input() formArrayPart: string;
  @Input() formArrayIndex: any;

  @Output() blur = new EventEmitter();

  inputValue: any
  inputError: string = ''
  formControl: AbstractControl;

  isRequired: boolean = false

  @ViewChild('ref') ref: ElementRef;

  constructor(private parent: FormGroupDirective, private _validate: UtilityService) { }

  ngOnInit() {

    if (!this.valueProp) {
      this.valueProp = 'id';
    }

    if (!this.displayProp) {
      this.displayProp = 'text';
    }

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

  ngOnChanges(changes: SimpleChanges) {
    if (changes.itemList) {
      this.itemList = changes.itemList.currentValue;
      if ((this.itemList.filter(x => x[this.valueProp] == null).length) < 1) {
        let obj = {}
        obj[this.valueProp] = '';
        obj[this.displayProp] = `-- Select ${this.label} --`;
        this.itemList.unshift(obj);
      }
    }
  }

}
