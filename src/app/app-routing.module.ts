import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canActivate: [ LoginGuard ]
  },
  {
    path: 'survey',
    loadChildren: () => import('./survey/survey.module').then( m => m.SurveyPageModule),
    canActivate: [ AdminGuard ]
  },
  {
    path: 'answer-survey',
    loadChildren: () => import('./answer-survey/answer-survey.module').then( m => m.AnswerSurveyPageModule),
    canActivate: [ AdminGuard ]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
