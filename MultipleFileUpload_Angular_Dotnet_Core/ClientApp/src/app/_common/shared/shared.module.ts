import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { InitialsPipe } from './pipes/initials.pipe';
import { CustomInputTextComponent } from './components/inputs/custom-input-text/custom-input-text.component';
import { ChildFieldControlDirective } from './directives/ChildFieldControlDirective';
import { CustomInputSelectComponent } from './components/inputs/custom-input-select/custom-input-select.component';
import { CustomInputRadioComponent } from './components/inputs/custom-input-radio/custom-input-radio.component';
import { CustomInputPasswordComponent } from './components/inputs/custom-input-password/custom-input-password.component';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CustomFileDropComponent } from './components/inputs/custom-file-drop/custom-file-drop.component';
import { CustomAutoCompleteComponent } from './components/inputs/custom-auto-complete/custom-auto-complete.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    NgxDropzoneModule
  ],
  declarations: [
    InitialsPipe,
    ChildFieldControlDirective,
    CustomInputTextComponent,
    CustomInputSelectComponent,
    CustomInputRadioComponent,
    CustomInputPasswordComponent,
    CustomFileDropComponent,
    CustomAutoCompleteComponent
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    NgbModule,
    InitialsPipe,
    ChildFieldControlDirective,
    CustomInputTextComponent,
    CustomInputSelectComponent,
    CustomInputRadioComponent,
    CustomInputPasswordComponent,
    CustomFileDropComponent,
    CustomAutoCompleteComponent
  ],
  entryComponents: [  ],
})
export class SharedModule { }
