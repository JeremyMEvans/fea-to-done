import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// COMPONENTS

import { ButtonComponent } from '../../components/button/button.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavComponent } from '../../components/nav/nav.component';
import { UploaderComponent } from '../../components/uploader/uploader.component'

@NgModule({
  declarations: [
    ButtonComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    UploaderComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ButtonComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    UploaderComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class SharedModule { }
