import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule
  ],
  declarations: [],
  exports: [
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ]
})
export class CoreModule { }
