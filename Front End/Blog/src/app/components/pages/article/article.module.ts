import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleComponent } from './article.component';
import { SharedMaterialModule } from '../../../shared/sharedMaterial.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ArticleComponent],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    SharedMaterialModule,
    ReactiveFormsModule,
  ],
})
export class ArticleModule {}
