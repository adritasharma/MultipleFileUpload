import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  public regex = {
    email: '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$',
    phone:'^[0-9]{10}$',
    empCode:'^[0-9]{8}$'
  }

  convertToParam(json: any) {
    return $.param(json);
  }

  getArrayFromEnum(input: any) {
    return (Object.keys(input)).filter(value => isNaN(Number(value)) === false)
      .map(key => ({ label: input[key], value: Number(key) }))
  }

  logControlError(formControl: AbstractControl, label:string,validationMessage?: any) {
    let inputError = '';

    for (const errorKey in formControl.errors) {
      if (errorKey) {
        console.log(errorKey, formControl.errors)
        if (validationMessage && validationMessage[errorKey]) {
          inputError += validationMessage[errorKey] + ' ';
        } else {
          switch (errorKey) {
            case "required":
              inputError += label + " is required";
              break;
            case "pattern":
              inputError += "Please provide a valid " + label;
              break;
          }
        }
      }
    }
    return inputError;
  }

  logValidationErrors(group: FormGroup, validationMessages: Object, isEditForm?: boolean): any {
    var formErrors = {};

    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);

      formErrors[key] = '';
      if (abstractControl && !abstractControl.valid &&
        (abstractControl.touched || abstractControl.dirty || isEditForm)) {

        const messages = validationMessages[key];

        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }

      if (abstractControl instanceof FormGroup) {
        let groupError = this.logValidationErrors(abstractControl, validationMessages, isEditForm);
        formErrors = { ...formErrors, ...groupError }
      }

    });
    return formErrors
  }

  logAllValidationErrors(group: FormGroup, validationMessages: Object, isEditForm?: boolean): any {

    var formErrors = {};

    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);

      formErrors[key] = '';
      if (abstractControl && !abstractControl.valid) {

        const messages = validationMessages[key];

        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }

      if (abstractControl instanceof FormGroup) {
        this.logAllValidationErrors(abstractControl, validationMessages, isEditForm);
      }

    });
    return formErrors

  }


  matchConfirmItems(controlName: string, confirmControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const confirmControl = formGroup.controls[confirmControlName];

      if (!control || !confirmControl) {
        return null;
      }

      if (confirmControl.errors && !confirmControl.errors.mismatch) {
        return null;
      }

      if (control.value !== confirmControl.value) {
        confirmControl.setErrors({ mismatch: true });
      } else {
        confirmControl.setErrors(null);
      }
    }
  }
}
