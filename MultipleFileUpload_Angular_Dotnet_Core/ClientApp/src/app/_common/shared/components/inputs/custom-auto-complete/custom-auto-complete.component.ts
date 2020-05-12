import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { HttpService } from 'src/app/_common/core/services/http.service';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';
import { FormGroupDirective, AbstractControl, FormArray, ControlContainer } from '@angular/forms';
import { UtilityService } from '../../../services/utility.service';

@Component({
  selector: 'auto-complete',
  templateUrl: './custom-auto-complete.component.html',
  styleUrls: ['./custom-auto-complete.component.css'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
      // useFactory: (container: ControlContainer) => container,
      // deps: [[new SkipSelf(), ControlContainer]]   
    }
  ]
})
export class CustomAutoCompleteComponent implements OnInit {

  @Input() controlName: string;
  @Input() endpoint: string;
  @Input() formArrayPart: string;
  @Input() formArrayIndex: any;
  @Input() label: string;
  @Input() placeHolder: string;
  @Input() disabled: boolean;
  @Input() focus: boolean
  @Input() validationMessage?: any;
  @Input() display: string;

  @Output() blur = new EventEmitter();

  inputValue: any
  inputError: string = ''
  formControl: AbstractControl;

  isRequired: boolean = false

  @ViewChild('ref') ref: ElementRef;

  constructor(private parent: FormGroupDirective, private _validate: UtilityService, private _service: HttpService) { }

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

  model: any;
  searching = false;
  searchFailed = false;

  formatter = (result: any) => result[this.display];


  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term => 
        this._service.get(this.endpoint + term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )

  logControlError() {
    this.inputError = this._validate.logControlError(this.formControl, this.label, this.validationMessage)
  }

  onBlur() {
    console.log("h")
    this.logControlError();
    this.blur.emit();
  }

  

}
