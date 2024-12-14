import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialRoutingModule } from './social-routing.module';
import { SocialComponent } from './social.component';
import { SharedMaterialModule } from '../../../shared/sharedMaterial.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SocialComponent],
  imports: [
    CommonModule,
    SocialRoutingModule,
    SharedMaterialModule,
    ReactiveFormsModule,
  ],
})
export class SocialModule {}
