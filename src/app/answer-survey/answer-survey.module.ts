import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnswerSurveyPageRoutingModule } from './answer-survey-routing.module';

import { AnswerSurveyPage } from './answer-survey.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnswerSurveyPageRoutingModule
  ],
  declarations: [AnswerSurveyPage]
})
export class AnswerSurveyPageModule {}
