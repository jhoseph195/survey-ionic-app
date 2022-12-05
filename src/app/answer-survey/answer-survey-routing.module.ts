import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnswerSurveyPage } from './answer-survey.page';

const routes: Routes = [
  {
    path: '',
    component: AnswerSurveyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnswerSurveyPageRoutingModule {}
