import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SurveyService } from '../services/survey.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.page.html',
  styleUrls: ['./survey.page.scss'],
})
export class SurveyPage implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private surveyService: SurveyService
  ){}

  public data = null;

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.surveyService.getWithFilters({}).subscribe((result: any) => {
      this.data = result.data;
    });
  }

  logout(){
    this.authService.logout().subscribe((result: any) => {
      localStorage.clear();
  
      this.router.navigate([`/login`]);
    });
  }

  goToAnswer(id: number){
    this.router.navigate(['/answer-survey'], { queryParams: {survey: id}})
  }
}
