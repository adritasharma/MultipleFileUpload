import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef, SkipSelf } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';


@Component({
  selector: 'input-radio',
  templateUrl: './custom-input-radio.component.html',
  styleUrls: ['./custom-input-radio.component.css'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
      // useFactory: (container: ControlContainer) => container,
      // deps: [[new SkipSelf(), ControlContainer]]   
    }
  ]
})
export class CustomInputRadioComponent implements OnInit {

  @Input() controlName: string;
  @Input() itemList: any[]
  @Input() label: string;
  @Input() placeHolder: string;
  @Input() inputError: string;
  @Input() disabled: boolean;
  @Input() focus: boolean

  @Output() blur = new EventEmitter();

  @ViewChild('ref') ref: ElementRef;

  inputValue: any


  constructor() { }

  ngOnInit() {
    if (!this.label) {
      this.label = this.controlName
    }
    if (!this.placeHolder) {
      this.placeHolder = this.label
    }
  }

  onBlur() {
    this.blur.emit()
  }

  onKeyUp() {
    this.inputValue = this.ref.nativeElement.value;
  }
}
