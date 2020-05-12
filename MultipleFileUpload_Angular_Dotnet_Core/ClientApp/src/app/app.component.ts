import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { HttpService } from './_common/core/services/http.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ClientApp';
  form: FormGroup;

  constructor(private fb: FormBuilder, private _api: HttpService) { }


  ngOnInit() {
    this.form = this.fb.group({
      ProductName: [null, Validators.required],
      ProductTypes: this.fb.array([
        this.addProductTypeFormGroup()
      ])
    }
    );
  }

  addProductTypeFormGroup(): FormGroup {
    return this.fb.group({
      Description: ['', Validators.required],
      Volume: [],
      ProductImages: [[]]
    });
  }

  removeProductButtonClick(skillGroupIndex: number): void {
    const skillsFormArray = <FormArray>this.form.get('ProductTypes');
    skillsFormArray.removeAt(skillGroupIndex);
    skillsFormArray.markAsDirty();
    skillsFormArray.markAsTouched();
  }

  onFileListChange(files: File[], index) {
    const product = (<FormArray>this.form.get('ProductTypes')).at(index);
    var filesControl = product.get('ProductImages');

    var data = []

    // var formData = new FormData();

    // for (var i = 0; i != files.length; i++) {
    //   formData.append("Files", files[i]);
    // }

    // data.push(formData);

    filesControl.setValue(files)

  }

  onSubmit() {
    console.log(this.form.value)

    var formValue = this.form.value;



    let input = new FormData();
    // Add your values in here
    input.append('ProductName', formValue.ProductName);
    input.append('ProductTypes', formValue.ProductTypes[0]);

    console.log("input",input)

    // var header = {
    //   headers: new HttpHeaders()
    //     .set('Content-Type',  'multipart/form-data')
    // }
    const headers = new HttpHeaders().append('Content-Disposition', 'multipart/form-data');


    this._api.post('https://localhost:44301/api/Product', input, headers).subscribe(res => {
      console.log(res);
    })
  }
}
